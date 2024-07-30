from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password, check_password
from django.utils.timezone import now
import hashlib


def get_avatar_upload_path(instance, filename):
    ext = filename.split(".")[-1]
    hash_name = hashlib.md5(str(instance.user_id).encode("utf-8")).hexdigest()
    return f"avatars/{hash_name}.{ext}"


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, username, password, **extra_fields)


class Users(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    is_superuser = models.BooleanField(default=False)
    username = models.CharField(max_length=150, blank=True)
    email = models.CharField(max_length=255, unique=True)
    mobile = models.CharField(max_length=20, default="000", blank=True)
    # password_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # status = models.CharField(max_length=50, default='')
    # password = models.CharField(max_length=255)
    is_bidder = models.BooleanField(default=False)
    is_poster = models.BooleanField(default=False)
    avatar_url = models.ImageField(
        upload_to=get_avatar_upload_path, blank=True, null=True
    )
    bio = models.TextField(blank=True)

    objects = CustomUserManager()

    REQUIRED_FIELDS = ["username"]
    USERNAME_FIELD = "email"

    def __str__(self):
        return (
            f"User {self.user_id}: email={self.email}, "
            f"mobile={self.mobile}, "
            f"created_at={self.created_at}, "
            f"updated_at={self.updated_at}, last_login={self.last_login}, "
        )

    def clean(self):
        super().clean()
        if not self.mobile.isdigit():
            raise ValidationError({"mobile": "Mobile must contain only digits."})
        # if not self.status:
        #     raise ValidationError({'status': 'This field cannot be blank.'})

    def set_password(self, password):
        self.password = make_password(password)

    def check_password(self, password):
        return check_password(password, self.password)

    def save(self, *args, **kwargs):
        try:
            this = Users.objects.get(user_id=self.user_id)
            if this.avatar_url != self.avatar_url:
                this.avatar_url.delete(save=False)
        except Users.DoesNotExist:
            pass
        super(Users, self).save(*args, **kwargs)


class Tasks(models.Model):
    """
    Model class: Tasks
    Represents tasks in the system.
    """

    task_id = models.AutoField(primary_key=True)
    poster_id = models.ForeignKey(Users, related_name="tasks", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255, default="")

    description = models.TextField()
    budget = models.CharField(max_length=255, default="")
    estimated_time = models.CharField(max_length=255, default="")
    deadline = models.DateTimeField()
    status = models.CharField(max_length=50, default="BIDDING")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f"Task {self.task_id}: poster_id={self.poster_id}, "
            f"title={self.title}, description={self.description}, "
            f"budget={self.budget}, "
            f"deadline={self.deadline}, status={self.status}, "
            f"created_at={self.created_at}, updated_at={self.updated_at}"
        )

    def clean(self):
        """
        Perform custom validation.
        """
        super().clean()
        # Example validation: Ensure budget is positive
        try:
            budget_value = float(self.budget)
            if budget_value <= 0:
                raise ValidationError("Budget must be a positive value.")
        except ValueError:
            raise ValidationError("Price must be a valid number.")
        # Example validation: Ensure deadline is in the future
        if self.deadline <= now():
            raise ValidationError({"deadline": "Deadline must be in the future."})

    class Meta:
        verbose_name_plural = "Tasks"


class TaskLocation(models.Model):
    """
    Model class: TaskLocation
    Represents the location of a task.
    """

    task = models.OneToOneField(
        Tasks, related_name="location", on_delete=models.CASCADE
    )
    suburb = models.CharField(max_length=255, default="")
    state = models.CharField(max_length=255, default="")

    def __str__(self):
        return (
            f"TaskLocation {self.task.task_id}: suburb={self.suburb}, "
            f"state={self.state}"
        )


class Bids(models.Model):
    """
    Model class: Bids
    Represents bids on tasks.
    """

    bid_id = models.AutoField(primary_key=True)
    task_id = models.ForeignKey(Tasks, related_name="bids", on_delete=models.CASCADE)
    bidder_id = models.ForeignKey(Users, related_name="bids", on_delete=models.CASCADE)
    price = models.CharField(max_length=50, default="")
    message = models.TextField(blank=True)
    status = models.CharField(max_length=50, default="BIDDING")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f"Bid {self.bid_id}: task_id={self.task_id},"
            f"bidder_id={self.bidder_id}, price={self.price}, "
            f"message={self.message}, status={self.status}, "
            f"created_at={self.created_at}, updated_at={self.updated_at}"
        )

    @classmethod
    def acceptedBids(cls):
        return cls.objects.filter(status="accepted")

    def clean(self):
        """
        Perform custom validation.
        """
        super().clean()
        # Example validation: Ensure price is a positive value
        try:
            price_value = float(self.price)
            if price_value <= 0:
                raise ValidationError("Price must be a positive value.")
        except ValueError:
            raise ValidationError("Price must be a valid number.")

        # Example validation: Ensure status is not empty
        if not self.status:
            raise ValidationError("Status must not be empty.")

    class Meta:
        verbose_name_plural = "Bids"


class Payments(models.Model):
    """
    Model class: Payments
    Represents payments for tasks.
    """

    payment_id = models.AutoField(primary_key=True)
    task_id = models.ForeignKey(Tasks, on_delete=models.CASCADE)
    payer_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f"Payment {self.payment_id}: task_id={self.task_id}, "
            f"payer_id={self.payer_id}, amount={self.amount}, "
            f"payment_method={self.payment_method}, status={self.status}, "
            f"created_at={self.created_at}"
        )

    def clean(self):
        """
        Perform custom validation.
        """
        super().clean()
        # Example validation: Ensure amount is a positive value
        if self.amount <= 0:
            raise ValidationError("Amount must be a positive value.")
        # Example validation: Ensure payment_method is not empty
        if not self.payment_method:
            raise ValidationError("Payment method must not be empty.")

    class Meta:
        verbose_name_plural = "Payments"
