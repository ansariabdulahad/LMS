from django.db import models

# Create your models here.
class Category(models.Model):
    category = models.CharField(max_length=100)
    createdAt = models.DateTimeField(auto_now=True)