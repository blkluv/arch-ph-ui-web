import { apiRequest } from "../lib/api-client";
import { ApiResponse } from "../models/base-response";
import { getBaseUrl } from "@/utils/config";

const BASE_URL = getBaseUrl();

export interface MedicalHistoryAttributes {
  patient_id: number;
  clinic_id: string;
  last_name: string;
  first_name: string;
  specialty?: string;
  street_address: string;
  city_town: string;
  province: string;
  zip_code?: string;
  phone_number?: string;
  good_health: boolean;
  under_treatment?: string;
  serious_illness?: string;
  hospitalized?: string;
  medication?: string;
  tobacco_use: boolean;
  drug_use: boolean;
  bleeding_time?: string;
  pregnant?: boolean;
  nursing?: boolean;
  birth_control_pills?: boolean;
  blood_type?: string;
  blood_pressure?: string;
  existing_conditions?: string;
  allergy?: string;
}

export interface MedicalHistory {
  id: number;
  attributes: MedicalHistoryAttributes;
}

interface SearchMedicalHistoryParams {
  patientid: number;
}

// Fetch MedicalHistory with search parameters
export async function searchMedicalHistory(
  params: SearchMedicalHistoryParams
): Promise<{ MedicalHistory: MedicalHistory[] }> {
  const { patientid } = params;
  const url = `${BASE_URL}/dental_history/${patientid}`;

  // Fetch the API response with the specified URL
  const response = await apiRequest<ApiResponse<MedicalHistory[]>>(url, {
    method: "GET",
  });

  // Return the MedicalHistory
  return {
    MedicalHistory: response.data,
  };
}

export async function createMedicalHistory(
  params: MedicalHistoryAttributes
): Promise<{ medicalHistory: MedicalHistory; message: string }> {
  const url = `${BASE_URL}/medical_history`;
  const response = await apiRequest<ApiResponse<MedicalHistory[]>>(url, {
    method: "POST",
    body: JSON.stringify(params),
  });

  return {
    medicalHistory: response.data[0],
    message: response.meta.message,
  };
}
