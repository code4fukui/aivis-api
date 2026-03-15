# aivis-api

[Aivis Project](https://aivis-project.com/)の音声読み上げAPI「[Aivis Cloud API](https://hub.aivis-project.com/cloud-api/)」をJavaScriptで使うライブラリです。

## デモ
[デモサイト](https://code4fukui.github.io/aivis-api/)

## 機能
- Aivis Cloud APIを使った音声合成
- ストリーミング再生に対応

## 使い方

### ブラウザで使う場合

```js
import { speech } from "https://code4fukui.github.io/aivis-api/AivisSpeech.js";

// text, apikey
const audio = await speech(text, apikey); // ストリーミング再生開始
```

### Denoで使う場合

```js
import { fetchAudio } from "https://code4fukui.github.io/aivis-api/AivisSpeech.js";

// text, apikey
const res = await fetchAudio(text, apikey);
const bin = await res.bytes();
await Deno.writeFile("test.mp3", bin);
```

## ライセンス
MIT