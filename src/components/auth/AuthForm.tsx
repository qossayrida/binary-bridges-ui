import React, { useState } from 'react';
import { apiLogin, apiSignup } from '../../service/authService';
import {Input,Button} from "../ui";
import type { LoginRequest, SignupRequest } from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";


interface AuthFormProps {
    isLogin: boolean;
    onSuccess: (token: string) => void;
    onToggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                const loginRequest: LoginRequest = { username: email, password };
                const res = await apiLogin(loginRequest);
                onSuccess(res.token); // assuming API returns { token }
            } else {
                const signupRequest: SignupRequest = { username: email, password };
                const res = await apiSignup(signupRequest);
                onSuccess(res.token); // assuming API returns { token }
            }
        } catch (err) {
            setError('Authentication failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="form-input"
            />
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="form-input"
            />
            {error && <p>{error}</p>}
            <Button type="submit">
                {isLogin ? 'Login' : 'Sign Up'}
            </Button>
        </form>
    );
};
