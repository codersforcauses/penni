from django.urls import path
from .views import BidsViewSet


bids_list = BidsViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

urlpatterns = [
    path('tasks/<int:task_id>/bids/', bids_list, name='bids-list'),
    path('tasks/<int:task_id>/bids/<int:pk>/change_status/', BidsViewSet.as_view({'post': 'change_bid_status'}), name='bids-change-status'),
]
