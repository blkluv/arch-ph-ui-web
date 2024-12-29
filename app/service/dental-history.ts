import { apiRequest } from '../lib/api-client';
import { ApiResponse, PaginationMeta } from '../models/base-response';
import { getBaseUrl } from "@/utils/config";

const BASE_URL = getBaseUrl();

// Use BASE_URL as needed

export interface DentalHistoryAttributes {
    clinic_id: string;
    patient_id: number;
    last_name: string;
    first_name: string;
    last_visit: string;
}

export interface DentalHistory {
    id: string;
    attributes: DentalHistoryAttributes;
}

interface SearchDentalHistoryParams {
    patientid: number;
}


// Fetch DentalHistory with search parameters
export async function searchDentalHistory(params: SearchDentalHistoryParams): Promise<{ DentalHistory: DentalHistory[] }> {
    const { patientid } = params;
    const url = `${BASE_URL}/dental_history/${patientid}`;

    // Fetch the API response with the specified URL
    const response = await apiRequest<ApiResponse<DentalHistory[]>>(url, { method: 'GET' });

    // Return the DentalHistory 
    return {
        DentalHistory: response.data,
    };
}

// Create a patient with the provided parameters
export async function createDentalHistory(params: DentalHistoryAttributes): Promise<{dentalHistory: DentalHistory, message: string}> {
    const url = `${BASE_URL}/dental_history`; // Endpoint for creating a patient
    const response = await apiRequest<ApiResponse<DentalHistory[]>>(url, 
        { 
            method: 'POST',
            body: JSON.stringify(params),
        });

    return {
        dentalHistory: response.data[0],
        message: response.meta.message,
    };
}
