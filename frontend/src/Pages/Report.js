import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Footer } from "../Components/Footer";
import "./Report.css";

export const Report = () => {
  const [reports, setReports] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const fetchReports = async () => {
      const userID = localStorage.getItem('userID'); // Get userID from local storage

      const response = await fetch(`http://localhost:3001/reports/${userID}`);
      const data = await response.json();
      console.log(data);
      setReports(data);
      
      const total = data.reduce((acc, report) => {
        return {
          totalScore: acc.totalScore + report.pointsScored,
          totalPoints: acc.totalPoints + report.totalScore, // Each report has a total score of 100
        };
      }, { totalScore: 0, totalPoints: 0 });

      setTotalScore(total.totalScore);
      setTotalPoints(total.totalPoints);
    };

    fetchReports();
  }, []);

  const calculatePercentage = () => {
    if (totalPoints === 0) return 0; // Prevent division by zero
    return ((totalScore / totalPoints) * 100).toFixed(2);
  };

  return (
    <div className="Report">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <div className="heading">
            <h1>Report Summary</h1>
          </div>
          <div className="report-content">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Test Number</th>
                  <th>Points Scored</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index}>
                    <td>{report.testNumber}</td>
                    <td>{report.pointsScored}/{report.totalScore}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total Score:</th>
                  <td>{totalScore}/{totalPoints} ({calculatePercentage()}%)</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
