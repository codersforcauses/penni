from .views import TasksViewSet, RegistrationView, UserViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import BidsViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
# router.register(r'profiles', ProfileViewSet, basename="profiles")
router.register(r"tasks", TasksViewSet, basename="tasks")
router.register(r"bids", BidsViewSet, basename="bids")
router.register(r"users", UserViewSet, basename="users")


urlpatterns = [
    # path("login/", obtain_jwt_token, name="get-jwt-token"),
    # path("refresh/", refresh_jwt_token, name="refresh-jwt-token"),
    # path("verify/", verify_jwt_token, name="verify-jwt-token"),
    # get all bids by task
    # path("tasks/<int:task_id>/bids/", BidsViewSet.as_view(
    #     {'get': 'get_task_bids', 'post': 'create'}), name='bids-list'),
    # # change bid status
    # path("bids/<int:bid_id>/change_status", BidsViewSet.as_view(
    #     {'post': 'change_bid_status'}), name='bids-change-status'),
    # # Get tasks/bids by user
    # # path("users/", ProfileViewSet.as_view({'get': 'list'}),
    # name='users-list'),
    # path("users/<int:user_id>/tasks",
    #      TasksViewSet.as_view({'get': 'get_user_tasks'}), name='user-tasks'),
    # path("users/<int:user_id>/bids",
    #      BidsViewSet.as_view({'get': 'get_user_bids'}), name='user-bids'),
    path("", include(router.urls)),
    path("register/", RegistrationView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
