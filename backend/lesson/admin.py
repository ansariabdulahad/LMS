from django.contrib import admin
from .models import Lesson

# Register your models here.
class LessonModel(admin.ModelAdmin):
    list_display = ('id', 'topicId', 'title', 'videoUrl', 'accest', 'createdAt')

admin.site.register(Lesson, LessonModel)