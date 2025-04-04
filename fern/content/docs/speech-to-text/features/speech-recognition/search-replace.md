---
title: Search and Replace
description: Learn how to use Deepgram's search and replace feature to modify specific terms in audio content
---

Deepgram's search and replace feature allows you to find and replace specific terms or phrases in audio content. This is useful for standardizing terminology, correcting misspellings, and maintaining consistency.

## Enabling Search and Replace

To enable search and replace, use the `search` and `replace` parameters to specify the terms you want to find and replace:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "search=AI" \
  --data-urlencode "replace=Artificial Intelligence"
```

## Multiple Search and Replace Pairs

To specify multiple search and replace pairs, use the `search` and `replace` parameters multiple times:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "search=AI" \
  --data-urlencode "replace=Artificial Intelligence" \
  --data-urlencode "search=ML" \
  --data-urlencode "replace=Machine Learning"
```

## Understanding the Response

When search and replace is enabled, the response will include the modified transcript:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "Artificial Intelligence and Machine Learning are transforming industries.",
            "words": [
              {
                "word": "Artificial",
                "start": 0.0,
                "end": 0.5,
                "confidence": 0.99
              },
              {
                "word": "Intelligence",
                "start": 0.5,
                "end": 1.0,
                "confidence": 0.98
              },
              {
                "word": "Machine",
                "start": 1.5,
                "end": 2.0,
                "confidence": 0.97
              },
              {
                "word": "Learning",
                "start": 2.0,
                "end": 2.5,
                "confidence": 0.96
              }
            ]
          }
        ]
      }
    ]
  }
}
```
