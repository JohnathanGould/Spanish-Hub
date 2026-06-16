# -*- coding: utf-8 -*-
"""Read current progress fields for johnathangould@gmail.com via REST API — no gRPC."""

import truststore
truststore.inject_into_ssl()

import json, time
import requests
from google.oauth2 import service_account

PRIVATE_KEY = """-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzbsc99p+oNXB6
iiwnCBr4ASBGxUAwBudztelIuTcYyklYjzZvGM01CZ08tf1+m4Hey7UVsXT57VJ9
ZlmNHVoGc7Rb8l4I1OMOLnF8Teq8oT0YZ/xP2FRXQdf6kAcj+ROWyjqq4KPaJzHz
zIaMQAmKXr7zfvP2808FhxpLN1xpkpUSZFOKS2qFB0eWIKCEBJQ3/p3/xLPbtMDH
d5XBnNoamlH9rXNVum0RG+MRrii8y4KYj76EaTw2LTpJvGZ6yEHNp4BckabyASY3
kgBVYAwU4WHjP6RUBJkrnUZ6INcOyutlniKP7zZmG5hTzAHcKKxhL2cBjAfLySRL
qD7L4dPLAgMBAAECggEAA9KGNXICa67O8xiF1HahPT6oGKnaC+V4J8H5ZfGzVHiQ
TTrCLsxJKGou6pyr3917MkS5QLmNI6493B41v48faSGTQ+qRVnNs7my1Dfzw7uZc
0VJhw+erwEiB5W+mn0pBwKwVMA+yBEZiee5ijV+0QSAMkrS8VYeDju58wM5wmwhM
7G+liN0gnW/yPQNErPEW04WY0lcMW3nAOxBhLGHS+pT59v3AcjpAPkboVkINGcPs
h+OWwyF3zNk5MBQ+WGD7c3POs1Xy6zXauNuWuW0mr1NJKCKJGeTQyfIZDlT1HwxF
VbT95s581guwxufmlfGFNTF37GkSEboZZTaEAu5uZQKBgQDaRu6FNp2y4RrIu+mG
EFAdj23tG5Y8v2EzNCLLjaf8XxFvS3lkwa+/X70lKbG3LiQGo0/oEz5OWhHnzDQF
2Hbf0aK4Hg6PN1+yNmZg8up/e5/X3o5AOkbuva/zmIEUQyhQx50nnANnCjbrINRV
+XjjKuX2DC4QxqekMDOQFibcBwKBgQDScUkIanpqNeRNrj4OHAZci3qRnszzX+7B
J3joD/GJN5dhoRxEaz4sboE7FFhRicWq0xDi1YmrcN5rSAB6oavLyAqfN4RGSyqN
KRG7/LssBegrO00jHAxaI8HUHRZ7X2T+2aYHOG3riVhlWy8kS42+VforD/5AJctj
ASinVHIhHQKBgQDTmkHuuGSmndzmTmzzf2r7TSlm3ACIQYuMJPW6WUhJuyvetc8o
IzAqGTj3BvV2vG9GVBnJxKX5NQ34pZilNhT/o23YiaLZqffGf0A+qh80mPb7QZCr
qRNMrG0ffG9d4kD6Fpk+ZdtSj69vv7K46hEMQHEQVvxtXPf1jpjeDOt9DwKBgFi0
ie1zPKCSkOaxoNS/uWq/HG5PeuLHuFNQ+SUQu2Z0uWncyJaKgg2mkvC9VbEhGuIz
z/Vdv4c1r3uXQSRwC4N9kgSlGSusOYaBHkmYcalP4BqBB7XZ99bzJZvsmvJsNp06
T0LR5XuYTFuFAS0Sb/AgO7B1MF4H0GCuN125OdZ9AoGBAIQUmzEa0jhP26RkyKjP
AUTD7jbv3MsgpR50YJMvHiRQNAc8hU3vImTIhryJOy402P+yhzxoKTvnAzH29Gzs
z+ZiOj1Mu9BZpPrBwXEVeXj1yYHz8Df8BmDPVuYjpeXWgHjrDy/LhLCMKc+pdwv9
gAnBVF3RHeTWjEHJavxAfb2U
-----END PRIVATE KEY-----
"""

SA_INFO = {
    "type": "service_account",
    "project_id": "my-spanish-hub",
    "private_key_id": "fbsvc",
    "private_key": PRIVATE_KEY,
    "client_email": "firebase-adminsdk-fbsvc@my-spanish-hub.iam.gserviceaccount.com",
    "client_id": "",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
}

SCOPES = [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/datastore",
]

PROJECT = "my-spanish-hub"
EMAIL = "johnathangould@gmail.com"

# Get service account access token via google-auth (uses requests, patched by truststore)
creds = service_account.Credentials.from_service_account_info(SA_INFO, scopes=SCOPES)
import google.auth.transport.requests as ga_requests
creds.refresh(ga_requests.Request())
token = creds.token
print(f"Auth token obtained.")

headers = {"Authorization": f"Bearer {token}"}


def fs_value(v):
    """Decode a Firestore REST API value object to a Python value."""
    if "stringValue" in v:  return v["stringValue"]
    if "integerValue" in v: return int(v["integerValue"])
    if "doubleValue" in v:  return float(v["doubleValue"])
    if "booleanValue" in v: return v["booleanValue"]
    if "nullValue" in v:    return None
    if "arrayValue" in v:
        return [fs_value(i) for i in v["arrayValue"].get("values", [])]
    if "mapValue" in v:
        return {k: fs_value(fv) for k, fv in v["mapValue"].get("fields", {}).items()}
    return v  # fallback


# Step 1: Look up UID via Identity Toolkit admin API
lookup_url = f"https://identitytoolkit.googleapis.com/v1/projects/{PROJECT}/accounts:lookup"
r = requests.post(lookup_url, headers=headers, json={"email": [EMAIL]})
r.raise_for_status()
users_data = r.json().get("users", [])
if not users_data:
    print(f"ERROR: no user found for {EMAIL}")
    exit(1)
uid = users_data[0]["localId"]
print(f"UID: {uid}\n")


# Step 2: Fetch user document from Firestore REST API
doc_url = f"https://firestore.googleapis.com/v1/projects/{PROJECT}/databases/(default)/documents/users/{uid}"
r2 = requests.get(doc_url, headers=headers)
if r2.status_code == 404:
    print("ERROR: user document not found in Firestore")
    exit(1)
r2.raise_for_status()
doc = r2.json()
fields = {k: fs_value(v) for k, v in doc.get("fields", {}).items()}


PROGRESS_FIELDS = [
    "completedStops",
    "completedPaths",
    "progress",
    "xp",
    "weeklyXP",
    "bones",
    "earnedBadges",
    "lessonsCompleted",
]

print(f"Current values for {EMAIL}:")
print("─" * 55)
for field in PROGRESS_FIELDS:
    val = fields.get(field, "<NOT SET>")
    if isinstance(val, list):
        print(f"  {field}: [{len(val)} items]  {val[:5]}{'...' if len(val) > 5 else ''}")
    elif isinstance(val, dict):
        keys = list(val.keys())
        print(f"  {field}: {{{len(val)} keys}}  (first 3: {keys[:3]})")
    else:
        print(f"  {field}: {repr(val)}")

print("\nOther fields (will NOT be touched):")
print("─" * 55)
preserved = [k for k in fields if k not in PROGRESS_FIELDS]
for k in sorted(preserved):
    v = fields[k]
    if isinstance(v, (list, dict)):
        print(f"  {k}: {type(v).__name__} ({len(v)} items)")
    else:
        print(f"  {k}: {repr(v)}")
