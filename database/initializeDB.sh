#!/bin/sh
# mongoimport -d test -c posts --drop --file ./posts.json --jsonArray -u "david" -p "password" --authenticationDatabase admin
# mongo test --eval 'db.posts.remove()'
mongorestore --drop --db test --collection posts /home/data/posts.bson -u david -p password --authenticationDatabase admin