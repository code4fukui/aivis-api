import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { fetchAudio } from "./AivisSpeech.js";

const env = await load();
const apikey = env["APIKEY"];

const text = `エンコードが完了した音声データは順番に、API レスポンスとしてリアルタイムにストリーミング配信します。
このリアルタイム配信を活用すれば、すべての音声合成が完了するのを待たずに、クライアント側で再生を開始できます。
届いた音声データのチャンクを順次デコーダーに送信するよう実装することで、音声の生成と再生を同時並行で行えます。
クライアント側の実装次第となりますが、長いテキストを読み上げる際も最初から最後まで待たずにすぐに再生を開始でき、生成から再生までの待機時間を大幅に短縮できます。
<sub alias="いちぎょう">一行</sub>に長いテキストをすべて書くと、その行全体が一度に音声合成されるため、ストリーミング配信の効果が得られません。
適切にテキストを分割することで、生成と配信の並行処理が可能になります。`;

const res = await fetchAudio(text, apikey);
console.log(res);
const bin = await res.bytes();
await Deno.writeFile("test.mp3", bin);
