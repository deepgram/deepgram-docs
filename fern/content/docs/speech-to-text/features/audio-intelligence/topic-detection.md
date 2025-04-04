---
title: Topic Detection
description: Learn how to use Deepgram's topic detection features to identify topics in audio content
---

Deepgram's topic detection features allow you to identify topics in audio content. The API supports both standard topic detection and custom topic detection, giving you flexibility in how you identify and process topics.

## Enabling Topic Detection

To enable standard topic detection, set the `topics` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "topics=true" \
  --data-urlencode "language=en"
```

## Custom Topic Detection

You can define custom topics for the model to detect by using the `custom_topic` parameter:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "topics=true" \
  --data-urlencode "language=en" \
  --data-urlencode "custom_topic=animals,wildlife,conservation"
```

## Topic Detection Modes

The `custom_topic_mode` parameter controls how the model interprets and returns topics:

- `extended` (default): Returns both custom topics and the model's own detected topics
- `strict`: Returns only the topics specified in the `custom_topic` parameter

```bash
# Extended mode (default) - returns both custom and detected topics
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "topics=true" \
  --data-urlencode "language=en" \
  --data-urlencode "custom_topic=animals" \
  --data-urlencode "custom_topic_mode=extended"

# Strict mode - returns only custom topics
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "topics=true" \
  --data-urlencode "language=en" \
  --data-urlencode "custom_topic=animals" \
  --data-urlencode "custom_topic_mode=strict"
```

## Understanding the Response

When topic detection is enabled, the response will include detected topics:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "The African elephant population has been declining due to habitat loss and poaching. Conservation efforts are underway to protect these magnificent animals.",
            "topics": [
              {
                "topic": "animals",
                "confidence": 0.95
              },
              {
                "topic": "wildlife",
                "confidence": 0.92
              },
              {
                "topic": "conservation",
                "confidence": 0.88
              }
            ]
          }
        ]
      }
    ]
  }
}
```
