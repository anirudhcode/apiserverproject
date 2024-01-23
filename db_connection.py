import pymongo
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')
db = client['jsonData']
collection = db['data']

data_from_mongo = collection.find()