from rest_framework import serializers
from .models import Bids, Tasks, Users
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password


class BidsSerializer(serializers.ModelSerializer):
    task_id = serializers.PrimaryKeyRelatedField(queryset=Tasks.objects.all())
    bidder_id = serializers.PrimaryKeyRelatedField(
        queryset=Users.objects.all())

    class Meta:
        model = Bids
        fields = '__all__'
        read_only_fields = ('bid_id', 'created_at', 'updated_at', 'bidder_id')


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
