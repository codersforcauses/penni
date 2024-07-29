from rest_framework import permissions


class IsCurrentUser(permissions.BasePermission):
    """
    Custom permission to only allow users to access their own resources.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the snippet.
        return obj == request.user


class IsBidder(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_bidder and super().has_permission(request, view)


class IsPoster(permissions.BasePermission):
    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.is_poster
