import React from "react";
import "./Home.css";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { Profile } from "./User/Profile";
import { Footer } from "../Components/Footer";

export const Home = () => {
  
  return (
    <div className="Home">
      <Navbar />
      <div className="content">
        <Sidebar />
        <div className="main-content">
          <div>
            <h1>Welcome to RehnumaAI!</h1>
            <div className="profile">
              <Profile/>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
