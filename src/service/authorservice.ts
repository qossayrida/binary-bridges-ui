import {
    AuthorControllerApi,
} from "@binary-bridges/binary-bridges-axios-client-api";

import type {AuthorDTO} from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";


const authorControllerApi = new AuthorControllerApi();

export async function apiCreateAuthor(authorDTO: AuthorDTO) {
    try {
        const response = await authorControllerApi.createAuthor(authorDTO);
        return response.data;
    } catch (error) {
        console.error("Error creating author:", error);
        throw error;
    }
}

export async function apiUpdateAuthor(authorDTO: AuthorDTO) {
    try {
        const response = await authorControllerApi.updateAuthor(authorDTO);
        return response.data;
    } catch (error) {
        console.error("Error updating author:", error);
        throw error;
    }
}

export async function apiGetAuthorById(id: string) {
    try {
        const response = await authorControllerApi.getAuthor(id);
        return response.data;
    } catch (error) {
        console.error("Error getting author by ID:", error);
        throw error;
    }
}

export async function apiGetAllAuthors() {
    try {
        const response = await authorControllerApi.getAllAuthor();
        return response.data;
    } catch (error) {
        console.error("Error getting all authors:", error);
        throw error;
    }
}


