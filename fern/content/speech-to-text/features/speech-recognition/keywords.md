---
title: Keywords
description: Learn how to use Deepgram's keywords feature to improve speech recognition accuracy for specific terms
---

Deepgram's keywords feature helps improve speech recognition accuracy by increasing the likelihood of correctly recognizing specific terms or phrases. This is particularly useful for technical terms, proper nouns, or industry-specific terminology that might otherwise be misrecognized.

## Enabling Keywords

To enable keyword recognition, use the `keywords` parameter to specify the terms you want to prioritize:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "keywords=Deepgram"
```

## Keyword Intensifiers

You can use an intensifier value to increase or decrease the recognition priority of specific keywords. Positive values increase the likelihood of recognition, while negative values suppress recognition:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "keywords=Deepgram:2" \
  --data-urlencode "keywords=API:1.5" \
  --data-urlencode "keywords=transcription:-1"
```

## Multiple Keywords

To specify multiple keywords, use the `keywords` parameter multiple times:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "keywords=Deepgram" \
  --data-urlencode "keywords=API" \
  --data-urlencode "keywords=transcription" \
  --data-urlencode "keywords=WebSocket" \
  --data-urlencode "keywords=streaming"
```

## Understanding the Response

When keywords are enabled, the response will include the transcript with improved recognition of the specified terms:

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
