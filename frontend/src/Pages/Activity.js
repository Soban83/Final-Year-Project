import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './Activity.css';
import { Sidebar } from '../Components/Sidebar';
import { Navbar } from '../Components/Navbar';
import { Footer } from '../Components/Footer';
import { LevelNav } from '../Components/LevelNav';
import { VoiceRecorder } from '../Components/VoiceRecorder';

export const Activity = () => {
  const [currentLevel, setCurrentLevel] = useState(1); 
  const [passageIndex, setPassageIndex] = useState(0); 
  const [filteredPassages, setFilteredPassages] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const userID = localStorage.getItem('userID'); // Get userID from localStorage
  const [resetAudio, setResetAudio] = useState(false);
  useEffect(() => {
    const readExcelFile = async () => {
      const response = await fetch('Final.xlsx'); 
      const data = await response.arrayBuffer();

      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
       
      const filteredData = filterPassagesByLevel(jsonData, currentLevel);

      setFilteredPassages(filteredData);
      setPassageIndex(0);
      setIsLoading(false);
    };

    const filterPassagesByLevel = (data, level) => {
      let minWords, maxWords;

      switch (level) {
        case 1:
          minWords = 1;
          maxWords = 30;
          break;
        case 2:
          minWords = 31;
          maxWords = 45;
          break;
        case 3:
          minWords = 46;
          maxWords = 60;
          break;
        case 4:
          minWords = 61;
          maxWords = 75;
          break;
        case 5:
          minWords = 76;
          maxWords = 90;
          break;
        case 6:
          minWords = 91;
          maxWords = 100;
          break;
        case 7:
          minWords = 101;
          maxWords = 120;
          break;
        case 8:
          minWords = 121;
          maxWords = 140;
          break;
        case 9:
          minWords = 141;
          maxWords = 160;
          break;
        case 10:
          minWords = 161;
          maxWords = 500;
          break;
        default:
          minWords = 16;
          maxWords = 100;
      }

      return data.filter(
        (row) => row.Word_count >= minWords && row.Word_count <= maxWords
      );
    };

    readExcelFile();
  }, [currentLevel]); 

  const handleNextPassage = () => {
    setPassageIndex((prevIndex) => (prevIndex + 1) % filteredPassages.length);
    setResetAudio(true); 
  };

  const handleLevelClick = (level) => {
    setCurrentLevel(level);
    setIsLoading(true);
  };

  return (
    <div className="Activity">
      <Navbar />
      <div className="content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main-content">
          <h1>Activity</h1>
          <div className="levelnav">
            <LevelNav currentLevel={currentLevel} onLevelClick={handleLevelClick} />
          </div>
          <p className='level'>Level: {currentLevel}</p>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="passage-box">
                <textarea
                  value={
                    filteredPassages.length > 0
                      ? `. ${filteredPassages[passageIndex].Urdu}` // Assuming you're getting the passage in Urdu
                      : 'No passage available for this level.'
                  }
                  readOnly
                  className="text-box"
                />
                <div className="next-btn">
                 <button onClick={handleNextPassage} disabled={filteredPassages.length <= 1}>
                  Next
                </button>
                </div>
              </div>
              <div className="passage-functions">
                {/* Pass userID and passage to VoiceRecorder */}
                <VoiceRecorder 
                  userID={userID} 
                  passage={filteredPassages[passageIndex]?.Urdu || ''} 
                  resetAudio={resetAudio}
                  setResetAudio={setResetAudio} // Function to reset audio state
                />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
