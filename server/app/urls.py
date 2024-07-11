from django.urls import path
from .views import BidsViewSet


bids_list = BidsViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

bids_accept = BidsViewSet.as_view({
    'post': 'accept'
})

bids_reject = BidsViewSet.as_view({
    'post': 'reject'
})

bids_pending = BidsViewSet.as_view({
    'post': 'pending'
})

urlpatterns = [
    path('tasks/<int:task_id>/bids/', bids_list, name='bids-list'),
    path('tasks/<int:task_id>/bids/<int:pk>/accept/', bids_accept, name='bids-accept'),
    path('tasks/<int:task_id>/bids/<int:pk>/reject/', bids_reject, name='bids-reject'),
    path('tasks/<int:task_id>/bids/<int:pk>/review/', bids_pending, name='bids-pending'),
]
