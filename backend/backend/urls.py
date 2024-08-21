from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('notification/', include('notification.urls')),
    path('auth/', include('authentication.urls')),
]
