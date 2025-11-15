import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SalesOrderPage from './pages/SalesOrderPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SalesOrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
