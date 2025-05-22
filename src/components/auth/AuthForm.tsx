import React, { useState } from 'react';
import {Button, Input} from "../ui";


interface AuthFormProps {
    isLogin: boolean;
    onSuccess: (token: string, userData?: any) => void;
    onToggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 🚨 Accept any credentials for now
        const fakeToken = 'demo-token';
        const userData = { email };

        onSuccess(fakeToken, userData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label >Email</label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                />
            </div>
            <div className="mb-6">
                <label >Password</label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                />
            </div>
            <Button type="submit">
                {isLogin ? 'Login' : 'Sign Up'}
            </Button>
        </form>
    );
};
