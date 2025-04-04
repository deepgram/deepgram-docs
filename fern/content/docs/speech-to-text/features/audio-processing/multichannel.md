---
title: Multichannel Audio
description: Learn how to use Deepgram's multichannel audio processing feature
---

Deepgram's Speech-to-Text API includes a multichannel feature that allows you to process audio files with multiple channels, such as stereo recordings or multi-speaker setups.

## Enabling Multichannel Processing

To enable multichannel processing, set the `multichannel` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "multichannel=true"
```

## Understanding the Response

When multichannel processing is enabled, the response will include separate transcriptions for each channel:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "Channel 1 transcription",
            "confidence": 0.9
          }
        ]
      },
      {
        "alternatives": [
          {
            "transcript": "Channel 2 transcription",
            "confidence": 0.85
          }
        ]
      }
    ]
  }
}
```
