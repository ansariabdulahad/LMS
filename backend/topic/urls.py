from django.urls import path
from .views import TopicList, TopicByCourseId, TopicAdd, TopicAction

urlpatterns = [
    path('', TopicList.as_view()),
    path('course/<int:id>/', TopicByCourseId.as_view()),
    path('private/', TopicAdd.as_view()),
    path('<int:id>/', TopicAction.as_view())
]