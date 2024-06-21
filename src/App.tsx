import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { VideoHome } from './video-components/video-home';
import { AdminLogin } from './video-components/admin-login';
import { AdminDashboard } from './video-components/admin-dashboard';
import { AdminError } from './video-components/admin-error';
import { AddVideo } from './video-components/add-video';
import { UserLogin } from './video-components/user-login';
import { UserRegister } from './video-components/user-register';
import { UserDashboard } from './video-components/user-dashboard';

function App() {
  return (
    <div className="container-fluid">
        <BrowserRouter>
           <header className='p-2 d-flex justify-content-between fs-5 text-center bg-dark text-white'><span>Video Library Project</span> <Link to="/user-login" className='bi bi-person-fill text-decoration-none text-white'> User Login </Link> </header>
           <section className='mt-4'>
               <Routes>
                  <Route path='/' element={<VideoHome />} />
                  <Route path='admin-login' element={<AdminLogin />} />
                  <Route path='admin-dashboard' element={<AdminDashboard />} />
                  <Route path='error' element={<AdminError />} />
                  <Route path='add-video' element={<AddVideo />} />
                  <Route path='user-login' element={<UserLogin />} />
                  <Route path='user-register' element={<UserRegister/>} />
                  <Route path='user-dashboard' element={<UserDashboard />} />
               </Routes>
           </section>
        </BrowserRouter>
    </div>
  );
}

export default App;
