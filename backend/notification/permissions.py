from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, req, view):
        if req.user and req.user.userType == 'admin':
            return True