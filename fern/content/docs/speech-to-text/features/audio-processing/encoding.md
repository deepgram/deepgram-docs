---
title: Audio Encoding
description: Learn how to use Deepgram's audio encoding features
---

Deepgram's Speech-to-Text API supports various audio encoding formats and configurations to ensure optimal transcription quality.

## Supported Encodings

Deepgram supports multiple audio encoding formats:

- MP3
- WAV
- FLAC
- OGG
- M4A
- WebM

## Specifying Encoding

You can specify the encoding using the `encoding` parameter:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "encoding=mp3"
```
