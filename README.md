# aivis-api

A JavaScript library to use the "Aivis Cloud API" voice-to-speech API from the [Aivis Project](https://aivis-project.com/).

## Demo
[demo](https://code4fukui.github.io/aivis-api/)

## Features
- Use the Aivis Cloud API for text-to-speech in JavaScript
- Supports streaming audio playback

## Requirements
Get an API key from the [Aivis Cloud API](https://hub.aivis-project.com/cloud-api/).

## Usage

### For browsers

```js
import { speech } from "https://code4fukui.github.io/aivis-api/AivisSpeech.js";

// text, apikey

const audio = await speech(text, apikey); // start streaming
```

### For Deno

```js
import { fetchAudio } from "https://code4fukui.github.io/aivis-api/AivisSpeech.js";

// text, apikey

const res = await fetchAudio(text, apikey);
const bin = await res.bytes();
await Deno.writeFile("test.mp3", bin);
```

## License
MIT