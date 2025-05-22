import {
    AuthControllerApi,
} from "@binary-bridges/binary-bridges-axios-client-api";

import type { LoginRequest, SignupRequest } from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";


const authControllerApi = new AuthControllerApi();


export async function apiLogin(LoginRequest: LoginRequest) {
    try {
        const response = await authControllerApi.login(LoginRequest);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export async function apiSignup(SignupRequest: SignupRequest) {
    try {
        const response = await authControllerApi.signup(SignupRequest);
        return response.data;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
}