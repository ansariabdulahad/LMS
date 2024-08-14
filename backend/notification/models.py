from django.db import models

# Create your models here.
class Notification(models.Model) :
    title = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    createdAt = models.DateTimeField(auto_now=True)