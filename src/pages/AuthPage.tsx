import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuth } from '../context/AuthContext';
import {Button} from "../components/ui";

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

    const handleAuthSuccess = (token: string) => {
        login(token);
        navigate('/home');
    };

    const handleFacebookLogin = () => {
        console.log('Redirecting to Facebook OAuth... ', import.meta.env.VITE_API_BASE_URL);
        window.location.href = import.meta.env.VITE_API_BASE_URL + 'oauth2/authorization/facebook';
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>📚 Binary Bridges</h1>
                    <p>Your comprehensive book management system</p>
                </div>

                <div className="auth-toggle">
                    <Button
                        onClick={() => setIsLogin(true)}
                        className={isLogin ? 'active' : 'inactive'}
                    >
                        🔐 Login
                    </Button>
                    <Button
                        onClick={() => setIsLogin(false)}
                        className={!isLogin ? 'active' : 'inactive'}
                    >
                        🆕 Sign Up
                    </Button>

                </div>

                <div className="auth-header">
                    <h3>
                        {isLogin ? 'Welcome Back!' : 'Join Binary Bridges'}
                    </h3>
                </div>


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

