import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./VoiceRecorder.css";

export const VoiceRecorder = ({ userID, passage, resetAudio, setResetAudio }) => { 
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [transcription, setTranscription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (resetAudio) {
      setAudioUrl(null); 
      setAudioBlob(null); 
      setResetAudio(false); 
    }
  }, [resetAudio, setResetAudio]);

  const handleStartRecording = () => {
    // Clear message and transcription before starting a new recording
    setMessage("");
    setTranscription("");

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        const audioURL = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(audioURL);
        setAudioChunks([]); 
      };

      setAudioChunks(chunks);
    });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleUploadRecording = async () => {
    if (!audioBlob) {
      alert("No audio recorded. Please record audio first.");
      return;
    }

    setMessage("");
    setTranscription("");

    try {
      const formData3001 = new FormData();
      formData3001.append('audio', audioBlob, `recording-${Date.now()}.wav`);  
      formData3001.append('userId', userID);
      formData3001.append('passage', passage);

      const uploadResponse = await axios.post('http://localhost:3001/audio/upload', formData3001);
      console.log('Audio uploaded successfully:', uploadResponse.data);

      const formData8000 = new FormData();
      formData8000.append('file', audioBlob, `recording-${Date.now()}.wav`);  
      formData8000.append('userId', userID);
      formData8000.append('passage', passage);

      const transcriptionResponse = await axios.post('http://localhost:8000/transcribe', formData8000, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('Transcription successful:', transcriptionResponse.data);
      setTranscription(transcriptionResponse.data.transcription);
      setMessage('Audio uploaded and transcription complete');

    } catch (error) {
      console.error('Error during the upload/transcription process:', error);

      if (error.response && error.response.status === 422) {
        setMessage('Unprocessable Entity: Please check your file format and input data.');
      } else {
        setMessage('Error uploading audio or transcribing. Please try again.');
      }
    }
  };

  const handleDiscardRecording = () => {
    setAudioUrl(null);
    setAudioBlob(null);
    setMessage("");  // Clear the message
    setTranscription("");  // Clear the transcription
  };

  return (
    <div className="voice-recorder">
      <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
        {isRecording ? (
          <i className="fa fa-stop-circle" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-microphone" aria-hidden="true"></i>
        )}
      </button>

      {audioUrl && (
        <div>
          <audio controls src={audioUrl}></audio>
          <div className="recorder-actions">
            <button className="btn" onClick={handleUploadRecording}>Submit</button>
            <button className="btn" onClick={handleDiscardRecording}>Discard</button>
          </div>
        </div>
      )}

      {/* Only display the message and transcription if audio is recorded */}
      {audioUrl && message && <p className="message">{message}</p>}
      {audioUrl && transcription && (
        <div className="transcription-result">
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};
