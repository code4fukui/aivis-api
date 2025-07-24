const default_model_uuid = "a59cb814-0083-4369-8542-f51a29e72af7";

export const getDefaultModel = () => default_model_uuid;

export const fetchAudio = async (text, apikey, model_uuid) => {
  const res = await fetch("https://api.aivis-project.com/v1/tts/synthesize", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + apikey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_uuid: model_uuid || default_model_uuid,
      text,
      use_ssml: true,
      output_format: "mp3", // ストリーミングのために MP3 を指定
    }),
  });
  return res;
};

export const speech = async (text, apikey, model_uuid) => { // ret: Audio
  const res = await fetchAudio(text, apikey, model_uuid);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // MediaSource / ManagedMediaSource (iOS Safari) ですべての生成が終わる前にストリーミング再生
  // iOS Safari は MediaSource 非対応だが、iOS 17.1 以降では代わりに ManagedMediaSource を利用できる
  const mediaSource = self.MediaSource ? new self.MediaSource() : new self.ManagedMediaSource();
  const audio = new Audio(URL.createObjectURL(mediaSource));
  audio.disableRemotePlayback = true; // ManagedMediaSource での再生に必要
  audio.play().catch(console.error);
  console.log("Streaming audio data...");
  mediaSource.addEventListener("sourceopen", async () => {
    const sb = mediaSource.addSourceBuffer("audio/mpeg");

    // updating フラグが立っていたら updateend まで待つ
    const waitForIdle = () => {
      return sb.updating ? new Promise(r => sb.addEventListener("updateend", r, { once: true })) : Promise.resolve();
    };

    const reader = res.body.getReader();
    for (;;) {
      const { value, done } = await reader.read();
      if (done) {
        await waitForIdle(); // 最後の書き込みを待つ
        console.log("Streaming audio data finished.");
        mediaSource.endOfStream();
        break;
      }
      await waitForIdle();
      sb.appendBuffer(value);
      await waitForIdle();
    }
  });
  return audio;
};

// param
  // keyword, // max 100 chars
  // tags, // array
  // categories, // array "ExistingCharacter" "OriginalCharacter" "LivingPerson" "DeceasedPerson" "FictionalPerson" "Other"
  // voice_timbres, // array "YoungMale" "YoungFemale" "YouthfulMale" "YouthfulFemale" "AdultMale" "AdultFemale" "MiddleAgedMale" "MiddleAgedFemale" "ElderlyMale" "ElderlyFemale" "Neutral" "Baby" "Mechanical" "Other"
  // license_types, // array "ACML 1.0" "ACML-NC 1.0" "CC0" "Custom" "Internal"
  // sort, // "download"(default) "like" "recent"
  // page, // 1(default)
  // limit, // 24(default)
// ret
//   total: 82,
//   aivm_models: array
export const fetchModels = async (opt) => {
  const encparam = (opt) => {
    const res = [];
    for (const name in opt) {
      if (opt[name] === undefined) continue;
      res.push(name + "=" + encodeURIComponent(opt[name]));
    }
    return res.join("&");
  };
  //const param = JSON.stringify(opt);
  const res = await fetch("https://api.aivis-project.com/v1/aivm-models/search?" + encparam(opt), {
    method: "GET",
  //const res = await fetch("https://api.aivis-project.com/v1/aivm-models/search", {
    //method: "POST",
    //body: param,
    headers: {
      //"Authorization": "Bearer " + apikey,
      "Content-Type": "application/json",
    },
  });
  //console.log(res);
  return await res.json();
};
