import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="Sidebar">
      <body>
        <div className="list">
          <ul>
            <li><NavLink to="/home" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/explore" activeClassName="active">Explore</NavLink></li>
            <li><NavLink to="/activity" activeClassName="active">Activity</NavLink></li>
            <li><NavLink to="/assessment" activeClassName="active">Assessments</NavLink></li>
            <li><NavLink to="/report" activeClassName="active">Report</NavLink></li>
            <li><NavLink to="/ranking" activeClassName="active">Ranking</NavLink></li>
          </ul>
        </div>
      </body>
    </div>
  );
};