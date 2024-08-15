from django.urls import path
from .views import NotificationList, NotificationDetail

urlpatterns = [
    path('', NotificationList.as_view()),
    path('<int:id>/', NotificationDetail.as_view())
]