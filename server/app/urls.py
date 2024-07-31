from .views import (
    TasksViewSet,
    RegistrationView,
    UserValidationView,
    UserViewSet,
    BidsViewSet,
    TaskLocationViewSet,
)
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
# router.register(r'profiles', ProfileViewSet, basename="profiles")
router.register(r"tasks", TasksViewSet, basename="tasks")
router.register(r"bids", BidsViewSet, basename="bids")
router.register(r"users", UserViewSet, basename="users")
router.register(r"locations", TaskLocationViewSet, basename="locations")


urlpatterns = [
    path("", include(router.urls)),
    path("register/", RegistrationView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("validate/", UserValidationView.as_view(), name="user-validation"),
]
