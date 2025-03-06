import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const client = new textToSpeech.TextToSpeechClient();
  const request = {
    input: { text: req.body.text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("public/output.mp3", response.audioContent, "binary");

  res.status(200).json({ audio: "/output.mp3" });
}
