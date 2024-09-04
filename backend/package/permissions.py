from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, req, view):
        try:
            if req.user and req.user.userType == 'admin':
                return True
        except:
            return False