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
router.register(r'tasks', TasksViewSet, basename='tasks')

bids_list = BidsViewSet.as_view({
    'get': 'list',
    'post': 'create'
})


urlpatterns = [
    path("login/", obtain_jwt_token, name="get-jwt-token"),
    path("refresh/", refresh_jwt_token, name="refresh-jwt-token"),
    path("verify/", verify_jwt_token, name="verify-jwt-token"),
    path("register/", RegistrationView.as_view(), name="register"),
    path('tasks/<int:task_id>', bids_list, name='bids-list'),
    path('tasks/<int:owner_id>/bids',
         BidsViewSet.as_view({'get': 'list'}), name='user-tasks'),
    path('tasks/<int:task_id>/bids/<int:pk>/change_status/',
         BidsViewSet.as_view({'post': 'change_bid_status'}), name='bids-change-status'),
    path("", include(router.urls)),
]
