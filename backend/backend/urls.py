from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('notification/', include('notification.urls')),
    path('auth/', include('authentication.urls')),
    path('course/', include('course.urls')),
    path('category/', include('category.urls')),
    path('topic/', include('topic.urls')),
    path('lesson/', include('lesson.urls'))
]
