from django.urls import path
from .views import EmergencyContactView, SOSRequestView, SignupView,  DeleteAccountView, UserDetailView, NearbyIncidentsView, StopSOSRequestView, OTPRequestView, OTPVerificationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('emergency-contacts/', EmergencyContactView.as_view()),
    path('emergency-contacts/<int:pk>/', EmergencyContactView.as_view()),
    path('sos-requests/', SOSRequestView.as_view()),
    path('sos-requests/<int:pk>/cancel/', StopSOSRequestView.as_view()),
    path('signup/', SignupView.as_view()),  
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('delete-account/', DeleteAccountView.as_view()),
    path('user-details/',UserDetailView.as_view()),
    path('nearby-incidents/',NearbyIncidentsView.as_view()),
    path('sos-requests/<int:pk>/stop/', StopSOSRequestView.as_view()),
    path('request-otp/', OTPRequestView.as_view()),
    path('verify-otp/', OTPVerificationView.as_view()),
]

