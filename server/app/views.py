# from django.shortcuts import render
from rest_framework import viewsets
from .models import Profiles
from .serializers import ProfleSerializer
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profiles.objects.all()
    serializer_class = ProfleSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
