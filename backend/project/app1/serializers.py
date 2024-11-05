from rest_framework import serializers
from .models import EmergencyContact, SOSRequest
from rest_framework import serializers
from django.contrib.auth.models import User


class SignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required.")
        return value

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = '__all__'
        read_only_fields = ['user'] 

class SOSRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SOSRequest
        fields = '__all__'
        read_only_fields = ['user'] 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

