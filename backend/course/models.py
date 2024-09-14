from django.db import models

# Create your models here.
class Course(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=100, null=True)
    duration = models.CharField()
    durationIn = models.CharField(max_length=50)
    price = models.IntegerField()
    discount = models.IntegerField()
    description = models.CharField()
    free = models.BooleanField(default=False)
    live = models.BooleanField(default=False)
    image = models.CharField(null=True)
    createdAt = models.DateTimeField(auto_now=True)