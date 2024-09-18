from django.db import models

# Create your models here.
class Topic(models.Model):
    courseId = models.IntegerField()
    title = models.CharField()
    createdAt = models.DateTimeField(auto_now=True)