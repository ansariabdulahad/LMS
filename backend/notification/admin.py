from django.contrib import admin
from .models import Notification

# Register your models here.
class NotificationModel(admin.ModelAdmin) :
    list_display = ('id', 'title', 'color', 'createdAt')

admin.site.register(Notification, NotificationModel)