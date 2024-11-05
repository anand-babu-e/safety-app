from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import EmergencyContactSerializer, SOSRequestSerializer
from .models import EmergencyContact, SOSRequest
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SignupSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404

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
    def get(self, request, pk=None):
        if pk:
            contact = get_object_or_404(EmergencyContact, pk=pk, user=request.user)
            serializer = EmergencyContactSerializer(contact)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
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

    def get(self, request, pk=None):
        if pk:
            sos_request = get_object_or_404(SOSRequest, pk=pk, user=request.user)
            serializer = SOSRequestSerializer(sos_request)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            sos_requests = SOSRequest.objects.filter(user=request.user)
            serializer = SOSRequestSerializer(sos_requests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SOSRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def put(self, request, pk=None):
    #     sos_request = get_object_or_404(SOSRequest, pk=pk, user=request.user)
    #     serializer = SOSRequestSerializer(sos_request, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def patch(self, request, pk=None):
    #     sos_request = get_object_or_404(SOSRequest, pk=pk, user=request.user)
    #     serializer = SOSRequestSerializer(sos_request, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, pk=None):
    #     sos_request = get_object_or_404(SOSRequest, pk=pk, user=request.user)
    #     sos_request.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)