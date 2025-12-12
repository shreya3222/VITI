// src/components/VoiceModal.jsx
import { useState } from "react";
import { FiMic, FiMicOff, FiX } from "react-icons/fi";
import { parseVoiceTranscript } from "../api/voice"; 

export default function VoiceModal({ open, onClose, onCreateFromParsed }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [parsed, setParsed] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleStartListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech Recognition not supported.");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    setListening(true);
    recognition.start();

    recognition.onresult = (e) => {
      setTranscript(e.results[0][0].transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

const parseTranscript = async () => {
  if (!transcript.trim()) return;
  setLoading(true);

  try {
    const res = await parseVoiceTranscript(transcript); 
    console.log("Voice Parsed Result:", res);

    setParsed({
      ...res.parsed,
      mode: res.source  
    });

  } catch (err) {
    console.error("Parsing failed", err);
    alert("Parsing failed, try again");
  }

  setLoading(false);
};

  const handleCreate = () => parsed && onCreateFromParsed(parsed);

  return (
    <div className="modal-backdrop">
      <div className="modal-panel">

        <div className="modal-header">
          <div className="modal-title">Voice Task Creator</div>
          <button className="btn btn-ghost" onClick={onClose}><FiX size={18}/></button>
        </div>

        <div className="modal-body">

          <div>
            <div className="field-label">Transcript</div>
            <textarea
              className="field-textarea"
              placeholder="Speak or paste: 'create report high priority due Monday'"
              value={transcript}
              onChange={(e)=>setTranscript(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" style={{marginTop:10}} disabled={listening} onClick={handleStartListening}>
            {listening ? <><FiMicOff size={16}/> Listening...</> : <><FiMic size={16}/> Start</>}
          </button>
          {listening && <div className="voice-wave"><div className="voice-dot"/></div>}

          <button className="btn btn-ghost" style={{marginTop:10}} disabled={!transcript.trim()||loading} onClick={parseTranscript}>
            {loading ? "Parsing..." : "Parse Text"}
          </button>

          {parsed && (
            <div style={{marginTop:12,padding:12,borderRadius:8,border:"1px solid #444",background:"rgba(255,255,255,0.05)"}}>
              <strong>Edit Before Creating </strong>

              <div style={{marginTop:8}}>
                <label className="field-label">Title</label>
                <input className="field-input" value={parsed.title} onChange={e=>setParsed({...parsed,title:e.target.value})}/>
              </div>

              <div>
                <label className="field-label">Priority</label>
                <select className="field-select" value={parsed.priority} 
                  onChange={e=>setParsed({...parsed,priority:e.target.value})}>
                  <option>low</option><option>medium</option><option>high</option><option>critical</option>
                </select>
              </div>

              <div>
                <label className="field-label">Status</label>
                <select className="field-select" value={parsed.status} 
                  onChange={e=>setParsed({...parsed,status:e.target.value})}>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div>
                <label className="field-label">Due Date</label>
<input type="date" className="field-input" value={parsed.dueDate || ""}
                  onChange={e=>setParsed({...parsed,dueDate:e.target.value})}/>
              </div>
            </div>
          )}

        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" disabled={!parsed} onClick={handleCreate}>Create Task</button>
        </div>

      </div>
    </div>
  );
}
