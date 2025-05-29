import React, { useState } from 'react';
import { apiLogin, apiSignup } from '../../service/authservice.ts';
import { Input, Button } from "../../components/ui";
import type { LoginRequest, SignupRequest } from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";

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

interface AuthFormProps {
    isLogin: boolean;
    onSuccess: (response: AuthResponse) => void;
    onToggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSuccess }) => {
    const [identifier, setIdentifier] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            let res: AuthResponse;

            if (isLogin) {
                const loginRequest: LoginRequest = {
                    username: identifier, // supports email or username
                    password,
                };
                res = await apiLogin(loginRequest);
            } else {
                const signupRequest: SignupRequest = {
                    username,
                    email: identifier,
                    password,
                    imageUrl: imageUrl || undefined,
                };
                res = await apiSignup(signupRequest);
            }

            onSuccess(res);
        } catch (err) {
            setError('Authentication failed');
            console.error("Auth error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
                <>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <Input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Profile Image URL (optional)"
                    />
                </>
            )}

            <Input
                type={isLogin ? 'text' : 'email'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={isLogin ? 'Username or Email' : 'Email'}
                required
                error={error ? ' ' : undefined}
            />

            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                error={error ? ' ' : undefined}
            />

            {error && <p className="ui-input-error-text ui-text-center">{error}</p>}

            <div className="ui-flex ui-justify-center">
                <Button type="submit">
                    {isLogin ? 'Login' : 'Sign Up'}
                </Button>
            </div>
        </form>
    );
};
