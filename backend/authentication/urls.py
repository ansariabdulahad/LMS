from django.urls import path
from .views import Login, Register, ForgotPassword

urlpatterns = [
    path('login/', Login.as_view()),
    path('register/', Register.as_view()),
    path('forgot-password/', ForgotPassword.as_view())
]