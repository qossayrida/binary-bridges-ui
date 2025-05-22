import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuth } from '../context/AuthContext';

export const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');

        if (token) {
            login(token);
            navigate('/home');
        }

        if (error === 'oauth2_error') {
            window.history.replaceState({}, document.title, location.pathname);
        }
    }, [location, navigate, login]);

    const handleAuthSuccess = (token: string, userData?: any) => {
        login(token);
        navigate('/home');
    };

    const handleFacebookLogin = () => {
        window.location.href = '/oauth2/authorization/facebook';
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>📚 Binary Bridges</h1>
                    <p>Your comprehensive book management system</p>
                </div>

                <div className="auth-toggle">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={isLogin ? 'active' : 'inactive'}
                    >
                        🔐 Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={!isLogin ? 'active' : 'inactive'}
                    >
                        🆕 Sign Up
                    </button>
                </div>

                <h2 className="text-xl font-semibold text-center mb-6">
                    {isLogin ? 'Welcome Back!' : 'Join Binary Bridges'}
                </h2>

                <button onClick={handleFacebookLogin} className="auth-facebook">
                    📘 Continue with Facebook
                </button>

                <div className="auth-divider">
                    <span>or {isLogin ? 'login' : 'sign up'} with your account</span>
                </div>

                <AuthForm
                    isLogin={isLogin}
                    onSuccess={handleAuthSuccess}
                    onToggleMode={() => setIsLogin((prev) => !prev)}
                />
            </div>
        </div>
    );
};
