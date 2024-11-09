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

    def get(self, request):
        sos_requests = SOSRequest.objects.filter(user=request.user)
        serializer = SOSRequestSerializer(sos_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SOSRequestSerializer(data=request.data)
        if serializer.is_valid():
            sos_request = serializer.save(user=request.user)
            self.send_sos_email_to_contacts(request.user, sos_request)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def send_sos_email_to_contacts(self, user, sos_request):
        contacts = EmergencyContact.objects.filter(user=user)

        subject = "Emergency Alert!"
        location_url = f"https://www.google.com/maps?q={sos_request.latitude},{sos_request.longitude}"
        message = (f"{user.username} has sent an SOS request.<br>"
                f"Emergency Type: {sos_request.emergency_type}.<br>"
                f"Location: <a href='{location_url}'>{location_url}</a>.<br>"
                f"Message: {sos_request.message}<br>")

        for contact in contacts:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [contact.email]
            )

class StopSOSRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk=None):
        try:
            sos_request = SOSRequest.objects.get(pk=pk, user=request.user, is_active=True)
            sos_request.is_active = False
            sos_request.save()
            self.send_safety_email_to_contacts(request.user, sos_request)
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
    def get(self, request):
        user_latitude = float(request.GET.get('latitude'))
        user_longitude = float(request.GET.get('longitude'))

        one_week_ago = timezone.now() - timedelta(weeks = 1)
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