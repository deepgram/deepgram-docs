---
title: Keyterms
description: Learn how to use Deepgram's keyterms feature to improve speech recognition accuracy for specific terms
---

Deepgram's keyterms feature helps improve speech recognition accuracy by increasing the likelihood of correctly recognizing specific terms or phrases. This is particularly useful for technical terms, proper nouns, or industry-specific terminology that might otherwise be misrecognized.

## Enabling Keyterms

To enable keyterm recognition, use the `keyterm` parameter to specify the terms you want to prioritize:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "keyterm=Deepgram"
```

## Multiple Keyterms

To specify multiple keyterms, use the `keyterm` parameter multiple times:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "keyterm=Deepgram" \
  --data-urlencode "keyterm=API" \
  --data-urlencode "keyterm=transcription" \
  --data-urlencode "keyterm=WebSocket" \
  --data-urlencode "keyterm=streaming"
```

## Understanding the Response

When keyterms are enabled, the response will include the transcript with improved recognition of the specified terms:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "The Deepgram API provides real-time transcription through WebSocket streaming.",
            "words": [
              {
                "word": "Deepgram",
                "start": 0.0,
                "end": 0.5,
                "confidence": 0.99
              },
              {
                "word": "API",
                "start": 0.5,
                "end": 0.8,
                "confidence": 0.98
              },
              {
                "word": "WebSocket",
                "start": 1.2,
                "end": 1.8,
                "confidence": 0.97
              }
            ]
          }
        ]
      }
    ]
  }
}
```
