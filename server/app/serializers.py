from .models import Profiles
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "email",
            "password",
            "username"
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "id": {"read_only": True},
            "username": {"required": False, "allow_blank": True},
        }

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class ProfleSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Profiles
        fields = '__all__'
        extra_kwargs = {
            'profile_id': {"read_only": True},
            'user_id': {"read_only": True},
        }
