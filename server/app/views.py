from rest_framework.decorators import action
from .serializers import BidsSerializer
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .models import Tasks, Profiles, Bids
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import TasksSerializer, UsersSerializer
from .serializers import RegistrationSerializer, ProfleSerializer
from django.shortcuts import get_object_or_404


class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer

    @action(detail=False, methods=["post"])
    def post_task(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            task = serializer.save(status="open")
            owner_data = UsersSerializer(task.owner_id).data
            response_data = {
                "task_id": task.task_id,
                "user": owner_data,
                "status": "success",
                "message": "Task created successfully.",
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def get_user_tasks(self, request, user_id=None):
        if user_id:
            tasks = Tasks.objects.filter(owner_id=user_id)
            serializer = TasksSerializer(tasks, many=True)
            return Response(
                {"status": "success", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"status": "error", "message": "User ID is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )


class BidsViewSet(viewsets.ModelViewSet):
    queryset = Bids.objects.all()
    serializer_class = BidsSerializer

    def create(self, request, *args, **kwargs):
        task_id = self.kwargs.get("task_id")
        try:
            task = Tasks.objects.get(task_id=task_id)
        except Tasks.DoesNotExist:
            return Response(
                {"status": "error", "message": "Task not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        data = request.data.copy()
        data["task_id"] = task_id
        data["bidder_id"] = request.data["bidder_id"]
        # check task status
        if task.status != "open":
            return Response(
                {"status": "error", "message": "Cannot place bid on a closed task."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "bid_id": serializer.data["bid_id"],
                "status": "success",
                "message": "Bid submitted successfully.",
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

    @action(detail=True, methods=["get"])
    def get_task_bids(self, request, task_id=None):
        if task_id:
            bids = Bids.objects.filter(task_id=task_id)
            serializer = BidsSerializer(bids, many=True)
            return Response(
                {"status": "success", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"status": "error", "message": "Task ID is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    @action(detail=True, methods=["post"])
    def change_bid_status(self, request, pk=None):
        valid_statuses = ["accepted", "rejected", "pending"]
        action_type = request.data.get("action_type")

        if action_type not in valid_statuses:
            return Response(
                {"status": "error", "message": "Invalid action type."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bid = self.get_object()
        bid.status = action_type
        bid.save()

        action_messages = {
            "accepted": "Bid accepted.",
            "rejected": "Bid rejected.",
            "pending": "Bid pending.",
        }

        return Response({"status": "success", "message": action_messages[action_type]})

    @action(detail=True, methods=["get"])
    def get_user_bids(self, request, user_id=None):
        if user_id:
            bids = Bids.objects.filter(bidder_id=user_id)
            serializer = BidsSerializer(bids, many=True)
            return Response(
                {"status": "success", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"status": "error", "message": "User ID is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    @action(detail=True, methods=["get"])
    def get_user_bidded_tasks(self, request, user_id=None):
        bids = Bids.objects.filter(bidder_id=user_id)
        tasks = [bid.task_id for bid in bids]
        serializer = TasksSerializer(tasks, many=True)
        bidded_tasks = []
        for task, bid in zip(serializer.data, bids):
            task["bidded_price"] = bid.price
            bidded_tasks.append(task)
        return Response(
            {"status": "success", "data": bidded_tasks}, status=status.HTTP_200_OK
        )


class RegistrationView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profiles.objects.all()
    serializer_class = ProfleSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
