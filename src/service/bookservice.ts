import {BookControllerApi} from "@binary-bridges/binary-bridges-axios-client-api";

import type {
    BookDTO
} from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";
import {
    BookDTOCategoryEnum
} from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";


const bookControllerApi = new BookControllerApi();

export async function apiCreateBook(bookDTO: BookDTO) {
    try {
        const response = await bookControllerApi.createBook(bookDTO);
        return response.data;
    } catch (error) {
        console.error("Error creating book:", error);
        throw error;
    }
}

export async function apiUpdateBook(bookDTO: BookDTO) {
    try {
        const response = await bookControllerApi.updateBook(bookDTO);
        return response.data;
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}

export async function apiGetBookById(id: string) {
    try {
        const response = await bookControllerApi.getBook(id);
        return response.data;
    } catch (error) {
        console.error("Error getting book by ID:", error);
        throw error;
    }
}

export async function apiGetAllBooks() {
    try {
        const response = await bookControllerApi.getAllBooks();
        console.log("Books data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error getting all books:", error);
        throw error;
    }
}

export async function getBookCategoryEnum() {
    try {
        return Object.values(BookDTOCategoryEnum);
    } catch (error) {
        console.error("Error getting book stats:", error);
        throw error;
    }
}