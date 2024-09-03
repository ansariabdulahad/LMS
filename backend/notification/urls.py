from django.urls import path
from .views import NotificationList, NotificationDetail, GetNotification

urlpatterns = [
    path('', GetNotification.as_view()),
    path('private/', NotificationList.as_view()),
    path('<int:id>/', NotificationDetail.as_view())
]