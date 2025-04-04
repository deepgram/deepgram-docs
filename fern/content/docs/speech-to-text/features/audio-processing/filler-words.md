---
title: Filler Words
description: Learn how to use Deepgram's filler words detection feature
---

Deepgram's Speech-to-Text API includes a filler words feature that identifies and optionally removes common filler words and phrases from transcribed text, helping you create cleaner, more professional transcripts.

## Enabling Filler Words Detection

To enable filler words detection, set the `filler_words` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "filler_words=true"
```

## Understanding the Response

When filler words detection is enabled, the response will include information about detected filler words:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "So, um, I was thinking that, like, we should maybe consider this option.",
            "filler_words": [
              {
                "word": "so",
                "count": 1
              },
              {
                "word": "um",
                "count": 1
              },
              {
                "word": "like",
                "count": 1
              }
            ]
          }
        ]
      }
    ]
  }
}
```
