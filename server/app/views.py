from rest_framework.decorators import action
from .serializers import BidsSerializer
from rest_framework import viewsets, status

# from rest_framework import permissions

from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .models import Tasks, Bids, Users, TaskLocation

# from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import (
    RegistrationSerializer,
    TasksSerializer,
    UsersSerializer,
    TaskLocationSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken

# from .permissions import IsBidder
# from .permissions import IsCurrentUser


class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    # permission_classes = [IsCurrentUser]
    permission_classes = [AllowAny]

    # def get_queryset(self):
    #     if self.request.user.is_superuser:
    #         return Users.objects.all()
    #     return Users.objects.filter(user_id=self.request.user.user_id)


class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # @action(detail=False, methods=['post'])
    # def post_task(self, request):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         task = serializer.save(status='open')
    #         owner_data = UsersSerializer(task.user_id).data
    #         response_data = {
    #             'task_id': task.task_id,
    #             'user': owner_data,
    #             'status': 'success',
    #             'message': 'Task created successfully.'
    #         }
    #         return Response(response_data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=st
    # atus.HTTP_400_BAD_REQUEST)

    # @action(detail=True, methods=['get'])
    # def get_user_tasks(self, request, user_id=None):
    #     if user_id:
    #         tasks = Tasks.objects.filter(user_id=user_id)
    #         serializer = TasksSerializer(tasks, many=True)
    #         return Response({'status': 'success',
    # 'data': serializer.data}, status=status.HTTP_200_OK)
    #     return Response({'status': 'error', 'messa
    # ge': 'User ID is required.'}, status=status.HTTP_400_BAD_REQUEST)


class TaskLocationViewSet(viewsets.ModelViewSet):
    queryset = TaskLocation.objects.all()
    serializer_class = TaskLocationSerializer
    permission_classes = [AllowAny]


class BidsViewSet(viewsets.ModelViewSet):
    queryset = Bids.objects.all()
    serializer_class = BidsSerializer
    permission_classes = [AllowAny]

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
        if task.status != "BIDDING":
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

    def update(self, request, *args, **kwargs):
        valid_statuses = ["COMPLETED", "ONGOING", "BIDDING", "EXPIRED"]
        status_code = request.data.get("status")

        if status_code not in valid_statuses:
            return Response(
                {"status": "error", "message": "Invalid action type."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bid = self.get_object()
        bid.status = status_code
        bid.save()
        super().update(request, *args, **kwargs)
        return Response(
            {
                "status": "success",
                "message": f"bid_id:{bid.bid_id} bid status: {status_code}",
            }
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
        status = request.data.get("status")

        if status not in valid_statuses:
            return Response(
                {"status": "error", "message": "Invalid action type."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bid = self.get_object()
        bid.status = status
        bid.save()

        action_messages = {
            "accepted": "Bid accepted.",
            "rejected": "Bid rejected.",
            "pending": "Bid pending.",
        }

        return Response({"status": "success", "message": action_messages[status]})

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


class RegistrationView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        response_data = {
            "user": serializer.data,
            "access_token": access_token,
            "refresh_token": refresh_token,
        }

        return Response(response_data, status=status.HTTP_201_CREATED)


# class ProfileViewSet(viewsets.ModelViewSet):
#     queryset = Profiles.objects.all()
#     serializer_class = ProfleSerializer
#     parser_classes = (MultiPartParser, FormParser)
#     permission_classes = [
#         permissions.IsAuthenticatedOrReadOnly]

#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)
