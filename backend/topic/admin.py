from django.contrib import admin
from .models import Topic

# Register your models here.
class TopicModel(admin.ModelAdmin):
    list_display = ('id', 'courseId', 'title', 'createdAt')

admin.site.register(Topic, TopicModel)