from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Auth

# Register your models here.
class AuthAdmin(UserAdmin) :
    list_display = (
        'id',
        'username',
        'password',
        'email',
        'mobile',
        'fullname',
        'country',
        'fatherName',
        'qualifications',
        'courses',
        'userType',
        'address',
        'gender',
        'isMobileVeriFied',
        'isEmailVerified',
        'is_active',
        'is_staff',
        'date_joined'
    )

admin.site.register(Auth, AuthAdmin)