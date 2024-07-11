from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Bids, Tasks
from .serializers import BidsSerializer
from rest_framework import status


class BidsViewSet(viewsets.ModelViewSet):
    queryset = Bids.objects.all()
    serializer_class = BidsSerializer

    def create(self, request, *args, **kwargs):
        task_id = self.kwargs.get('task_id')
        try:
            task = Tasks.objects.get(task_id=task_id)
        except Tasks.DoesNotExist:
            return Response({'status': 'error', 'message': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)
        data = request.data
        data['task_id'] = task_id
        data['bidder_id'] = request.user.id
        # check task status
        if task.status != 'open':
            return Response({'status': 'error', 'message': 'Cannot place bid on a closed task.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'bid_id': serializer.data['bid_id'], 'status': 'success', 'message': 'Bid submitted successfully.'},
            status=status.HTTP_201_CREATED, headers=headers
        )

    def list(self, request, *args, **kwargs):
        task_id = self.kwargs.get('task_id')
        bids = Bids.objects.filter(task_id=task_id)
        serializer = self.get_serializer(bids, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        bid = self.get_object()
        bid.status = 'accepted'
        bid.save()
        return Response({'status': 'success', 'message': 'Bid accepted.'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        bid = self.get_object()
        bid.status = 'rejected'
        bid.save()
        return Response({'status': 'success', 'message': 'Bid rejected.'})

    @action(detail=True, methods=['post'])
    def pending(self, request, pk=None):
        bid = self.get_object()
        bid.status = 'pending'
        bid.save()
        return Response({'status': 'success', 'message': 'Bid pending.'})
