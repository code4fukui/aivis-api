# aivis-api

- [Aivis Project](https://aivis-project.com/)の音声読み上げAPI「[Aivis Cloud API](https://hub.aivis-project.com/cloud-api/)」をJavaScriptで使うライブラリです

- [demo](https://code4fukui.github.io/aivis-api/)

## usage

- get a apikey from [Aivis Cloud API](https://hub.aivis-project.com/cloud-api/)

### for browsers

```js
import { speech } from "https://code4fukui.github.io/aivis-api/AivisSpeech.js";

// text, apikey

const audio = await speech(text, apikey); // start streaming
```

### for Deno

```js
import { fetchAudio } from "https://code4fukui.github.io/aivis-api/AivisSpeech.js";

// text, apikey

const res = await fetchAudio(text, apikey);
const bin = await res.bytes();
await Deno.writeFile("test.mp3", bin);
```
