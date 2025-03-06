import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-center text-2xl font-bold mb-4">Opennote Clone</h1>
      
      <motion.textarea 
        className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
        rows={4} 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Enter your text here..." 
        whileFocus={{ scale: 1.02 }}
      />

      <div className="flex justify-between mt-4">
        <motion.button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
          onClick={summarizeText}
          whileTap={{ scale: 0.95 }}
        >
          Summarize
        </motion.button>

        <motion.button 
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
          onClick={generateAudio}
          whileTap={{ scale: 0.95 }}
        >
          Generate Speech
        </motion.button>
      </div>

      {summary && (
        <motion.p 
          className="mt-4 p-3 bg-gray-100 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <strong>Summary:</strong> {summary}
        </motion.p>
      )}

      {audio && (
        <motion.audio controls className="mt-4 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <source src={audio} type="audio/mp3" />
          Your browser does not support audio playback.
        </motion.audio>
      )}
    </div>
  );
}
