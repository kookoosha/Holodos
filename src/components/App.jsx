import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './Auth';
import Holodos from './pages/Holodos';
import Home from './pages/Home';
import Reg from './Reg';
import Navbar2 from './ui/Navbar2';

export default function App({ user, users, allCategory, allProducts }) {
  const [userState, setUserState] = useState(user || null);
  // console.log(user);
  return (
    <div className="container">
      <Navbar2 userState={userState} setUserState={setUserState} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/reg" element={<Reg setUserState={setUserState} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/holodos" element={<Holodos allProducts={allProducts} allCategory={allCategory} />} />
      </Routes>
    </div>
  );
}
