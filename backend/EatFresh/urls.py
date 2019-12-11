from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('', views.ProduceList.as_view(), name='produce_list'),
    path('produces', views.ProduceList.as_view(), name='produce_list'),
    path('produces/<int:pk>', views.ProduceDetail.as_view(), name='produce_detail'),
]