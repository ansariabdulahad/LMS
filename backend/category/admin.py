from django.contrib import admin
from .models import Category

# Register your models here.
class CategoryModel(admin.ModelAdmin):
    list_display = (
        'id',
        'category',
        'createdAt'
    )

admin.site.register(Category, CategoryModel)