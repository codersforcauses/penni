from django.db import models
from django.core.exceptions import ValidationError


class Users(models.Model):
    """
    Model class: Users
    Represents users in the system.
    """
    user_id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=255)
    mobile = models.CharField(max_length=20)
    password_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=50)
    user_role = models.CharField(max_length=50, default='')

    def __str__(self):
        return (f"User {self.user_id}: email={self.email}, "
                f"mobile={self.mobile}, "
                f"password_hash={self.password_hash}, "
                f"created_at={self.created_at}, "
                f"updated_at={self.updated_at}, last_login={self.last_login},"
                f"status={self.status}")

    def clean(self):
        """
        Perform custom validation.
        """
        super().clean()
        # Example validation: Ensure mobile number contains only digits
        if not self.mobile.isdigit():
            raise ValidationError('Mobile number must contain only digits.')
        # Example validation: Ensure status is not empty
        if not self.status:
            raise ValidationError('Status must not be empty.')


class Profiles(models.Model):
    """
    Model class: Profiles
    Represents user profiles.
    """
    profile_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    avatar_url = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return (f"Profile {self.profile_id}: user_id={self.user_id}, "
                f"full_name={self.full_name}, "
                f"avatar_url={self.avatar_url}, bio={self.bio}")

    def clean(self):
        """
        Perform custom validation.
        """
        super().clean()
        # Example validation: Ensure full_name does not contain numbers
        if any(char.isdigit() for char in self.full_name):
            raise ValidationError('Full name must not contain numbers.')
        # Example validation: Ensure avatar_url is a valid URL (basic check)
        if self.avatar_url and \
           not self.avatar_url.startswith(('http://', 'https://')):
            raise ValidationError('Avatar URL must start' +
                                  'with http:// or https://')

    class Meta:
        verbose_name_plural = "Profiles"


class Tasks(models.Model):
    """
    Model class: Tasks
    Represents tasks in the system.
    """
    task_id = models.AutoField(primary_key=True)
    owner_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255, default='')

    description = models.TextField()
    location = models.CharField(max_length=255)
    estimated_price = models.CharField(max_length=255, default='')
    estimated_time = models.CharField(max_length=255, default='')
    deadline = models.DateTimeField()
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (f"Task {self.task_id}: owner_id={self.owner_id}, "
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
        if self.budget <= 0:
            raise ValidationError('Budget must be a positive value.')
        # Example validation: Ensure deadline is in the future
        if self.deadline <= self.created_at:
            raise ValidationError('Deadline must be in the future.')

    class Meta:
        verbose_name_plural = "Tasks"


class Bids(models.Model):
    """
    Model class: Bids
    Represents bids on tasks.
    """
    bid_id = models.AutoField(primary_key=True)
    task_id = models.ForeignKey(Tasks, on_delete=models.CASCADE)
    bidder_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    price = models.CharField(max_length=50, default='')
    message = models.TextField(blank=True)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (f"Bid {self.bid_id}: task_id={self.task_id},"
                f"bidder_id={self.bidder_id}, amount={self.amount}, "
                f"message={self.message}, status={self.status}, "
                f"created_at={self.created_at}, updated_at={self.updated_at}")

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
