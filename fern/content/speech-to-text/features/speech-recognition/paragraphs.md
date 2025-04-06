---
title: Paragraphs
description: Learn how to use Deepgram's paragraphs feature to segment speech into paragraphs
---

Deepgram's paragraphs feature helps segment speech into paragraphs, making it easier to read and understand spoken content. This feature is particularly useful for content analysis and document generation.

## Enabling Paragraphs

To enable paragraphs, set the `paragraphs` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "paragraphs=true"
```

## Understanding the Response

When paragraphs are enabled, the response will include segmented paragraphs:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "Hello, how are you today? I'm doing well, thank you. The weather is nice today.",
            "paragraphs": [
              {
                "transcript": "Hello, how are you today? I'm doing well, thank you.",
                "start": 0.0,
                "end": 5.5,
                "confidence": 0.95
              },
              {
                "transcript": "The weather is nice today.",
                "start": 6.0,
                "end": 8.5,
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
