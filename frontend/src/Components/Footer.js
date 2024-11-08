import React from 'react'
import './Footer.css'

export const Footer = () => {
  return (
    <div className='Footer'>
        <footer>
            <div className="left">
              <div className="content">
                <h3>Creators:</h3>
                <ul>
                    <li>Soban ur Rehman</li>
                    <li>Syed Amir Gulzar Bukhari</li>
                    <li>M.Shayyan Bilal</li>
                </ul>
              </div>
            </div>
            <div className="middle">
                <h1>RehnumaAI</h1>
                <p>Copyright &copy; 2024</p>
                <div className="logos">
                    <a href=""><img src="Facebook.png" alt="" /></a>
                    <a href=""><img src="Instagram.png" alt="" /></a>
                    <a href=""><img src="Linkedin.png" alt="" /></a>
                </div>
            </div>
            <div className="right">
                <ul>
                    <li><a href="">Contact Us</a></li>
                    <li><a href="">About Us</a></li>
                    <li><a href="">Terms & Policy</a></li>
                </ul>
            </div>
        </footer>
    </div>
  )
}
