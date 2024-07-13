from rest_framework import serializers
from .models import Users, Profiles, Tasks, Bids, Payments


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


class BidsSerializer(serializers.ModelSerializer):
    task_id = serializers.PrimaryKeyRelatedField(queryset=Tasks.objects.all())
    bidder_id = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())

    class Meta:
        model = Bids
        fields = '__all__'


class PaymentsSerializer(serializers.ModelSerializer):
    task_id = serializers.PrimaryKeyRelatedField(queryset=Tasks.objects.all())
    payer_id = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())

    class Meta:
        model = Payments
        fields = '__all__'
