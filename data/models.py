from django.db import models
from db_connection import db
from django.core.validators import MinValueValidator, MaxValueValidator


data_collection = db['jsonData_collection']

class data(models.Model):

    mongodb_id = models.CharField(max_length=24, unique = True, default = '')
    endyear = models.IntegerField(null=True, blank=True)
    intensity = models.IntegerField(null=True, blank=True,
        validators =[
            MinValueValidator(limit_value=1, message="Value cannot be less than 1!"),
            MaxValueValidator(limit_value=20, message="Value cannot be greater than 20!"),
        ]
    )
    sector = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    insight = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    startyear = models.IntegerField(null=True, blank=True)
    impact = models.CharField(max_length=100)
    added = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    published = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    country = models.CharField(max_length=100)
    relevance = models.IntegerField(null=True, blank=True,
        validators =[
            MinValueValidator(limit_value=1, message="Value cannot be less than 1!"),
            MaxValueValidator(limit_value=20, message="Value cannot be greater than 20!"),
        ]
    )
    pestle = models.CharField(max_length=100)
    source = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    likelihood = models.IntegerField(null=True, blank=True,
        validators =[
            MinValueValidator(limit_value=1, message="Value cannot be less than 1!"),
            MaxValueValidator(limit_value=20, message="Value cannot be greater than 20!"),
        ]
    )



    def __str__(self):
        return self.title
