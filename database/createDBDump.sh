#!/bin/sh
# TODO: zip into one archive if there are multiple tables
mongodump --db test --out . -u david -p password --authenticationDatabase admin