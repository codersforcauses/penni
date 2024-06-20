from django.urls import path
from . import views

app_name = "healthcheck"
urlpatterns = [
    path("ping/", views.ping, name="ping"),
]
