import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FindCnpj from './pages/FindCnpj';
import FindHolidays from './pages/FindHolidays';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/find-cnpj" element={<FindCnpj />} />
          <Route path="/find-holidays" element={<FindHolidays />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
