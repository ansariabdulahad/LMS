from django.contrib import admin
from .models import Course

# Register your models here.
class CourseModel(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'category',
        'duration',
        'durationIn',
        'price',
        'discount',
        'description',
        'free',
        'live',
        'image',
        'createdAt',
    )

admin.site.register(Course, CourseModel)