from .serializers import BidsSerializer
from rest_framework import viewsets, status
from rest_framework.decorators import action

# from rest_framework import permissions

from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .models import Tasks, Bids, Users, TaskLocation

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

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

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "email",
                openapi.IN_QUERY,
                description="Email to check for uniqueness",
                type=openapi.TYPE_STRING,
                required=True,
            ),
        ],
        responses={
            200: openapi.Response(
                description="Email uniqueness check",
                examples={"application/json": {"is_unique": True}},
            ),
            400: openapi.Response(
                description="Invalid input",
                examples={"application/json": {"error": "Email parameter is missing"}},
            ),
        },
    )
    @action(
        detail=False,
        methods=["get"],
        permission_classes=[AllowAny],
        url_path="check-email",
    )
    def check_email_unique(self, request):
        email = request.query_params.get("email", None)
        if email is None:
            return Response(
                {"error": "Email parameter is missing"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        is_unique = not Users.objects.filter(email=email).exists()
        return Response({"is_unique": is_unique})

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


class TaskLocationViewSet(viewsets.ModelViewSet):
    queryset = TaskLocation.objects.all()
    serializer_class = TaskLocationSerializer
    permission_classes = [AllowAny]


class BidsViewSet(viewsets.ModelViewSet):
    queryset = Bids.objects.all()
    serializer_class = BidsSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        task_id = request.data.get("task_id")
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
