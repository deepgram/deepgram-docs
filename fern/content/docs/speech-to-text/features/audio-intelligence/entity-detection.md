---
title: Entity Detection
description: Learn how to use Deepgram's entity detection feature
---

Deepgram's Speech-to-Text API includes an entity detection feature that identifies and extracts important entities (like people, places, organisations, and more) from the audio content.

## Enabling Entity Detection

To enable entity detection, set the `detect_entities` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "detect_entities=true"
```

## Understanding the Response

When entity detection is enabled, the response will include entity information:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "string",
            "entities": [
              {
                "label": "PERSON",
                "value": "John Smith",
                "confidence": 0.9
              },
              {
                "label": "ORGANIZATION",
                "value": "Deepgram",
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
