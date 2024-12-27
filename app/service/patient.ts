import { apiRequest } from '../lib/api-client';

export interface PatientAttributes {
    clinic_id: string;
    last_name: string;
    first_name: string;
    middle_name: string;
    birthdate: string;
    gender: string;
    nick_name: string;
    home_phone: string;
    office_phone: string;
    mobile_phone: string;
    email_address: string;
    fax_number: string;
    nationality: string;
    street_address: string;
    city_town: string;
    province: string;
    zip_code: string;
    occupation: string;
    dental_insurance: string;
    guardian_name: string;
    guardian_occupation: string;
    referrer: string;
    consultation_reason: string;
}

export interface Patient {
    id: string;
    attributes: PatientAttributes;
}

interface PaginationMeta {
    page: number;
    page_size: number;
    total_count: number;
    total_pages: number;
}

interface ApiResponse {
    data: Patient[];
    meta: {
        message: string;
        pagination: PaginationMeta;
    };
}

interface SearchPatientsParams {
    firstname: string;
    lastname: string;
    page: number;
    page_size: number;
}

// Get the base URL dynamically from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
    throw new Error("API base URL is not defined in the environment configuration.");
}

// Fetch patients with search parameters
export async function searchPatients(params: SearchPatientsParams): Promise<{ patients: Patient[]; pagination: PaginationMeta }> {
    const { firstname, lastname, page, page_size } = params;
    const url = `${BASE_URL}/patient/search?firstname=${firstname}&lastname=${lastname}&page=${page}&page_size=${page_size}`;

    // Fetch the API response with the specified URL
    const response = await apiRequest<ApiResponse>(url, { method: 'GET' });

    // Return the patients and pagination metadata
    return {
        patients: response.data,
        pagination: response.meta.pagination,
    };
}

// Create a patient with the provided parameters
export async function createPatient(params: PatientAttributes): Promise<{patient: Patient, message: string}> {
    const url = `${BASE_URL}/patient`; // Endpoint for creating a patient
    debugger;
    const response = await apiRequest<ApiResponse>(url, 
        { 
            method: 'POST',
            body: JSON.stringify(params),
        });

    return {
        patient: response.data[0],
        message: response.meta.message,
    };
}
