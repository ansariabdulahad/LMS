from django.db import models

# Create your models here.
from django.contrib.auth.models import (
    AbstractBaseUser, 
    BaseUserManager, 
    PermissionsMixin, 
    Group, 
    Permission
)
from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
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

        return self.create_user(email, username, password=password, **extra_fields)



class Auth(AbstractBaseUser, PermissionsMixin):
    fullname = models.CharField(max_length=255,default='Dummy')
    mobile = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150,unique=True)
    country = models.CharField(max_length=80,null=True)
    fatherName = models.CharField(max_length=80,null=True)
    qualifications = models.CharField(max_length=80,null=True)
    courses = ArrayField(models.CharField(),blank=True,null=True)
    userType = models.CharField(max_length=50,null=True)
    address = models.CharField(null=True)
    gender = models.CharField(max_length=30,null=True)
    isMobileVeriFied = models.BooleanField(default=False)
    isEmailVerified = models.BooleanField(default=False)
    image = models.CharField(max_length=255,null=True,default=None)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    
    # Set related_name for groups and user_permissions
    groups = models.ManyToManyField(Group, blank=True, related_name='customuser_set')
    user_permissions = models.ManyToManyField(Permission, blank=True, related_name='customuser_set')

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['fullname','email','mobile','password']

    def __str__(self):
        return str(self.id)