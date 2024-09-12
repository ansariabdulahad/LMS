from .views import CourseList, CourseAdd, CourseAction
from django.urls import path

urlpatterns = [
    path('', CourseList.as_view()),
    path('private/', CourseAdd.as_view()),
    path('<int:id>/', CourseAction.as_view())
]