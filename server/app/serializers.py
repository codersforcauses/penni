from .models import Users, Tasks, Bids
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password


class BidsSerializer(serializers.ModelSerializer):
    task_id = serializers.PrimaryKeyRelatedField(queryset=Tasks.objects.all())
    bidder_id = serializers.PrimaryKeyRelatedField(
        queryset=Users.objects.all())

    class Meta:
        model = Bids
        fields = "__all__"
        read_only_fields = ("bid_id", "created_at", "updated_at", "bidder_id")


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "email", "password", "username")
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


class UsersSerializer(serializers.ModelSerializer):
    avatar_url = serializers.ImageField(required=False)

    class Meta:
        model = Users
        fields = "__all__"
        extra_kwargs = {
            "password_hash": {"write_only": True},
        }

    def create(self, validated_data):
        password = validated_data.pop("password_hash", None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password_hash", None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


class TasksSerializer(serializers.ModelSerializer):
    owner = UsersSerializer(read_only=True, source="owner_id")
    owner_id = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())

    class Meta:
        model = Tasks
        fields = "__all__"
