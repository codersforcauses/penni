from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password, check_password
from django.utils.timezone import now
import hashlib


def get_avatar_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    hash_name = hashlib.md5(str(instance.user_id).encode('utf-8')).hexdigest()
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
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, password, **extra_fields)


class Users(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    is_superuser = models.BooleanField(default=False)
    username = models.CharField(max_length=150)
    email = models.CharField(max_length=255, unique=True)
    mobile = models.CharField(max_length=20, default='000', blank=True)
    # password_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # status = models.CharField(max_length=50, default='')
    # password = models.CharField(max_length=255)
    is_bidder = models.BooleanField(default=False)
    is_poster = models.BooleanField(default=False)
    avatar_url = models.ImageField(
        upload_to=get_avatar_upload_path, blank=True, null=True)
    bio = models.TextField(blank=True)

    objects = CustomUserManager()

    REQUIRED_FIELDS = ['username']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return (f"User {self.user_id}: email={self.email}, "
                f"mobile={self.mobile}, "
                f"created_at={self.created_at}, "
                f"updated_at={self.updated_at}, last_login={self.last_login}, "
                )

    def clean(self):
        super().clean()
        if not self.mobile.isdigit():
            raise ValidationError(
                {'mobile': 'Mobile must contain only digits.'})
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
    poster_id = models.ForeignKey(
        Users, related_name='tasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255, default='')

    description = models.TextField()
    location = models.CharField(max_length=255)
    budget = models.CharField(max_length=255, default='')
    estimated_time = models.CharField(max_length=255, default='')
    deadline = models.DateTimeField()
    status = models.CharField(max_length=50, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (f"Task {self.task_id}: poster_id={self.poster_id}, "
                f"title={self.title}, description={self.description}, "
                f"location={self.location}, budget={self.budget}, "
                f"deadline={self.deadline}, status={self.status}, "
                f"created_at={self.created_at}, updated_at={self.updated_at}")

    def clean(self):
        """
        Perform custom validation.
        """
        super().clean()
        # Example validation: Ensure budget is positive
        try:
            budget_value = float(self.budget)
            if budget_value <= 0:
                raise ValidationError('Budget must be a positive value.')
        except ValueError:
            raise ValidationError('Price must be a valid number.')
        # Example validation: Ensure deadline is in the future
        if self.deadline <= now():
            raise ValidationError(
                {'deadline': 'Deadline must be in the future.'})

    class Meta:
        verbose_name_plural = "Tasks"


class Bids(models.Model):
    """
    Model class: Bids
    Represents bids on tasks.
    """
    bid_id = models.AutoField(primary_key=True)
    task_id = models.ForeignKey(
        Tasks, related_name='bids', on_delete=models.CASCADE)
    bidder_id = models.ForeignKey(
        Users, related_name='bids', on_delete=models.CASCADE)
    price = models.CharField(max_length=50, default='')
    message = models.TextField(blank=True)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (f"Bid {self.bid_id}: task_id={self.task_id},"
                f"bidder_id={self.bidder_id}, price={self.price}, "
                f"message={self.message}, status={self.status}, "
                f"created_at={self.created_at}, updated_at={self.updated_at}")

    @classmethod
    def acceptedBids(cls):
        return cls.objects.filter(status='accepted')

    def clean(self):
        """
        Perform custom validation.
        """
        super().clean()
        # Example validation: Ensure price is a positive value
        try:
            price_value = float(self.price)
            if price_value <= 0:
                raise ValidationError('Price must be a positive value.')
        except ValueError:
            raise ValidationError('Price must be a valid number.')

        # Example validation: Ensure status is not empty
        if not self.status:
            raise ValidationError('Status must not be empty.')

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
        return (f"Payment {self.payment_id}: task_id={self.task_id}, "
                f"payer_id={self.payer_id}, amount={self.amount}, "
                f"payment_method={self.payment_method}, status={self.status}, "
                f"created_at={self.created_at}")

    def clean(self):
        """
        Perform custom validation.
        """
        super().clean()
        # Example validation: Ensure amount is a positive value
        if self.amount <= 0:
            raise ValidationError('Amount must be a positive value.')
        # Example validation: Ensure payment_method is not empty
        if not self.payment_method:
            raise ValidationError('Payment method must not be empty.')

    class Meta:
        verbose_name_plural = "Payments"


# class AuthUserManager(BaseUserManager):
#     use_in_migrations = True

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     def create_user(self, email, password, username=None, **extra_fields):
#         if not email:
#             raise ValueError("Users must have an email address")
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password, **extra_fields):
#         extra_fields.setdefault("is_staff", True)
#         extra_fields.setdefault("is_superuser", True)
#         extra_fields.setdefault("is_active", True)

#         if extra_fields.get("is_staff") is not True:
#             raise ValueError("Superuser must have is_staff=True")

#         if extra_fields.get("is_superuser") is not True:
#             raise ValueError("Superuser must have is_superuser=True")

#         if extra_fields.get("is_active") is not True:
#             raise ValueError("Superuser must have is_active=True")

#         return self.create_user(email, password, **extra_fields)


# class AuthUsers(AbstractUser):
#     user_id = models.AutoField(primary_key=True)
#     email = models.CharField(max_length=255, unique=True)
#     mobile = models.CharField(max_length=20)
#     password = models.CharField(max_length=255)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     last_login = models.DateTimeField(null=True, blank=True)
#     status = models.CharField(max_length=50, blank=True)
#     # user_role = models.CharField(max_length=50, default='')

#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     groups = models.ManyToManyField('auth.Group',
#                                     related_name='custom_user_set',
# blank=True)
#     user_permissions = models.ManyToManyField(
#         'auth.Permission', related_name='custom_user_set', blank=True)

#     objects = AuthUserManager()
#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = ["grade", "first_name", "last_name", "password"]

#     def __str__(self):
#         return (f"User {self.user_id}: email={self.email}, "
#                 f"mobile={self.mobile}, "
#                 f"created_at={self.created_at}, "
#                 f"updated_at={self.updated_at}, last_login={self.last_login},
# "
#                 f"status={self.status}")

#     def clean(self):
#         super().clean()
#         if not self.mobile.isdigit():
#             raise ValidationError(
#                 {'mobile': 'Mobile must contain only digits.'})
#         if not self.status:
#             raise ValidationError({'status': 'This field cannot be blank.'})

#     def set_password(self, raw_password):
#         self.password_hash = make_password(raw_password)

#     def check_password(self, raw_password):
#         return check_password(raw_password, self.password)


# Function that hash the avatar image name, so image name will keep consistant
# def get_avatar_upload_path(instance, filename):
#     ext = filename.split('.')[-1]
#     hash_name = hashlib.md5(str(instance.user_id).
# encode('utf-8')).hexdigest()

#     return f"avatars/{hash_name}.{ext}"


# class Profiles(models.Model):
#     profile_id = models.AutoField(primary_key=True)
#     user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
#     full_name = models.CharField(max_length=255)
#     avatar_url = models.ImageField(
#         upload_to=get_avatar_upload_path, blank=True, null=True)
#     bio = models.TextField(blank=True)

#     def __str__(self):
#         return (f"Profile {self.profile_id}: user_id={self.user_id}, "
#                 f"full_name={self.full_name}, "
#                 f"avatar_url={self.avatar_url}, bio={self.bio}")

#     def clean(self):
#         super().clean()
#         if any(char.isdigit() for char in self.full_name):
#             raise ValidationError(
#                 {'full_name': 'Full name must not contain numbers.'})

#     # Override save function, so now it will delete old avatar, if a user who
#     # has existing profile pic upload a new profile pic
#     def save(self, *args, **kwargs):
#         try:
#             this = Profiles.objects.get(profile_id=self.profile_id)
#             if this.avatar_url != self.avatar_url:
#                 this.avatar_url.delete(save=False)
#         except Profiles.DoesNotExist:
#             pass
#         super(Profiles, self).save(*args, **kwargs)

#     class Meta:
#         verbose_name_plural = "Profiles"
