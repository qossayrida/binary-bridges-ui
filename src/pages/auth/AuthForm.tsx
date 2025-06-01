import React, { useState } from 'react';
import { apiLogin, apiSignup, apiUploadImage } from '../../service/authservice.ts';
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
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file');
                return;
            }
            // Validate file size (e.g., 5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image file size must be less than 5MB');
                return;
            }
            setImageFile(file);
            setError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsUploading(true);

        try {
            let res: AuthResponse;

            if (isLogin) {
                const loginRequest: LoginRequest = {
                    username: identifier, // supports email or username
                    password,
                };
                res = await apiLogin(loginRequest);
            } else {
                let imageUrl: string | undefined;

                // Upload image if provided
                if (imageFile) {
                    try {
                        const uploadResponse = await apiUploadImage(imageFile);
                        imageUrl = uploadResponse.url || uploadResponse.imageUrl; // Adjust based on your API response structure
                    } catch (uploadError) {
                        console.error("Image upload failed:", uploadError);
                        setError('Failed to upload image. Please try again.');
                        setIsUploading(false);
                        return;
                    }
                }

                const signupRequest: SignupRequest = {
                    username,
                    email: identifier,
                    password,
                    imageUrl,
                };
                res = await apiSignup(signupRequest);
            }

            onSuccess(res);
        } catch (err) {
            setError('Authentication failed');
            console.error("Auth error:", err);
        } finally {
            setIsUploading(false);
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

            {!isLogin && (
                <>
                    <div className="profile-image-container">
                        <label htmlFor="profile-image" className="profile-image-label">
                            Profile Image (optional)
                        </label>
                        <input
                            id="profile-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="profile-image-input"
                        />
                        {imageFile && (
                            <p className="profile-image-info">
                                Selected: {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
                            </p>
                        )}
                    </div>
                </>
            )}

            {error && <p className="ui-input-error-text ui-text-center">{error}</p>}

            <div className="ui-flex ui-justify-center">
                <Button type="submit" disabled={isUploading}>
                    {isUploading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                </Button>
            </div>
        </form>
    );
};