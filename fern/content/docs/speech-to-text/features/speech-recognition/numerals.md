---
title: Numerals
description: Learn how to use Deepgram's numerals feature to format numbers in speech recognition
---

Deepgram's numerals feature helps format numbers in speech recognition output. This feature is particularly useful for financial data, measurements, and other numerical content.

## Enabling Numerals

To enable numerals, set the `numerals` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "numerals=true"
```

## Understanding the Response

When numerals are enabled, the response will include formatted numbers:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "The price is one thousand two hundred thirty-four dollars and fifty-six cents.",
            "words": [
              {
                "word": "The",
                "start": 0.0,
                "end": 0.2,
                "confidence": 0.99
              },
              {
                "word": "price",
                "start": 0.2,
                "end": 0.5,
                "confidence": 0.98
              },
              {
                "word": "is",
                "start": 0.5,
                "end": 0.7,
                "confidence": 0.97
              },
              {
                "word": "1,234.56",
                "start": 0.7,
                "end": 1.5,
                "confidence": 0.96
              },
              {
                "word": "dollars",
                "start": 1.5,
                "end": 2.0,
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
