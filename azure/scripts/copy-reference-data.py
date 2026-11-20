#!/usr/bin/env python3
"""Copies PetFolioo's non-personal reference data from prod Firestore to stage Firestore.

    python3 -I azure/scripts/copy-reference-data.py

Only the collections in REFERENCE are copied: blog posts, locations, pet categories, tips and app
settings. Users, pets, health records, chats and every other collection with customer data stay in
prod; stage gets synthetic users and pets from the API's demo seeder instead (SEED_DEMO_DATA).

The source and target projects are fixed, so this can never write to prod. Re-running overwrites
the stage copies with the current prod values. Ends by comparing document counts.
"""
import json
import subprocess
import sys
import urllib.request

SOURCE = "petroll-production"
TARGET = "petfolioo-stage"
ACCOUNT = "petroll.site.contactus@gmail.com"
REFERENCE = ["blog_posts", "locations", "pet_categories", "tips", "app_settings"]
BATCH = 400  # batchWrite accepts at most 500 writes

TOKEN = subprocess.check_output(["gcloud", "auth", "print-access-token", f"--account={ACCOUNT}"], text=True).strip()


def call(project, method, path, body=None):
    url = f"https://firestore.googleapis.com/v1/projects/{project}/databases/(default)/documents{path}"
    req = urllib.request.Request(url, method=method, data=None if body is None else json.dumps(body).encode())
    req.add_header("Authorization", f"Bearer {TOKEN}")
    req.add_header("x-goog-user-project", project)
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read() or b"{}")


def read_all(project, collection):
    docs, token = [], None
    while True:
        page = call(project, "GET", f"/{collection}?pageSize=300" + (f"&pageToken={token}" if token else ""))
        docs.extend(page.get("documents", []))
        token = page.get("nextPageToken")
        if not token:
            return docs


def count(project, collection):
    body = {"structuredAggregationQuery": {
        "structuredQuery": {"from": [{"collectionId": collection}]},
        "aggregations": [{"alias": "n", "count": {}}]}}
    result = call(project, "POST", ":runAggregationQuery", body)
    return int(result[0]["result"]["aggregateFields"]["n"]["integerValue"])


def main():
    if TARGET == SOURCE:
        sys.exit("refusing to copy a project onto itself")
    ok = True
    for collection in REFERENCE:
        docs = read_all(SOURCE, collection)
        writes = []
        for doc in docs:
            doc_id = doc["name"].rsplit("/", 1)[1]
            name = f"projects/{TARGET}/databases/(default)/documents/{collection}/{doc_id}"
            writes.append({"update": {"name": name, "fields": doc.get("fields", {})}})
        for i in range(0, len(writes), BATCH):
            result = call(TARGET, "POST", ":batchWrite", {"writes": writes[i:i + BATCH]})
            failed = [s for s in result.get("status", []) if s.get("code", 0) != 0]
            if failed:
                sys.exit(f"{collection}: {len(failed)} writes failed: {failed[0]}")
        src, dst = count(SOURCE, collection), count(TARGET, collection)
        ok &= src == dst
        print(f"{collection:15} prod={src:5} stage={dst:5} {'OK' if src == dst else 'MISMATCH'}")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
