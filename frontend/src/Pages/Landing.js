import React from 'react'
import './Landing.css'
import { Navbar } from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../Components/Footer'

export const Landing = () => {

    const navigate = useNavigate();
    
   
    const getStarted = () => {
        navigate('/signup');
    }

  return (
    <div className='Landing'>
        <Navbar/>
        <main>
            <div className="main">
                <div className="left">
                    <div className="image">
                        <img src="Home1.jpg" alt="" />
                    </div>
                </div>
                <div className="middle">
                    <div className="mid1">
                        <h3>LEARN FROM TODAY!</h3>
                    </div>
                    <div className="mid2">
                        <h1>Journey to Urdu<br/>Mastery Begins</h1>
                    </div>
                    <div className="mid3">
                        <p>Welcome to the future of Urdu Language Learning with RehnumaAI!</p>
                    </div>

                    <button onClick={getStarted}>Get Started</button>

                </div>
                <div className="right">
                    <div className="image">
                        <img src="Home2.jpg" alt="" />
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </div>
  )
}
