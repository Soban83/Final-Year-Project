import React from "react";
import "./Assessment.css";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Footer } from "../Components/Footer";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedTest, setSelectedTest] = useState(1); // Default to the first test
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const userID = localStorage.getItem('userID'); // Get userID from localStorage
  useEffect(() => {
    const fetchDataset = async () => {
      const response = await fetch("FillInBlankData.xlsx");
      const data = await response.arrayBuffer();

      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const dividedQuestions = [];
      const questionsPerTest = 10; // Assuming 10 questions per test
      for (let i = 0; i < 10; i++) {
        dividedQuestions.push(
          jsonData.slice(i * questionsPerTest, (i + 1) * questionsPerTest)
        );
      }

      setQuestions(dividedQuestions);
    };

    fetchDataset();
  }, []);

  const handleChange = (e, index) => {
    const updatedAnswers = { ...userAnswers, [index]: e.target.value };
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const calculatedResults = questions[selectedTest - 1].map(
      (question, index) => ({
        question: question.Urdu,
        correctAnswer: question.Answer,
        userAnswer: userAnswers[index] || "",
        isCorrect: userAnswers[index]?.trim() === question.Answer,
      })
    );

    setResults(calculatedResults);
    setIsSubmitted(true);

    // Calculate score based on the number of correct answers
    const correctAnswersCount = calculatedResults.filter(result => result.isCorrect).length;
    const totalQuestions = questions[selectedTest - 1].length; // Total number of questions
    const score = correctAnswersCount * 10; // Each question is worth 10 marks

    await fetch('http://localhost:3001/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: userID, testNumber: selectedTest, pointsScored: score, totalScore: totalQuestions * 10 }),
    });
  };

  const handleTestSelection = (e) => {
    setSelectedTest(Number(e.target.value));
    setUserAnswers({});
    setResults(null);
    setIsSubmitted(false);
  };

  return (
    <div className="Assessment">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <div className="assessment-page">
            <div className="test-selector">
              <select onChange={handleTestSelection} value={selectedTest}>
                <option value={1}>Test 1 - Spell the word</option>
                <option value={2}>Test 2 - Spell the word</option>
                <option value={3}>Test 3 - Masculine and Feminine</option>
                <option value={4}>Test 4 - Pick the right form</option>
                <option value={5}>Test 5 - Pick the right form</option>
                <option value={6}>Test 6 - Pick the right word</option>
                <option value={7}>Test 7 - Pick the right word</option>
                <option value={8}>Test 8 - Pick the right word</option>
                <option value={9}>Test 9 - Pick the right word</option>
                <option value={10}>Test 10 - Pick the right word</option>
              </select>
            </div>

            {isSubmitted ? (
              <div className="results-section">
                <h2>Results</h2>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`result ${
                      result.isCorrect ? "correct" : "incorrect"
                    }`}
                  >
                    <p>
                      <strong>Question {index + 1}:</strong> {result.question}
                    </p>
                    <p>
                      <strong>Your Answer:</strong> {result.userAnswer}
                    </p>
                    <p>
                      <strong>Correct Answer:</strong> {result.correctAnswer}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="questions-section">
                <h3>Test {selectedTest}</h3>
                {questions[selectedTest - 1]?.map((question, index) => (
                  <div key={index} className="question-box">
                    <input
                      type="text"
                      placeholder=""
                      onChange={(e) => handleChange(e, index)}
                      value={userAnswers[index] || ""}
                      className="input-blank"
                    />
                    <p className="question-text">{question.Urdu}</p>
                    <p className="question-number">
                      <strong> &nbsp; .{index + 1}</strong>
                    </p>
                  </div>
                ))}
                <button onClick={handleSubmit}>Submit</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
