// init-mongo.js
db = db.getSiblingDB('vocabulary1');
db.createCollection('words');

print("Database 'vocabulary' and collection 'words' are created if they did not exist.");