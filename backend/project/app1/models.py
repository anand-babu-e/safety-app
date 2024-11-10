from django.db import models
from django.contrib.auth.models import User

class EmergencyContact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)  
    relationship = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} ({self.relationship}) - {self.phone}"
        
class SOSRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    emergency_type = models.CharField(max_length=20)
    latitude = models.FloatField()
    longitude = models.FloatField()
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} - {self.emergency_type} on {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}, Status: {'Active' if self.is_active else 'Inactive'}"

class Incident(models.Model):
    incident_type = models.CharField(max_length = 20)
    latitude = models.FloatField()
    longitude = models.FloatField()
    description = models.TextField()
    timestamp = models.DateTimeField()

    def __str__(self):
        return f"{self.incident_type.capitalize()} on {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
