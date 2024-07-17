
from django.urls import path, include
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)
from rest_framework.routers import DefaultRouter
from .views import RegistrationView, ProfileViewSet

  
router = DefaultRouter()
router.register(r"profiles", ProfileViewSet, basename="profiles")

urlpatterns = [
    path("login/", obtain_jwt_token, name="get-jwt-token"),
    path("refresh/", refresh_jwt_token, name="refresh-jwt-token"),
    path("verify/", verify_jwt_token, name="verify-jwt-token"),
    path("register/", RegistrationView.as_view(), name="register"),
    path("", include(router.urls)),
]
