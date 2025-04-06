---
title: Dictation
description: Learn how to use Deepgram's dictation feature to improve speech recognition for dictation content
---

Deepgram's dictation feature helps improve speech recognition accuracy for dictation content. This feature is particularly useful for medical dictation, legal transcription, and other professional dictation scenarios.

## Enabling Dictation

To enable dictation, set the `dictation` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "dictation=true"
```

## Understanding the Response

When dictation is enabled, the response will include improved recognition for dictation content:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "Patient presents with symptoms of fever and fatigue. Temperature is 38.5 degrees Celsius. Blood pressure is 120 over 80.",
            "words": [
              {
                "word": "Patient",
                "start": 0.0,
                "end": 0.5,
                "confidence": 0.99
              },
              {
                "word": "presents",
                "start": 0.5,
                "end": 1.0,
                "confidence": 0.98
              },
              {
                "word": "with",
                "start": 1.0,
                "end": 1.2,
                "confidence": 0.97
              },
              {
                "word": "symptoms",
                "start": 1.2,
                "end": 1.8,
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
