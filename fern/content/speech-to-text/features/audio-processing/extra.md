---
title: Extra Features
description: Learn how to use Deepgram's extra features
---

Deepgram's Speech-to-Text API includes an extra features parameter that allows you to enable additional processing capabilities that are not covered by other standard features. This provides flexibility for accessing experimental or specialized features.

## Enabling Extra Features

To enable extra features, set the `extra` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "extra=true"
```

## Available Extra Features

The extra features parameter can enable various capabilities:

- Advanced audio processing
- Experimental features
- Specialized analysis
- Custom processing
- Extended metadata

## Understanding the Response

When extra features are enabled, the response may include additional information:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "string",
            "extra": {
              "feature1": "value1",
              "feature2": "value2"
            }
          }
        ]
      }
    ]
  }
}
```
