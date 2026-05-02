#!/usr/bin/env python3
"""
Provides stats about Nginx logs stored in MongoDB
including top 10 IPs
"""

from pymongo import MongoClient


def log_stats():
    """Prints statistics about nginx logs"""
    client = MongoClient('mongodb://127.0.0.1:27017')
    collection = client.logs.nginx

    # total logs
    total_logs = collection.count_documents({})
    print(f"{total_logs} logs")

    print("Methods:")

    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]

    for method in methods:
        count = collection.count_documents({"method": method})
        print(f"\tmethod {method}: {count}")

    # status check (GET /status)
    status_check = collection.count_documents({
        "method": "GET",
        "path": "/status"
    })
    print(f"{status_check} status check")

    # Top 10 IPs
    print("IPs:")

    pipeline = [
        {
            "$group": {
                "_id": "$ip",
                "count": {"$sum": 1}
            }
        },
        {
            "$sort": {"count": -1}
        },
        {
            "$limit": 10
        }
    ]

    for doc in collection.aggregate(pipeline):
        print(f"\t{doc['_id']}: {doc['count']}")


if __name__ == "__main__":
    log_stats()
