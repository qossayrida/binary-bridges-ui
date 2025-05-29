import React, { useState } from 'react';
import { apiLogin, apiSignup } from '../../service/authservice.ts';
import { Input, Button } from "../../components/ui";
import type { LoginRequest, SignupRequest } from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";

// Define the User interface matching AuthContext
interface User {
    imageUrl: string;
    uuid: string;
    email: string;
    username: string;
}

// Define the expected response structure from API calls
interface AuthResponse {
    token: string;
    user: User;
    message?: string; // Optional message field
}

interface AuthFormProps {
    isLogin: boolean;
    onSuccess: (response: AuthResponse) => void; // Update onSuccess signature
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
            let res: AuthResponse;
            if (isLogin) {
                const loginRequest: LoginRequest = { username: email, password };
                // Assuming apiLogin returns { token: string, user: User, message?: string }
                res = await apiLogin(loginRequest);
            } else {
                const signupRequest: SignupRequest = { username: email, password };
                // Assuming apiSignup returns { token: string, user: User, message?: string }
                res = await apiSignup(signupRequest);
            }
            onSuccess(res); // Pass the full response object
        } catch (err) {
            setError('Authentication failed');
            console.error("Auth error:", err); // Log error for debugging
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

