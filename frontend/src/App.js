import './App.css';
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import {Landing} from './Pages/Landing'
import { Home } from './Pages/Home';
import {Activity} from './Pages/Activity'
import {Explore} from './Pages/Explore'
import {Assessment} from './Pages/Assessment'
import {UploadVideo} from './Pages/UploadVideo'
import { Login } from './Pages/User/Login';
import { Signup } from './Pages/User/Signup';
import {Report} from './Pages/Report'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element ={<Landing/>}/>
          <Route path="/home" element = {<Home/>}/>
          <Route path="/explore" element={<Explore />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/uploadvideo" element={<UploadVideo />} />
          <Route path="/login" element ={<Login/>}/>
          <Route path="/signup" element ={<Signup/>}/>
          <Route path="/report" element ={<Report/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;