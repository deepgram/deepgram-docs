---
title: Intent Recognition
description: Learn how to use Deepgram's intent recognition features to identify user intents in audio content
---

Deepgram's intent recognition features allow you to identify user intents in audio content. The API supports both standard intent recognition and custom intent recognition, giving you flexibility in how you identify and process user intentions.

## Enabling Intent Recognition

To enable standard intent recognition, set the `intents` parameter to `true`:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "intents=true" \
  --data-urlencode "language=en"
```

## Custom Intent Recognition

You can define custom intents for the model to recognize by using the `custom_intent` parameter:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "intents=true" \
  --data-urlencode "language=en" \
  --data-urlencode "custom_intent=unsubscribe,cancel_subscription,change_plan"
```

## Intent Recognition Modes

The `custom_intent_mode` parameter controls how the model interprets and returns intents:

- `extended` (default): Returns both custom intents and the model's own recognized intents
- `strict`: Returns only the intents specified in the `custom_intent` parameter

```bash
# Extended mode (default) - returns both custom and recognized intents
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "intents=true" \
  --data-urlencode "language=en" \
  --data-urlencode "custom_intent=unsubscribe" \
  --data-urlencode "custom_intent_mode=extended"

# Strict mode - returns only custom intents
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "intents=true" \
  --data-urlencode "language=en" \
  --data-urlencode "custom_intent=unsubscribe" \
  --data-urlencode "custom_intent_mode=strict"
```

## Understanding the Response

When intent recognition is enabled, the response will include recognized intents:

```json
{
  "results": {
    "channels": [
      {
        "alternatives": [
          {
            "transcript": "I want to cancel my subscription",
            "intents": [
              {
                "intent": "unsubscribe",
                "confidence": 0.95
              },
              {
                "intent": "cancel_subscription",
                "confidence": 0.92
              }
            ]
          }
        ]
      }
    ]
  }
}
```
