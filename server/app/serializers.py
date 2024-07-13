from rest_framework import serializers
from .models import Profiles


class ProfleSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Profiles
        fields = '__all__'
        extra_kwargs = {
            'profile_id': {"read_only": True},
            'user_id': {"read_only": True},
        }
