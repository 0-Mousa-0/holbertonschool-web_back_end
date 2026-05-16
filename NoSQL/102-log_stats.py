#!/usr/bin/env python3
"""
Provides stats about Nginx logs stored in MongoDB,
including the top 10 most frequent IPs.
"""
from pymongo import MongoClient


if __name__ == "__main__":
    client = MongoClient("mongodb://127.0.0.1:27017")
    collection = client.logs.nginx

    # Total logs
    print("{} logs".format(collection.count_documents({})))

    # Methods stats
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = collection.count_documents({"method": method})
        print("\tmethod {}: {}".format(method, count))

    # Status check stats
    status_check = collection.count_documents(
        {"method": "GET", "path": "/status"}
    )
    print("{} status check".format(status_check))

    # Top 10 IPs
    print("IPs:")
    pipeline = [
        {"$group": {"_id": "$ip", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    top_ips = collection.aggregate(pipeline)

    for ip_data in top_ips:
        print("\t{}: {}".format(ip_data.get("_id"), ip_data.get("count")))
