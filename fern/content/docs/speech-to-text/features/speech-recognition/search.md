---
title: Search
description: Learn how to use Deepgram's search feature to find specific terms in audio content
---

Deepgram's search feature allows you to find specific terms or phrases in audio content. This is useful for content analysis, quality assurance, and compliance monitoring.

## Enabling Search

To enable search, use the `search` parameter to specify the terms you want to find:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "search=Deepgram"
```

## Multiple Search Terms

To specify multiple search terms, use the `search` parameter multiple times:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "search=Deepgram" \
  --data-urlencode "search=API" \
  --data-urlencode "search=transcription"
```

## Understanding the Response

When search is enabled, the response will include search results:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "The Deepgram API provides real-time transcription.",
            "search": [
              {
                "query": "Deepgram",
                "hits": [
                  {
                    "snippet": "The Deepgram API",
                    "start": 0.0,
                    "end": 0.8,
                    "confidence": 0.99
                  }
                ]
              },
              {
                "query": "API",
                "hits": [
                  {
                    "snippet": "Deepgram API",
                    "start": 0.5,
                    "end": 0.8,
                    "confidence": 0.98
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```
