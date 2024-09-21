from django.db import models

# Create your models here.
class Lesson(models.Model):
    topicId = models.IntegerField()
    title = models.CharField()
    videoUrl = models.CharField(null=True)
    accest = models.CharField(null=True)
    createdAt = models.DateTimeField(auto_now=True)