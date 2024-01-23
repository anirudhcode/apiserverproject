from django.urls import path
from .views import index, homepage, published


urlpatterns = [
    path('login', index, name = 'login'),
    path('homepage/', homepage, name='homepage'),
    path('dashboard/', published, name='dashboard'),
]