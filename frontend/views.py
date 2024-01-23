from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, 'index.html')

def homepage(request):
    return render(request, 'homepage.html')

def published(request):
    return render(request, 'dashboard.html')