from rest_framework import serializers
from .models import Profiles


class ProfleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        fields = '__all__'
        extra_kwargs = {
            'profile_id': {"read_only": True},
            'user_id': {"read_only": True},
        }
