---
title: Profanity Filter
description: Learn how to use Deepgram's profanity filtering feature
---

Deepgram's profanity filter automatically identifies and filters out inappropriate language from transcribed text, helping you maintain content standards and create family-friendly transcripts.

## Enabling Profanity Filter

To enable profanity filtering, set the `profanity_filter` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "profanity_filter=true"
```

## Understanding the Response

When profanity filtering is enabled, inappropriate language will be replaced with asterisks:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "This is a ******* example of profanity filtering.",
            "confidence": 0.9
          }
        ]
      }
    ]
  }
}
```

## Filtering Options

You can customize the profanity filter using the `replace` parameter:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "profanity_filter=true" \
  --data-urlencode "replace=*bleep*"
```
