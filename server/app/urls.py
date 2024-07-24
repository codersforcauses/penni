from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)
from .views import TasksViewSet, RegistrationView, ProfileViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import BidsViewSet

router = DefaultRouter()
router.register(r"profiles", ProfileViewSet, basename="profiles")
router.register(r"tasks", TasksViewSet, basename="tasks")
router.register(r"bids", BidsViewSet, basename="bids")

urlpatterns = [
    path("login/", obtain_jwt_token, name="get-jwt-token"),
    path("refresh/", refresh_jwt_token, name="refresh-jwt-token"),
    path("verify/", verify_jwt_token, name="verify-jwt-token"),
    path("register/", RegistrationView.as_view(), name="register"),
    # get all bids by task
    path(
        "tasks/<int:task_id>/bids/",
        BidsViewSet.as_view({"get": "get_task_bids", "post": "create"}),
        name="bids-list",
    ),
    # change bid status
    path(
        "bids/<int:bid_id>/change_status",
        BidsViewSet.as_view({"post": "change_bid_status"}),
        name="bids-change-status",
    ),
    path("users/", ProfileViewSet.as_view({"get": "list"}), name="users-list"),
    # Tasks with offered_price
    path(
        "users/<int:user_id>/bidded-tasks",
        BidsViewSet.as_view({"get": "get_user_bidded_tasks"}),
        name="user-bidded-tasks",
    ),
    # Get tasks/bids by user
    path(
        "users/<int:user_id>/tasks",
        TasksViewSet.as_view({"get": "get_user_tasks"}),
        name="user-tasks",
    ),
    path(
        "users/<int:user_id>/bids",
        BidsViewSet.as_view({"get": "get_user_bids"}),
        name="user-bids",
    ),
    path("", include(router.urls)),
]
