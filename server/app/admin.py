from django.contrib import admin
from .models import Tasks, Bids, Payments
from django.contrib.auth.admin import UserAdmin

from .models import Users


@admin.register(Users)
class UserAdminConfig(UserAdmin):
    model = Users
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
    )
    list_filter = ("is_bidder", "is_poster")
    search_fields = ("email", "mobile")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "email", "mobile")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "first_name",
                    "last_name",
                    "is_active",
                    "is_staff",
                    "is_bidder",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )


# admin.site.register(Users, UserAdminConfig)

# Tasks Table Interface


@admin.register(Tasks)
class TasksAdmin(admin.ModelAdmin):
    list_display = (
        "task_id",
        "poster_id",
        "title",
        "category",
        "description",
        "location",
        "budget",
        "estimated_time",
        "deadline",
        "created_at",
        "updated_at",
    )
    list_filter = ("category", "status")
    search_fields = ("title", "category", "description", "location")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)


# Bids Table Interface
@admin.register(Bids)
class BidsAdmin(admin.ModelAdmin):
    list_display = (
        "bid_id",
        "task_id",
        "bidder_id",
        "price",
        "message",
        "status",
        "created_at",
        "updated_at",
    )
    list_filter = ("status", "task_id", "bidder_id")


# Payments Table Interface
@admin.register(Payments)
class PaymentsAdmin(admin.ModelAdmin):
    list_display = (
        "payment_id",
        "task_id",
        "payer_id",
        "amount",
        "payment_method",
        "status",
        "created_at",
    )
    list_filter = (
        "payment_method",
        "status",
    )
    search_fields = ("payment_id", "task_id", "payer_id")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
