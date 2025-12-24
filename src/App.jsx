import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SharedThemeProvider } from './contexts/SharedThemeContext';
import ToastProvider from './components/ui/toast/ToastProvider';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { Suspense, lazy } from 'react';

// Lazy load components for better performance
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Documentation = lazy(() => import('./pages/Documentation'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

function App() {
    const { user } = useAuth();

    return (
        <ErrorBoundary>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                            <LandingPage />
                        </Suspense>
                    } 
                />
                <Route 
                    path="/login" 
                    element={
                        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                            <Login />
                        </Suspense>
                    } 
                />
                <Route 
                    path="/signup" 
                    element={
                        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                            <Signup />
                        </Suspense>
                    } 
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        </Suspense>
                    }
                />
                <Route 
                    path="/docs" 
                    element={
                        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                            <Documentation />
                        </Suspense>
                    }
                />
                <Route 
                    path="*" 
                    element={<Navigate to={user ? "/dashboard" : "/"} />}
                />
            </Routes>
        </ErrorBoundary>
    );
}

// We need to wrap the App in the Router and AuthProvider
export default function AppWrapper() {
    return (
        <Router>
            <SharedThemeProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <ToastProvider>
                            <App />
                        </ToastProvider>
                    </AuthProvider>
                </ThemeProvider>
            </SharedThemeProvider>
        </Router>
    );
}
