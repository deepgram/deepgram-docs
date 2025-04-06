---
title: Redaction
description: Learn how to use Deepgram's redaction feature for privacy protection
---

Deepgram's redaction feature automatically identifies and redacts sensitive information from transcribed text, helping you protect privacy and comply with data protection regulations.

## Enabling Redaction

To enable redaction, set the `redact` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "redact=true"
```

## Understanding the Response

When redaction is enabled, sensitive information will be replaced with asterisks:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "My credit card number is ************1234 and my SSN is ***-**-****.",
            "confidence": 0.9
          }
        ]
      }
    ]
  }
}
```
