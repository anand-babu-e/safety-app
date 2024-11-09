from django.contrib import admin
from .models import EmergencyContact, SOSRequest, Incident 

# Register your models here.
admin.site.register([EmergencyContact, SOSRequest, Incident])


