import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CreateUserPage from './pages/createUserPage/createUserPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserContext from './contexts/UserContext';
import React, { useState } from 'react';
import NavMenu from './components/Navbar/NavMenu';
import NewGraphPage from './pages/NewGraphPage/NewGraphPage.js'
import GraphDetailPage from './pages/GraphDetailPage/GraphDetailPage';
import AddAssetPage from './pages/AddAssetPage/AddAssetPage';
import AssetDetailPage from './pages/AssetDetailPage/AssetDetailPage';
import AboutPage from './pages/AboutPage/AboutPage';
import HowToPage from './pages/HowToPage/HowToPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const changeUserStatus = (status) => {
    if(status === 'login'){
      setIsLoggedIn(true);
    }else if(status === 'logout'){
      localStorage.removeItem('user')
      setIsLoggedIn(false)
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value = {{isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn}}>
        <BrowserRouter>
          <NavMenu changeUserStatus={changeUserStatus} />
            <Routes>
              <Route exact path="/" element={ <HomePage /> } />
              <Route exact path="/about" element={ <AboutPage /> } />
              <Route exact path="/how-to" element={ <HowToPage /> } />
              <Route exact path="/new_user" element={ <CreateUserPage /> } />
              <Route exact path="/login" element={ <LoginPage changeUserStatus={changeUserStatus} /> } />
              <Route exact path="/new_graph" element={ <NewGraphPage /> } />
              <Route exact path="/graphs/:graphID" element={ <GraphDetailPage /> } />
              <Route exact path="/graphs/:graphID/new_asset" element={ <AddAssetPage /> } />
              <Route exact path="/graphs/:graphID/:assetID" element={ <AssetDetailPage /> } />
            </Routes>
          </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
