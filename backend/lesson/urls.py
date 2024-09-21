from rest_framework.urls import path
from .views import LessonList, LessonAdd, LessonAction, LessonByTopicId

urlpatterns = [
    path('', LessonList.as_view()),
    path('private/', LessonAdd.as_view()),
    path('<int:id>/', LessonAction.as_view()),
    path('topic/<int:id>/', LessonByTopicId.as_view())
]