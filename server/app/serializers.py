from .models import Users, Tasks, Bids, TaskLocation
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class BidsSerializer(serializers.ModelSerializer):
    task_id = serializers.PrimaryKeyRelatedField(queryset=Tasks.objects.all())
    bidder_id = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())

    class Meta:
        model = Bids
        fields = "__all__"
        extra_kwargs = {
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True},
        }


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("user_id", "email", "password", "username", "bio", "avatar_url")
        extra_kwargs = {
            "password": {"write_only": True},
            "user_id": {"read_only": True},
        }

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user


class TaskLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskLocation
        fields = ["suburb", "state"]


class TasksSerializer(serializers.ModelSerializer):
    bids = BidsSerializer(many=True, read_only=True)
    location = TaskLocationSerializer()

    class Meta:
        model = Tasks
        fields = "__all__"

    def create(self, validated_data):
        location_data = validated_data.pop("location")
        task = Tasks.objects.create(**validated_data)
        TaskLocation.objects.create(task=task, **location_data)
        return task


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        return token


class UsersSerializer(serializers.ModelSerializer):
    tasks = TasksSerializer(many=True, read_only=True)
    bids = BidsSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = (
            "password",
            "email",
            "username",
            "user_id",
            "bio",
            "tasks",
            "bids",
            "avatar_url",
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }
