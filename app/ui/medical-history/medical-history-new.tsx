"use client"; // Mark this file as a client component

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import {
  createMedicalHistory,
  MedicalHistoryAttributes,
} from "../../service/medical-history";

// Define the schema for validation using zod
const medicalHistorySchema = z.object({
  clinic_id: z.string().optional(),
  patient_id: z.number().min(1, "Patient ID is required"),
  last_name: z.string().min(1, "Last name is required"),
  first_name: z.string().min(1, "First name is required"),
  specialty: z.string().optional(),
  street_address: z.string().min(1, "Street address is required"),
  city_town: z.string().min(1, "City/Town is required"),
  province: z.string().min(1, "Province is required"),
  zip_code: z.string().optional(),
  phone_number: z.string().optional(),
  good_health: z.boolean(),
  under_treatment: z.string().optional(),
  serious_illness: z.string().optional(),
  hospitalized: z.string().optional(),
  medication: z.string().optional(),
  tobacco_use: z.boolean(),
  drug_use: z.boolean(),
  bleeding_time: z.string().optional(),
  pregnant: z.boolean(),
  nursing: z.boolean(),
  birth_control_pills: z.boolean(),
  blood_type: z.string().optional(),
  blood_pressure: z.string().optional(),
  existing_conditions: z.string().optional(),
  allergy: z.string().optional(),
});

type MedicalHistoryFormValues = z.infer<typeof medicalHistorySchema>;

type CreateMedicalHistoryFormProps = {
  onSuccess: (patientId: number) => void;
  patientId: number;
};

const MedicalHistoryForm = ({
  patientId,
  onSuccess,
}: CreateMedicalHistoryFormProps) => {
  const [formStatus, setFormStatus] = useState<string | null>(null);

  // Initialize the form with react-hook-form and zod validation resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MedicalHistoryFormValues>({
    resolver: zodResolver(medicalHistorySchema),
    defaultValues: {
      patient_id: patientId,
    },
  });

  const onSubmit = async (data: MedicalHistoryFormValues) => {
    try {
      const existingConditions = data.existing_conditions || "";
      const allergy = data.allergy || "";

      const newMedicalhistory: MedicalHistoryAttributes = {
        ...data,
        clinic_id: data.clinic_id || "",
        existing_conditions: existingConditions.trim() === "" ? null : JSON.parse(existingConditions),
        allergy: allergy.trim() === "" ? null : JSON.parse(allergy),
        // zip_code: data.zip_code || "",
        // phone_number: data.phone_number || "",
        // under_treatment: data.under_treatment || "",
        // serious_illness: data.serious_illness || "",
        // hospitalized: data.hospitalized || "",
        // medication: data.medication || "",
        // bleeding_time: data.bleeding_time || "",
        // blood_type: data.blood_type || "",
        // blood_pressure: data.blood_pressure || "",
      };

      const response = await createMedicalHistory(newMedicalhistory);
      if (response.medicalHistory) {
        onSuccess(response.medicalHistory.id);
      }
    } catch (error) {
      setFormStatus(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Medical History Form</h1>
      {formStatus && (
        <p className="text-center text-green-600 mb-4">{formStatus}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            {...register("last_name")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.last_name && (
            <span className="text-red-600 text-sm">
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            {...register("first_name")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.first_name && (
            <span className="text-red-600 text-sm">
              {errors.first_name.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="specialty"
            className="block text-sm font-medium text-gray-700"
          >
            Specialty
          </label>
          <input
            id="specialty"
            type="text"
            {...register("specialty")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="street_address"
            className="block text-sm font-medium text-gray-700"
          >
            Street Address
          </label>
          <input
            id="street_address"
            type="text"
            {...register("street_address")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.street_address && (
            <span className="text-red-600 text-sm">
              {errors.street_address.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="city_town"
            className="block text-sm font-medium text-gray-700"
          >
            City/Town
          </label>
          <input
            id="city_town"
            type="text"
            {...register("city_town")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.city_town && (
            <span className="text-red-600 text-sm">
              {errors.city_town.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="province"
            className="block text-sm font-medium text-gray-700"
          >
            Province
          </label>
          <input
            id="province"
            type="text"
            {...register("province")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.province && (
            <span className="text-red-600 text-sm">
              {errors.province.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="zip_code"
            className="block text-sm font-medium text-gray-700"
          >
            Zip Code
          </label>
          <input
            id="zip_code"
            type="text"
            {...register("zip_code")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone_number"
            type="text"
            {...register("phone_number")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="good_health"
            className="inline-flex items-center text-sm font-medium text-gray-700"
          >
            Good Health
          </label>
          <input
            id="good_health"
            type="checkbox"
            {...register("good_health")} // Ensures the value is `true` when checked
            className="w-4 h-4"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="under_treatment"
            className="block text-sm font-medium text-gray-700"
          >
            Under Treatment
          </label>
          <input
            id="under_treatment"
            type="text"
            {...register("under_treatment")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="serious_illness"
            className="block text-sm font-medium text-gray-700"
          >
            Serious Illness
          </label>
          <input
            id="serious_illness"
            type="text"
            {...register("serious_illness")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="hospitalized"
            className="block text-sm font-medium text-gray-700"
          >
            Hospitalized
          </label>
          <input
            id="hospitalized"
            type="text"
            {...register("hospitalized")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="medication"
            className="block text-sm font-medium text-gray-700"
          >
            Medication
          </label>
          <input
            id="medication"
            type="text"
            {...register("medication")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="tobacco_use"
            className="inline-flex items-center text-sm font-medium text-gray-700"
          >
            Tobacco Use
          </label>
          <input
            id="tobacco_use"
            type="checkbox"
            {...register("tobacco_use")}
            className="w-4 h-4"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="drug_use"
            className="inline-flex items-center text-sm font-medium text-gray-700"
          >
            Drug Use
          </label>
          <input
            id="drug_use"
            type="checkbox"
            {...register("drug_use")}
            className="w-4 h-4"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="bleeding_time"
            className="block text-sm font-medium text-gray-700"
          >
            Bleeding Time
          </label>
          <input
            id="bleeding_time"
            type="text"
            {...register("bleeding_time")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="pregnant"
            className="inline-flex items-center text-sm font-medium text-gray-700"
          >
            Pregnant
          </label>
          <input
            id="pregnant"
            type="checkbox"
            {...register("pregnant")}
            className="w-4 h-4"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="nursing"
            className="inline-flex items-center text-sm font-medium text-gray-700"
          >
            Nursing
          </label>
          <input
            id="nursing"
            type="checkbox"
            {...register("nursing")}
            className="w-4 h-4"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="birth_control_pills"
            className="inline-flex items-center text-sm font-medium text-gray-700"
          >
            Birth Control Pills
          </label>
          <input
            id="birth_control_pills"
            type="checkbox"
            {...register("birth_control_pills")}
            className="w-4 h-4"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="blood_type"
            className="block text-sm font-medium text-gray-700"
          >
            Blood Type
          </label>
          <input
            id="blood_type"
            type="text"
            {...register("blood_type")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="blood_pressure"
            className="block text-sm font-medium text-gray-700"
          >
            Blood Pressure
          </label>
          <input
            id="blood_pressure"
            type="text"
            {...register("blood_pressure")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="existing_conditions"
            className="block text-sm font-medium text-gray-700"
          >
            Existing Conditions
          </label>
          <input
            id="existing_conditions"
            type="text"
            {...register("existing_conditions")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="allergy"
            className="block text-sm font-medium text-gray-700"
          >
            Allergy
          </label>
          <input
            id="allergy"
            type="text"
            {...register("allergy")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicalHistoryForm;
