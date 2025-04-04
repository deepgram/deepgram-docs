---
title: Quickstart Guide
description: Get started quickly with the Deepgram Listen API
---

This guide will help you make your first transcription request to the Deepgram Listen API.

## Basic Transcription

Here's a simple example of transcribing an audio file:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3
```

## Transcribing from a URL

You can also transcribe audio from a URL:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/audio.mp3"}'
```

## Understanding the Response

The API will return a JSON response with the transcription and additional metadata:

```json
{
  "metadata": {
    "transaction_key": "string",
    "request_id": "string",
    "sha256": "string",
    "created": "string",
    "duration": 0,
    "channels": 0
  },
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "string",
            "confidence": 0
          }
        ]
      }
    ]
  }
}
```
