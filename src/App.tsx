import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SidebarLayout } from './components/layout/SidebarLayout';
import { AuthPage } from './pages/AuthPage.tsx';
import { appRoutes } from './config/routesConfig.tsx';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
    console.log(import.meta.env.MODE); // "development" in dev mode

    return (
        <AuthProvider>
            <Router basename="/binary-bridges-ui">
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <SidebarLayout />
                            </ProtectedRoute>
                        }
                    >
                        {appRoutes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path.replace(/^\//, '')}
                                element={route.element}
                            />
                        ))}
                        <Route index element={<Navigate to="/home" replace />} />
                    </Route>

                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
