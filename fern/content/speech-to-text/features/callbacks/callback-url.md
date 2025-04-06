---
title: Callback URL
description: Learn how to use Deepgram's callback URL feature for asynchronous processing
---

Deepgram's callback URL feature allows you to receive transcription results asynchronously by specifying a webhook URL where the results will be sent.

## Setting Up Callbacks

To use callbacks, specify the `callback` parameter with your webhook URL:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "callback=https://your-webhook-url.com/results"
```

## Callback Method

You can specify the HTTP method for the callback using the `callback_method` parameter:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "callback=https://your-webhook-url.com/results" \
  --data-urlencode "callback_method=POST"
```

## Callback Response

The callback will include the transcription results in the same format as a synchronous response:

```json
{
  "metadata": {
    "transaction_key": "string",
    "request_id": "string",
    "sha256": "string",
    "created": "string",
    "duration": 0,
    "channels": 0
  },
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "string",
            "confidence": 0
          }
        ]
      }
    ]
  }
}
```
