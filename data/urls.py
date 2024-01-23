from django.shortcuts import render
from django.http import HttpResponse
from django.urls import path
from django.views import View
from data import views
from rest_framework.views import APIView
from .views import publishedapiview, allDataView

urlpatterns = [
    path('data', allDataView.as_view()),
    path('overviewpublished', publishedapiview.as_view()),
]