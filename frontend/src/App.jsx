import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

// Layouts
import CandidateLayout from './layouts/CandidateLayout';
import CompanyLayout from './layouts/CompanyLayout';

// Auth & Landing
import LandingPage from './features/landing/LandingPage';
import LoginRegister from './features/auth/LoginRegister';

// Candidate Pages
import DashboardCandidate from './features/candidate/DashboardCandidate';
import ProfileOnboarding from './features/candidate/ProfileOnboarding';
import CVGenerator from './features/candidate/CVGenerator';
import JobRecommendations from './features/candidate/JobRecommendations';
import JobDetail from './features/candidate/JobDetail';
import OnlineTest from './features/candidate/OnlineTest';
import Interviews from './features/candidate/Interviews';
import GapSkillReport from './features/candidate/GapSkillReport';
import CandidateApplications from './features/candidate/CandidateApplications';

// Company Pages
import DashboardCompany from './features/company/DashboardCompany';
import JobPostForm from './features/company/JobPostForm';
import CandidateRanking from './features/company/CandidateRanking';
import CandidateDetail from './features/company/CandidateDetail';
import AssessmentManagement from './features/company/AssessmentManagement';

// Protected Route wrapper
const RequireAuth = ({ role, children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/auth" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'candidate' ? '/candidate/dashboard' : '/company/dashboard'} replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<LoginRegister />} />

          {/* Candidate routes */}
          <Route path="/candidate" element={
            <RequireAuth role="candidate">
              <CandidateLayout><Navigate to="/candidate/dashboard" replace /></CandidateLayout>
            </RequireAuth>
          } />
          <Route path="/candidate/dashboard" element={
            <RequireAuth role="candidate"><CandidateLayout><DashboardCandidate /></CandidateLayout></RequireAuth>
          } />
          <Route path="/candidate/profile" element={
            <RequireAuth role="candidate"><CandidateLayout><ProfileOnboarding /></CandidateLayout></RequireAuth>
          } />
          <Route path="/candidate/cv-generator" element={
            <RequireAuth role="candidate"><CandidateLayout><CVGenerator /></CandidateLayout></RequireAuth>
          } />
          <Route path="/candidate/jobs" element={
            <RequireAuth role="candidate"><CandidateLayout><JobRecommendations /></CandidateLayout></RequireAuth>
          } />
          <Route path="/candidate/jobs/:id" element={
            <RequireAuth role="candidate"><CandidateLayout><JobDetail /></CandidateLayout></RequireAuth>
          } />
          <Route path="/candidate/applications" element={
            <RequireAuth role="candidate"><CandidateLayout><CandidateApplications /></CandidateLayout></RequireAuth>
          } />
          <Route path="/candidate/tests" element={
            <RequireAuth role="candidate"><CandidateLayout><OnlineTest /></CandidateLayout></RequireAuth>
          } />
          <Route path="/candidate/interviews" element={
            <RequireAuth role="candidate"><CandidateLayout><Interviews /></CandidateLayout></RequireAuth>
          } />
          <Route path="/candidate/gap-analysis" element={
            <RequireAuth role="candidate"><CandidateLayout><GapSkillReport /></CandidateLayout></RequireAuth>
          } />

          {/* Company / Recruiter routes */}
          <Route path="/company" element={
            <RequireAuth role="company">
              <CompanyLayout><Navigate to="/company/dashboard" replace /></CompanyLayout>
            </RequireAuth>
          } />
          <Route path="/company/dashboard" element={
            <RequireAuth role="company"><CompanyLayout><DashboardCompany /></CompanyLayout></RequireAuth>
          } />
          <Route path="/company/jobs" element={
            <RequireAuth role="company"><CompanyLayout><CandidateRanking /></CompanyLayout></RequireAuth>
          } />
          <Route path="/company/jobs/create" element={
            <RequireAuth role="company"><CompanyLayout><JobPostForm /></CompanyLayout></RequireAuth>
          } />
          <Route path="/company/candidates" element={
            <RequireAuth role="company"><CompanyLayout><CandidateRanking /></CompanyLayout></RequireAuth>
          } />
          <Route path="/company/candidates/:id" element={
            <RequireAuth role="company"><CompanyLayout><CandidateDetail /></CompanyLayout></RequireAuth>
          } />
          <Route path="/company/assessments" element={
            <RequireAuth role="company"><CompanyLayout><AssessmentManagement /></CompanyLayout></RequireAuth>
          } />

          {/* Legacy redirects */}
          <Route path="/dashboard-candidate" element={<Navigate to="/candidate/dashboard" replace />} />
          <Route path="/dashboard-company" element={<Navigate to="/company/dashboard" replace />} />

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
