from django.urls import path
from .views import BidsViewSet
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)
from .views import RegistrationView

bids_list = BidsViewSet.as_view({
    'get': 'list',
    'post': 'create'
})


urlpatterns = [
    path("login/", obtain_jwt_token, name="get-jwt-token"),
    path("refresh/", refresh_jwt_token, name="refresh-jwt-token"),
    path("verify/", verify_jwt_token, name="verify-jwt-token"),
    path("register/", RegistrationView.as_view(), name="register"),
    path('tasks/<int:task_id>/bids/', bids_list, name='bids-list'),
    path('tasks/<int:task_id>/bids/<int:pk>/change_status/',
         BidsViewSet.as_view({'post': 'change_bid_status'}), name='bids-change-status'),
]
