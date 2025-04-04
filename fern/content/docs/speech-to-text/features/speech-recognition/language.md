---
title: Language Selection
description: Learn how to select the appropriate language for your speech recognition needs
---

Deepgram supports multiple languages for speech recognition. You can specify the language of your audio content using the `language` parameter.

## Available Languages

- `en`: English
- `en-US`: English (United States)
- `en-GB`: English (United Kingdom)
- `en-AU`: English (Australia)
- `en-IN`: English (India)
- `es`: Spanish
- `fr`: French
- `de`: German
- `it`: Italian
- `pt`: Portuguese
- `nl`: Dutch
- `hi`: Hindi
- `ja`: Japanese
- `ko`: Korean
- `zh`: Chinese
- `ru`: Russian

## Selecting a Language

To specify a language, use the `language` parameter:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "language=en-GB"
```

## Language Variants

Some languages have regional variants that can be specified for more accurate recognition:

```bash
curl -X POST "https://api.deepgram.com/v1/listen" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: audio/mp3" \
  --data-binary @audio.mp3 \
  -G --data-urlencode "language=en-US"
```
