import React from 'react';
import './App.css';
import LoginPage from "./components/Login/LoginPage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
        <Router>
            <Route exact path='/' render={(props) => (
                <LoginPage {...props}/>
            )}/>
            <Route exact path='/dashboard' render={(props) => (
                <Dashboard {...props}/>
            )}/>
        </Router>
    </div>
  );
}

export default App;
