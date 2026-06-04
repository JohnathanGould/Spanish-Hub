# Firebase → Discord New User Notification

## Task
Create a Firebase Cloud Function that posts to Discord when a new user signs up.

## Trigger
Firestore onCreate — collection: users/{userId}

## Discord Webhook
WEBHOOK_URL_IN_ENV

## Message format
🐾 New Milo user signed up!
Name: {displayName}
Date: {timestamp}

## Requirements
- Function name: notifyNewUser
- Runtime: Node.js 18
- Region: northamerica-northeast1
- Only runs on new document creation, not updates
- Graceful error handling — never crashes on missing fields
