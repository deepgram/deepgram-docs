---
title: Transcribe Audio Files
description: Learn how to transcribe audio files using the Deepgram Listen API
---

This guide will show you how to transcribe audio files using the Deepgram Listen API.

## Supported Audio Formats

Deepgram supports a variety of audio formats:

- MP3
- WAV
- FLAC
- OGG
- M4A
- WebM

## Basic File Transcription

To transcribe an audio file, send it as binary data in the request body:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3
```

## Specifying Audio Format

You can specify the audio format in the Content-Type header:

```bash
# For WAV files
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/wav" \
  --data-binary @audio.wav

# For FLAC files
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/flac" \
  --data-binary @audio.flac
```

## Using Additional Features

You can combine file transcription with other features:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "punctuate=true" \
  --data-urlencode "diarize=true" \
  --data-urlencode "detect_language=true"
```

## Handling Large Files

For large audio files:

1. Consider using the async endpoint
2. Use the callback parameter to receive results
3. Monitor the progress using the request ID
