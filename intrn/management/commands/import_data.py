from django.core.management.base import BaseCommand
from pymongo import MongoClient
from data.models import data
from datetime import datetime
from django.utils import timezone

class Command(BaseCommand):
    help = 'Import data from MongoDB'
    def handle(self, *args, **options):
        mongodbclient = MongoClient('mongodb://localhost:27017')
        db = mongodbclient['jsonData']
        mongodb_collection = db['data']

        for document in mongodb_collection.find():
            intensity=document.get('intensity')
            try:
                int(intensity)
            except (ValueError, TypeError):
                intensity = None
            likelihood=document.get('likelihood')
            try:
                int(likelihood)
            except (ValueError, TypeError):
                likelihood = None
            relevance=document.get('relevance')
            try:
                int(relevance)
            except (ValueError, TypeError):
                relevance = None

            added_str = document.get('added')
            published_str = document.get('published')

            format_specifier = '%B, %d %Y %H:%M:%S'
            

            try:
                added_date_aware = timezone.make_aware(datetime.strptime(added_str, format_specifier))
            except:
                added_date_aware = None

            try:
                published_date_aware = timezone.make_aware(datetime.strptime(published_str, format_specifier))
            except:
                published_date_aware = None



            data_instance = data(
                mongodb_id=str(document['_id']),
                endyear=document.get('endyear', None),
                intensity=intensity,
                sector=document.get('sector', None),
                topic=document.get('topic', None),
                insight=document.get('insight', None),
                url=document.get('url', None),
                region=document.get('region', None),
                startyear=document.get('startyear', None),
                impact=document.get('impact', None),
                added=added_date_aware,
                published=published_date_aware,
                country=document.get('country', None),
                relevance=relevance,
                pestle=document.get('pestle', None),
                source=document.get('source', None),
                title=document.get('title', None),
                likelihood=likelihood,
            )
            data_instance.save()

            self.stdout.write(self.style.SUCCESS('Data imported successfully'))
