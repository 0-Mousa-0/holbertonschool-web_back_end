#!/usr/bin/env python3
"""
Python script that provides some stats about Nginx logs stored in MongoDB.
"""
from pymongo import MongoClient


def log_stats():
    """ Provides some stats about Nginx logs stored in MongoDB """
    client = MongoClient('mongodb://127.0.0.1:27017')
    db = client.logs
    collection = db.nginx

    # 1. Total number of documents in the collection
    total_logs = collection.count_documents({})
    print(f"{total_logs} logs")

    # 2. Statistics breakdown by HTTP method
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = collection.count_documents({"method": method})
        print(f"\tmethod {method}: {count}")

    # 3. Count for method=GET and path=/status
    status_check = collection.count_documents({"method": "GET", "path": "/status"})
    print(f"{status_check} status check")


if __name__ == "__main__":
    log_stats()
