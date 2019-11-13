from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('produces', views.ProduceList.as_view(), name='produce_list'),
]