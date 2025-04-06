---
title: Sentiment Analysis
description: Learn how to use Deepgram's sentiment analysis feature
---

Deepgram's Speech-to-Text API includes a sentiment analysis feature that detects the emotional tone of spoken content, helping you understand the sentiment behind the words.

## Enabling Sentiment Analysis

To enable sentiment analysis, set the `sentiment` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "sentiment=true"
```

## Understanding the Response

When sentiment analysis is enabled, the response will include sentiment information:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "string",
            "sentiment": {
              "positive": 0.8,
              "negative": 0.1,
              "neutral": 0.1
            }
          }
        ]
      }
    ]
  }
}
```
