from django.contrib import admin
from .models import Users, Tasks, Bids, Payments


# Users Table Interface
@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = (
        "user_id",
        "email",
        "mobile",
        "created_at",
        "updated_at",
        "last_login",
        "status",
        "user_role",
        "full_name",
        "avatar_url"
    )
    list_filter = ("user_role", "status")
    search_fields = ("email", "mobile", "full_name")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)


# Tasks Table Interface
@admin.register(Tasks)
class TasksAdmin(admin.ModelAdmin):
    list_display = (
        "task_id",
        "owner_id",
        "title",
        "category",
        "description",
        "location",
        "budget",
        "estimated_time",
        "deadline",
        "status",
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
