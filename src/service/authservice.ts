import {
    AuthControllerApi
} from "@binary-bridges/binary-bridges-axios-client-api";
import {
    UploadControllerApi
} from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/axios/upload-controller-api";


import type { LoginRequest, SignupRequest } from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";


const authControllerApi = new AuthControllerApi();

const uploadControllerApi = new UploadControllerApi();

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

export async function apiGetImage(imageUuid: string) {
    try {
        console.log("Fetching image with UUID:", imageUuid);
        const response = await uploadControllerApi.getImage(imageUuid);
        return response.data;
    } catch (error) {
        console.error("Error fetching image:", error);
        throw error;
    }
}

export async function apiUploadImage(file: File) {
    try {
        const response = await uploadControllerApi.uploadImage(file);
        console.log("Image uploaded successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}