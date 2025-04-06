---
title: Language Detection
description: Learn how to use Deepgram's language detection feature to automatically detect the language of audio content
---

Deepgram's language detection feature helps automatically detect the language of audio content. This feature is particularly useful for multilingual content and content analysis.

## Enabling Language Detection

To enable language detection, set the `language_detection` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "language_detection=true"
```

## Understanding the Response

When language detection is enabled, the response will include detected languages:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "Hello, how are you today? Bonjour, comment allez-vous aujourd'hui?",
            "languages": [
              {
                "language": "en",
                "confidence": 0.95,
                "start": 0.0,
                "end": 2.5
              },
              {
                "language": "fr",
                "confidence": 0.98,
                "start": 2.5,
                "end": 5.0
              }
            ]
          }
        ]
      }
    ]
  }
}
```
