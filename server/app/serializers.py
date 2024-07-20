from .models import Profiles
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import Users, Profiles, Tasks


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


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        extra_kwargs = {
            'password_hash': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password_hash', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password_hash', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


class ProfilesSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())

    class Meta:
        model = Profiles
        fields = '__all__'


class TasksSerializer(serializers.ModelSerializer):
    owner = UsersSerializer(read_only=True, source='owner_id')
    owner_id = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())

    class Meta:
        model = Tasks
        fields = '__all__'
