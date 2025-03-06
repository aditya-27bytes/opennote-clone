import { useState } from "react";

export default function NoteProcessor() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [audio, setAudio] = useState("");

  const summarizeText = async () => {
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setSummary(data.summary);
  };

  const generateAudio = async () => {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setAudio(data.audio);
  };

  return (
    <div className="p-5">
      <textarea 
        className="border p-2 w-full" 
        rows={4} 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter your text here..." 
      />
      <button className="bg-blue-500 text-white p-2 m-2" onClick={summarizeText}>
        Summarize
      </button>
      <button className="bg-green-500 text-white p-2" onClick={generateAudio}>
        Generate Speech
      </button>

      {summary && <p className="mt-4"><strong>Summary:</strong> {summary}</p>}
      {audio && (
        <audio controls className="mt-4">
          <source src={audio} type="audio/mp3" />
          Your browser does not support audio playback.
        </audio>
      )}
    </div>
  );
}
