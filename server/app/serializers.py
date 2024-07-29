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
        read_only_fields = ("bid_id", "created_at", "updated_at", "bidder_id", "tasks")


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "user_id",
            "email",
            "password",
            "username",
            "is_bidder",
            "is_poster",
            "bio",
        )
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
        fields = "__all__"


class TasksSerializer(serializers.ModelSerializer):
    # bids = BidsSerializer(many=True, read_only=True)
    location = TaskLocationSerializer(read_only=False)

    class Meta:
        model = Tasks
        fields = "__all__"


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["username"] = user.username
        token["email"] = user.email
        token["is_active"] = user.is_active
        token["is_staff"] = user.is_staff

        return token


class UsersSerializer(serializers.ModelSerializer):
    tasks = TasksSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = (
            "password",
            "email",
            "username",
            "is_active",
            "is_staff",
            "is_bidder",
            "is_poster",
            "user_id",
            "bio",
            "tasks",
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


# class ProfleSerializer(serializers.ModelSerializer):
#     image_url = serializers.ImageField(required=False)

#     class Meta:
#         model = Profiles
#         fields = '__all__'
#         extra_kwargs = {
#             'profile_id': {"read_only": True},
#             'user_id': {"read_only": True},
#         }


# class ProfilesSerializer(serializers.ModelSerializer):
#     user_id = serializers.
# PrimaryKeyRelatedField(queryset=Users.objects.all())

#     class Meta:
#         model = Profiles
#         fields = '__all__'
