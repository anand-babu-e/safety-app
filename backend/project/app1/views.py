from rest_framework.permissions import AllowAny
from .serializers import EmergencyContactSerializer, SOSRequestSerializer, SignupSerializer, UserSerializer, IncidentSerializer
from .models import EmergencyContact, SOSRequest, Incident
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
from .utils import calculate_distance
from django.utils import timezone
from datetime import timedelta
from django.core.cache import cache


class SignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmergencyContactView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
            contacts = EmergencyContact.objects.filter(user=request.user)
            serializer = EmergencyContactSerializer(contacts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EmergencyContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        contact = get_object_or_404(EmergencyContact, pk=pk, user=request.user)
        serializer = EmergencyContactSerializer(contact, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        contact = get_object_or_404(EmergencyContact, pk=pk, user=request.user)
        serializer = EmergencyContactSerializer(contact, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        contact = get_object_or_404(EmergencyContact, pk=pk, user=request.user)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SOSRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def is_rate_limited(self, user):
        # Create a unique key based on the user ID
        key = f"rate_limit_{user.pk}"
        
        # Get the current count of requests for the user from the cache, default to 0 if not found
        request_count = cache.get(key, 0)
        
        if request_count >= 3:  # Limit to 3 requests max per user
            return True
        
        # If not rate-limited, increment the count and set the cache with a timeout of 2 minutes
        cache.set(key, request_count + 1, timeout=120)  # 120 seconds = 2 minutes
        return False

    def post(self, request):
        if self.is_rate_limited(request.user):
            return Response(
                {"detail": "Rate limit exceeded. Try again in 2 minutes."},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        # Process the SOS request
        serializer = SOSRequestSerializer(data=request.data)
        if serializer.is_valid():
            sos_request = serializer.save(user=request.user)
            # self.send_sos_email_to_contacts(request.user, sos_request)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        sos_requests = SOSRequest.objects.filter(user=request.user)
        serializer = SOSRequestSerializer(sos_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
class StopSOSRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk=None):
        try:
            sos_request = SOSRequest.objects.get(pk=pk, user=request.user, is_active=True)
            sos_request.is_active = False
            sos_request.save()
            # self.send_safety_email_to_contacts(request.user, sos_request)
            return Response({'message': 'SOS request stopped, and safety email sent.'}, status=status.HTTP_200_OK)
        except SOSRequest.DoesNotExist:
            return Response({'error': 'Active SOS request not found.'}, status=status.HTTP_404_NOT_FOUND)

    def send_safety_email_to_contacts(self, user, sos_request):
        contacts = EmergencyContact.objects.filter(user=user)
        subject = "Safe Alert"
        message = (f"{user.username} has reported they are safe.\n"
                   f"Previous SOS request for {sos_request.emergency_type} has been canceled.\n"
                   f"No further assistance is needed at this time.")
        for contact in contacts:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [contact.email]
            )

class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"message": "Account deleted successfully"}, status=status.HTTP_200_OK)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status = status.HTTP_200_OK)

class NearbyIncidentsView(APIView):
    permission_classes = [AllowAny] 
    def get(self, request):
        user_latitude = float(request.GET.get('latitude'))
        user_longitude = float(request.GET.get('longitude'))

        one_week_ago = timezone.now() - timedelta(weeks = 4)
        incidents = Incident.objects.filter(timestamp__gte=one_week_ago).order_by('-timestamp')

        nearby_incidents = []
        for incident in incidents:
            distance = calculate_distance(user_latitude, user_longitude, incident.latitude, incident.longitude)

            if distance <= 5:
                serialized_incident = IncidentSerializer(incident).data
                serialized_incident['distance'] = round(distance, 2)
                nearby_incidents.append(serialized_incident)

        return Response({'incidents': nearby_incidents})

    def post(self, request):
        serializer = IncidentSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)