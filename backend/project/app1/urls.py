from django.urls import path
from .views import EmergencyContactView, SOSRequestView, SignupView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('emergency-contacts/', EmergencyContactView.as_view()),
    path('emergency-contacts/<int:pk>/', EmergencyContactView.as_view()),
    path('sos-requests/', SOSRequestView.as_view()),
    path('sos-requests/<int:pk>/', SOSRequestView.as_view()),
    path('signup/', SignupView.as_view()),  
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/', TokenObtainPairView.as_view()),
]

