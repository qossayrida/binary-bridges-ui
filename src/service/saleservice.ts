import {
    SaleControllerApi
} from "@binary-bridges/binary-bridges-axios-client-api";


import type {
    SaleDTO
} from "@binary-bridges/binary-bridges-axios-client-api/dist/com/binary-bridges/client/sdk/typescript/models";


const saleControllerApi = new SaleControllerApi();

export async function apiCreateSale(saleDTO: SaleDTO) {
    try {
        const response = await saleControllerApi.createSale(saleDTO);
        return response.data;
    } catch (error) {
        console.error("Error creating sale:", error);
        throw error;
    }
}

export async function apiUpdateSale(saleDTO: SaleDTO) {
    try {
        const response = await saleControllerApi.updateSale(saleDTO);
        return response.data;
    } catch (error) {
        console.error("Error updating sale:", error);
        throw error;
    }
}

export async function apiGetSaleById(id: string) {
    try {
        const response = await saleControllerApi.getSale(id);
        return response.data;
    } catch (error) {
        console.error("Error getting sale by ID:", error);
        throw error;
    }
}

export async function apiGetAllSales() {
    try {
        const response = await saleControllerApi.getAllSales();
        return response.data;
    } catch (error) {
        console.error("Error getting all sales:", error);
        throw error;
    }
}



