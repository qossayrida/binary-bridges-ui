import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthForm } from './AuthForm.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { Button } from '../../components/ui';

interface User {
    imageUrl: string;
    uuid: string;
    email: string;
    username: string;
}

interface AuthResponse {
    token: string;
    user: User;
    message?: string;
}

export const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const error = urlParams.get('error');

        if (error === 'oauth2_error') {
            window.history.replaceState({}, document.title, location.pathname);
        }
    }, [location]);

    const handleAuthSuccess = (response: AuthResponse) => {
        login(response.token, response.user);
        navigate('/home');
    };

    const handleFacebookLogin = () => {
        const popup = window.open(
            `${import.meta.env.VITE_API_BASE_URL}oauth2/authorization/facebook`,
            '_blank',
            'width=600,height=700'
        );

        const messageListener = (event: MessageEvent) => {
            // Optionally validate event.origin here
            if (event.data?.token && event.data?.user) {
                login(event.data.token, event.data.user);
                navigate('/home');
            } else {
                console.warn('Invalid or missing data from OAuth popup');
            }

            window.removeEventListener('message', messageListener);
        };

        window.addEventListener('message', messageListener);
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
                    <h3>{isLogin ? 'Welcome Back!' : 'Join Binary Bridges'}</h3>
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
