---
title: Summarization
description: Learn how to use Deepgram's summarization feature
---

Deepgram's Speech-to-Text API includes a summarization feature that automatically generates concise summaries of audio content, helping you quickly understand the key points and main ideas.

## Enabling Summarization

To enable summarization, set the `summarize` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "summarize=true"
```

## Understanding the Response

When summarization is enabled, the response will include a summary:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "string",
            "summary": {
              "text": "The meeting discussed the upcoming project timeline, budget concerns, and team assignments.",
              "topics": [
                "project timeline",
                "budget",
                "team assignments"
              ]
            }
          }
        ]
      }
    ]
  }
}
```
