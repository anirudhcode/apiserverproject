from rest_framework import serializers
from data.models import data

class dataSerializer(serializers.ModelSerializer):
    class Meta:
        model = data
        fields = '__all__'

class publishedDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = data
        fields = ('added','published')