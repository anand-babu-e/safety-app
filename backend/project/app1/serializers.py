from rest_framework import serializers
from .models import EmergencyContact, Incident, SOSRequest
from rest_framework import serializers
from django.contrib.auth.models import User


class SignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
            'email': {'required': True}  
        }
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = '__all__'
        extra_kwargs = {
            'user': {'read_only': True}  
        } 

class SOSRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SOSRequest
        fields = '__all__'
        extra_kwargs = {
            'user': {'read_only': True}  
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = ['incident_type', 'latitude', 'longitude', 'description', 'timestamp']

