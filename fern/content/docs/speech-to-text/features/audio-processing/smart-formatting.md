---
title: Smart Formatting
description: Learn how to use Deepgram's smart formatting feature
---

Deepgram's Speech-to-Text API includes a smart formatting feature that automatically formats transcribed text to improve readability and usability.

## Enabling Smart Formatting

To enable smart formatting, set the `smart_format` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "smart_format=true"
```

## Formatting Features

Smart formatting includes:

- Number formatting (e.g., "one hundred" → "100")
- Date formatting
- Time formatting
- Currency formatting
- Measurement formatting
- Proper capitalization
- Email and URL formatting

## Understanding the Response

When smart formatting is enabled, the response will include formatted text:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "The meeting is scheduled for January 15th at 2:30 PM. The budget is $1,000,000.",
            "confidence": 0.9
          }
        ]
      }
    ]
  }
}
```
