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
                <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="you@example.com"
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="••••••••"
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
                {isLogin ? 'Login' : 'Sign Up'}
            </Button>
        </form>
    );
};
