"use client"; // Mark this file as a client component

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createDentalHistory,
  DentalHistoryAttributes,
} from "../../service/dental-history";

// Zod validation schema
const dentalHistorySchema = z.object({
  clinic_id: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
  first_name: z.string().min(1, "First name is required"),
  patient_id: z.number().min(1, "Patient ID is required"),
  last_visit: z.string().min(1, "Last visit date is required"),
});

type DentalHistoryFormData = z.infer<typeof dentalHistorySchema>;

type CreateDentalHistoryFormProps = {
  onSuccess: (patientId: number) => void;
  patientId: number;
};

const CreateDentalHistoryForm = ({
  patientId,
  onSuccess,
}: CreateDentalHistoryFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [last_visit, setLastVisit] = useState<Date | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DentalHistoryFormData>({
    resolver: zodResolver(dentalHistorySchema),
    defaultValues: {
        patient_id: patientId,
    },
  });

  const onSubmit = async (data: DentalHistoryFormData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const newDentalhistory: DentalHistoryAttributes = {
        ...data,
        clinic_id: data.clinic_id || "",
      };

      const response = await createDentalHistory(newDentalhistory);
      if (response.dentalHistory) {
        onSuccess(response.dentalHistory.id);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      id="create-dental-history-form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="last_name" className="text-sm font-semibold">
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            autoComplete="on"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("last_name")}
          />
          {errors.last_name && (
            <span className="text-red-500 text-xs">
              {errors.last_name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="first_name" className="text-sm font-semibold">
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            autoComplete="on"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("first_name")}
          />
          {errors.first_name && (
            <span className="text-red-500 text-xs">
              {errors.first_name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="birthdate" className="text-sm font-semibold">
            Birthdate
          </label>
          <DatePicker
            id="last_visit"
            selected={last_visit}
            onChange={(date) => {
              setLastVisit(date);
              setValue("last_visit", date?.toISOString() || "");
            }}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            dateFormat="yyyy-MM-dd"
          />
          {errors.last_visit && (
            <span className="text-red-500 text-xs">
              {errors.last_visit.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          id="btn-create-patient"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Save & Next (Medical History)
        </button>
      </div>
    </form>
  );
};

export default CreateDentalHistoryForm;
