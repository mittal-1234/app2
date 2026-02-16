import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import KodNestLayout from './components/KodNestLayout';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import ResultsPage from './pages/ResultsPage';
import TestChecklistPage from './pages/TestChecklistPage';
import ShipPage from './pages/ShipPage';
import ProofPage from './pages/ProofPage';
import DesignSystemPage from './pages/DesignSystemPage';
import { Practice, Assessments, Resources, Profile } from './pages/Pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Dashboard Routes - Using New KodNest Layout */}
        <Route element={<KodNestLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prp/07-test" element={<TestChecklistPage />} />
          <Route path="/prp/08-ship" element={<ShipPage />} />
          <Route path="/prp/08-ship" element={<ShipPage />} />
          <Route path="/prp/proof" element={<ProofPage />} />
          {/* Verification Route */}
          <Route path="/design-system" element={<DesignSystemPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
