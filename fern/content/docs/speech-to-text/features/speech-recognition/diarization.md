---
title: Diarization
description: Learn how to use Deepgram's diarization feature to identify different speakers in audio content
---

Deepgram's diarization feature helps identify different speakers in audio content. This feature is particularly useful for meeting transcripts, interviews, and other multi-speaker scenarios.

## Enabling Diarization

To enable diarization, set the `diarize` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "diarize=true"
```

## Understanding the Response

When diarization is enabled, the response will include speaker information:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "Hello, how are you today? I'm doing well, thank you.",
            "words": [
              {
                "word": "Hello,",
                "start": 0.0,
                "end": 0.5,
                "confidence": 0.99,
                "speaker": 0
              },
              {
                "word": "how",
                "start": 0.5,
                "end": 0.8,
                "confidence": 0.98,
                "speaker": 0
              },
              {
                "word": "are",
                "start": 0.8,
                "end": 1.0,
                "confidence": 0.97,
                "speaker": 0
              },
              {
                "word": "you",
                "start": 1.0,
                "end": 1.2,
                "confidence": 0.96,
                "speaker": 0
              },
              {
                "word": "today?",
                "start": 1.2,
                "end": 1.5,
                "confidence": 0.95,
                "speaker": 0
              },
              {
                "word": "I'm",
                "start": 2.0,
                "end": 2.2,
                "confidence": 0.94,
                "speaker": 1
              },
              {
                "word": "doing",
                "start": 2.2,
                "end": 2.5,
                "confidence": 0.93,
                "speaker": 1
              },
              {
                "word": "well,",
                "start": 2.5,
                "end": 2.8,
                "confidence": 0.92,
                "speaker": 1
              },
              {
                "word": "thank",
                "start": 2.8,
                "end": 3.0,
                "confidence": 0.91,
                "speaker": 1
              },
              {
                "word": "you.",
                "start": 3.0,
                "end": 3.2,
                "confidence": 0.90,
                "speaker": 1
              }
            ]
          }
        ]
      }
    ]
  }
}
```
