# aivis-api

[Aivis Project](https://aivis-project.com/) の音声合成API「Aivis Cloud API」を利用するためのJavaScriptライブラリです。

## 機能
- JavaScriptからAivis Cloud APIを利用したテキスト音声合成が可能
- 音声のストリーミング再生に対応

## 要件
[Aivis Cloud API](https://hub.aivis-project.com/cloud-api/) からAPIキーを取得してください。

## 使い方

### ブラウザでの利用

```js
import { speech } from "https://code4fukui.github.io/aivis-api/AivisSpeech.js";

// text, apikey

const audio = await speech(text, apikey); // ストリーミング再生を開始
```

### Denoでの利用

```js
import { fetchAudio } from "https://code4fukui.github.io/aivis-api/AivisSpeech.js";

// text, apikey

const res = await fetchAudio(text, apikey);
const bin = await res.bytes();
await Deno.writeFile("test.mp3", bin);
```

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
