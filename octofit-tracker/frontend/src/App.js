import React from 'react';
import './App.css';
import logo from './logo.svg';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const base = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`;
  console.log('API base url (from App):', base);

  const navLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark octo-navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} className="octo-logo" alt="OctoFit" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/activities" className={navLinkClass}>Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/workouts" className={navLinkClass}>Workouts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/teams" className={navLinkClass}>Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/users" className={navLinkClass}>Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/leaderboard" className={navLinkClass}>Leaderboard</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
