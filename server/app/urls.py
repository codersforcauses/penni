from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BidsViewSet

# Create a router and register the bid viewset
router = DefaultRouter()
router.register(r'tasks/(?P<task_id>\d+)/bids', BidsViewSet, basename='bids')

# Define the URL patterns
urlpatterns = [
    path('', include(router.urls)),
]
