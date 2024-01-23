from data.models import data
from intrn.serializers import dataSerializer, publishedDataSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.views import APIView

class allDataView(APIView):
    def get(self,request, format=None):
        if request.method == 'GET':
            data1 = data.objects.all()
            serializer = dataSerializer(data1, many=True)
            return JsonResponse(serializer.data, safe=False)

class publishedapiview(APIView):
    def get(self,request, format=None):
        if request.method == 'GET':
            data1 = data.objects.all()
            serializer = publishedDataSerializer(data1, many=True)
            return JsonResponse(serializer.data, safe=False)
