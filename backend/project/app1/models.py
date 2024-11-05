from django.db import models
from django.contrib.auth.models import User

class EmergencyContact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)  
    relationship = models.CharField(max_length=50)
        
class SOSRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    EMERGENCY_TYPES = [
        ('vehicle', 'Vehicle Emergency'),
        ('medical', 'Medical Emergency'),
        ('other', 'Other Emergency'),
    ]
    emergency_type = models.CharField(max_length=20, choices=EMERGENCY_TYPES)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


