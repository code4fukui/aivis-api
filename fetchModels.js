import { fetchModels } from "./AivisSpeech.js";

const save = async (fn, license = undefined) => {
  const list = [];
  const license_types = license;
  for (let page = 1;; page++) {
    const res = await fetchModels({ sort: "recent", page, limit: 30, license_types });
    res.aivm_models.forEach(i => console.log(i.name));
    console.log(res.total, res.aivm_models.length, page);
    if (!res.aivm_models?.length) break;
    list.push(...res.aivm_models);
  }
  await Deno.writeTextFile(fn, JSON.stringify(list, null, 2));
};

await save("models.json");

// "ACML 1.0" "ACML-NC 1.0" "CC0" "Custom" "Internal"
//await save("models-cc0.json", "CC0");
//await save("models-acml1.0.json", "ACML 1.0");
