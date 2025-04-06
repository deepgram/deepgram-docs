---
title: Model Selection
description: Learn how to select the appropriate model for your speech recognition needs
---

Deepgram offers multiple models optimised for different use cases and audio types. You can specify which model to use with the `model` parameter.

## Available Models

- `general`: Optimised for general-purpose transcription
- `meeting`: Optimised for meeting and conference calls
- `phonecall`: Optimised for phone call audio
- `voicemail`: Optimised for voicemail messages
- `finance`: Optimised for financial services content
- `conversationalai`: Optimised for conversational AI applications
- `video`: Optimised for video content
- `enhanced`: Enhanced version of the general model with improved accuracy

## Selecting a Model

To specify a model, use the `model` parameter:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "model=meeting"
```

## Model Versions

You can also specify a specific version of a model using the `version` parameter:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "model=general" \
  --data-urlencode "version=latest"
```
