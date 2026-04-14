import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Placeholder Components (Create these quickly in a /pages folder)
const Login = () => <div>Login Page</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;
const LawyerDashboard = () => <div>Lawyer Dashboard</div>;
const ClientDashboard = () => <div>Client Portal</div>;

// Role-Based Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Replace with Redux later
  
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/lawyer/*" element={
          <ProtectedRoute allowedRoles={['Lawyer']}>
            <LawyerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/client/*" element={
          <ProtectedRoute allowedRoles={['Client']}>
            <ClientDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;