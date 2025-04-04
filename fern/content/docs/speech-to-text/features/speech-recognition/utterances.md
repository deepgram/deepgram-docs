---
title: Utterances
description: Learn how to use Deepgram's utterances feature to segment speech into meaningful semantic units
---

Deepgram's utterances feature helps segment speech into meaningful semantic units, making it easier to process and analyze spoken content. This feature is particularly useful for natural language processing and speech analysis applications.

## Enabling Utterances

To enable utterances, set the `utterances` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "utterances=true"
```

## Configuring Utterance Splitting

You can configure how utterances are split using the `utt_split` parameter, which specifies the pause duration in seconds:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "utterances=true" \
  --data-urlencode "utt_split=1.0"
```

## Understanding the Response

When utterances are enabled, the response will include segmented utterances:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "Hello, how are you today? I'm doing well, thank you.",
            "utterances": [
              {
                "transcript": "Hello, how are you today?",
                "start": 0.0,
                "end": 2.5,
                "confidence": 0.95
              },
              {
                "transcript": "I'm doing well, thank you.",
                "start": 3.0,
                "end": 5.5,
                "confidence": 0.97
              }
            ]
          }
        ]
      }
    ]
  }
}
```
