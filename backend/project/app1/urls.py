from django.urls import path
from .views import EmergencyContactView, SOSRequestView, SignupView,  DeleteAccountView, UserDetailView, NearbyIncidentsView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('emergency-contacts/', EmergencyContactView.as_view()),
    path('emergency-contacts/<int:pk>/', EmergencyContactView.as_view()),
    path('sos-requests/', SOSRequestView.as_view()),
    path('signup/', SignupView.as_view()),  
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('delete-account/', DeleteAccountView.as_view()),
    path('user-details/',UserDetailView.as_view()),
    path('nearby-incidents/',NearbyIncidentsView.as_view())
]

