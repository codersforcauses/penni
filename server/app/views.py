# from django.shortcuts import render
from rest_framework import viewsets
from .models import Profiles
from .serializers import ProfleSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profiles.objects.all()
    serializer_class = ProfleSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
