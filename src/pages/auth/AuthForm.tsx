import React, { useState } from 'react';
import { apiLogin, apiSignup } from '../../service/authservice.ts';
import {Input,Button} from "../../components/ui";
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
                error={error ? ' ' : undefined} // Pass error prop to trigger styling
            />
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                error={error ? ' ' : undefined} // Pass error prop to trigger styling
            />

            {error && <p className="ui-input-error-text ui-text-center">{error}</p>}

            {/* Wrapper div to center the button */}
            <div className="ui-flex ui-justify-center">
                <Button type="submit">
                    {isLogin ? 'Login' : 'Sign Up'}
                </Button>
            </div>
        </form>
    );
};
