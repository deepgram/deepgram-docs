---
title: Tagging
description: Learn how to use Deepgram's tagging feature
---

Deepgram's Speech-to-Text API includes a tagging feature that allows you to label your transcription requests for identification and tracking purposes. Tags can be used for reporting, analytics, and request management.

## Adding Tags

To add tags to your request, use the `tag` parameter:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "tag=meeting,project_x,urgent"
```

## Multiple Tags

You can specify multiple tags:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "tag=interview,client_a,transcription_service"
```

## Understanding the Response

When tags are added, they will be included in the response metadata:

```json
{
  "metadata": {
    "transaction_key": "string",
    "request_id": "string",
    "sha256": "string",
    "created": "string",
    "duration": 0,
    "channels": 0,
    "tags": ["meeting", "project_x", "urgent"]
  },
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "string"
          }
        ]
      }
    ]
  }
}
```
