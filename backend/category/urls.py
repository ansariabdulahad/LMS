from django.urls import path
from .views import CategoryList, CategoryAdd, CategoryAction

urlpatterns = [
    path('', CategoryList.as_view()),
    path('private/', CategoryAdd.as_view()),
    path('<int:id>/', CategoryAction.as_view())
]