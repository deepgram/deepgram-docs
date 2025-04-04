---
title: Punctuation
description: Learn how to use Deepgram's punctuation feature to add punctuation to speech recognition output
---

Deepgram's punctuation feature helps add punctuation to speech recognition output, making it easier to read and understand spoken content. This feature is particularly useful for content analysis and document generation.

## Enabling Punctuation

To enable punctuation, set the `punctuation` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "punctuation=true"
```

## Understanding the Response

When punctuation is enabled, the response will include punctuated text:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "Hello, how are you today? I'm doing well, thank you. The weather is nice today!",
            "words": [
              {
                "word": "Hello,",
                "start": 0.0,
                "end": 0.5,
                "confidence": 0.99
              },
              {
                "word": "how",
                "start": 0.5,
                "end": 0.8,
                "confidence": 0.98
              },
              {
                "word": "are",
                "start": 0.8,
                "end": 1.0,
                "confidence": 0.97
              },
              {
                "word": "you",
                "start": 1.0,
                "end": 1.2,
                "confidence": 0.96
              },
              {
                "word": "today?",
                "start": 1.2,
                "end": 1.5,
                "confidence": 0.95
              }
            ]
          }
        ]
      }
    ]
  }
}
```
