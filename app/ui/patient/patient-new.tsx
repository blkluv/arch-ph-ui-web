"use client"; // Mark this file as a client component

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPatient, PatientAttributes } from "../../service/patient";

// Zod validation schema
const patientSchema = z.object({
  clinic_id: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  birthdate: z.string().min(1, "Birthdate is required"),
  gender: z.string().min(1, "Gender is required"),
  nick_name: z.string().optional(),
  home_phone: z.string().optional(),
  office_phone: z.string().optional(),
  mobile_phone: z.string().optional(),
  email_address: z.string().email("Invalid email address").optional(),
  fax_number: z.string().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  street_address: z.string().min(1, "Street address is required"),
  city_town: z.string().min(1, "City/Town is required"),
  province: z.string().min(1, "Province is required"),
  zip_code: z.string().optional(),
  occupation: z.string().optional(),
  dental_insurance: z.string().optional(),
  guardian_name: z.string().optional(),
  guardian_occupation: z.string().optional(),
  referrer: z.string().optional(),
  consultation_reason: z.string().min(1, "Consultation reason is required"),
});

type PatientFormData = z.infer<typeof patientSchema>;

const CreatePatientForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [success, setSuccess] = useState<string | null>(null); 

  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });


  const onSubmit = async (data: PatientFormData) => {
    try {

      setLoading(true);
      setError(null); 
      setSuccess(null); 

      const newPatient: PatientAttributes = {
        ...data,
        birthdate: birthdate?.toISOString() || "",
        middle_name: data.middle_name || "",
        nick_name: data.nick_name || "",
        home_phone: data.home_phone || "",
        office_phone: data.office_phone || "",
        mobile_phone: data.mobile_phone || "",
        email_address: data.email_address || "",
        fax_number: data.fax_number || "",
        zip_code: data.zip_code || "",
        occupation: data.occupation || "",
        dental_insurance: data.dental_insurance || "",
        guardian_name: data.guardian_name || "",
        guardian_occupation: data.guardian_occupation || "",
        referrer: data.referrer || "",
        clinic_id: data.clinic_id || "",
      };
      const response = await createPatient(newPatient);
      console.log(response.message);
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
      id="create-patient-form"
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
          <label htmlFor="middle_name" className="text-sm font-semibold">
            Middle Name
          </label>
          <input
            id="middle_name"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("middle_name")}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="birthdate" className="text-sm font-semibold">
            Birthdate
          </label>
          <DatePicker
            id="birthdate"
            selected={birthdate}
            onChange={(date) => {
              setBirthdate(date);
              setValue("birthdate", date?.toISOString() || "");
            }}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            dateFormat="yyyy-MM-dd"
          />
          {errors.birthdate && (
            <span className="text-red-500 text-xs">
              {errors.birthdate.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="gender" className="text-sm font-semibold">
            Gender
          </label>
          <select
            id="gender"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-xs">
              {errors.gender.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="nick_name" className="text-sm font-semibold">
            Nick Name
          </label>
          <input
            id="nick_name"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("nick_name")}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="nationality" className="text-sm font-semibold">
            Nationality
          </label>
          <select
            id="nationality"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("nationality")}
          >
            <option value="">Select Nationality</option>
            <option value="Filipino">Filipino</option>
            <option value="American">American</option>
            <option value="Canadian">Canadian</option>
            <option value="British">British</option>
            <option value="Australian">Australian</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Brazilian">Brazilian</option>
            <option value="Mexican">Mexican</option>
            <option value="Japanese">Japanese</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            <option value="Spanish">Spanish</option>
            <option value="South African">South African</option>
            <option value="Russian">Russian</option>
            <option value="Pakistani">Pakistani</option>
            <option value="Egyptian">Egyptian</option>
            <option value="Turkish">Turkish</option>
            <option value="Argentinian">Argentinian</option>
            <option value="Colombian">Colombian</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Saudi Arabian">Saudi Arabian</option>
            {/* Add more countries/nationalities as needed */}
          </select>
          {errors.nationality && (
            <span className="text-red-500 text-xs">
              {errors.nationality.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email_address" className="text-sm font-semibold">
            Email Address
          </label>
          <input
            id="email_address"
            type="email"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email_address")}
          />
          {errors.email_address && (
            <span className="text-red-500 text-xs">
              {errors.email_address.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="street_address" className="text-sm font-semibold">
            Street Address
          </label>
          <input
            id="street_address"
            type="text"
            autoComplete="on"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("street_address")}
          />
          {errors.street_address && (
            <span className="text-red-500 text-xs">
              {errors.street_address.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="city_town" className="text-sm font-semibold">
            City/Town
          </label>
          <input
            id="city_town"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("city_town")}
          />
          {errors.city_town && (
            <span className="text-red-500 text-xs">
              {errors.city_town.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="province" className="text-sm font-semibold">
            Province
          </label>
          <input
            id="province"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("province")}
          />
          {errors.province && (
            <span className="text-red-500 text-xs">
              {errors.province.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="zip_code" className="text-sm font-semibold">
            Zip Code
          </label>
          <input
            id="zip_code"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("zip_code")}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="occupation" className="text-sm font-semibold">
            Occupation
          </label>
          <input
            id="occupation"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("occupation")}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="dental_insurance" className="text-sm font-semibold">
            Dental Insurance
          </label>
          <input
            id="dental_insurance"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("dental_insurance")}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="guardian_name" className="text-sm font-semibold">
            Guardian Name
          </label>
          <input
            id="guardian_name"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("guardian_name")}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="guardian_occupation"
            className="text-sm font-semibold"
          >
            Guardian Occupation
          </label>
          <input
            id="guardian_occupation"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("guardian_occupation")}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="referrer" className="text-sm font-semibold">
            Referrer
          </label>
          <input
            id="referrer"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("referrer")}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="consultation_reason"
            className="text-sm font-semibold"
          >
            Consultation Reason
          </label>
          <input
            id="consultation_reason"
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("consultation_reason")}
          />
          {errors.consultation_reason && (
            <span className="text-red-500 text-xs">
              {errors.consultation_reason.message}
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
          Create Patient
        </button>
      </div>
    </form>
  );
};

export default CreatePatientForm;
