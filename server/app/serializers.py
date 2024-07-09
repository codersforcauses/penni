from rest_framework import serializers
from .models import Bids, Tasks, Users


class BidsSerializer(serializers.ModelSerializer):
    task_id = serializers.PrimaryKeyRelatedField(queryset=Tasks.objects.all())
    bidder_id = serializers.PrimaryKeyRelatedField(queryset=Users.objects.all())

    class Meta:
        model = Bids
        fields = '__all__'
        read_only_fields = ('bid_id', 'created_at', 'updated_at', 'bidder_id')
