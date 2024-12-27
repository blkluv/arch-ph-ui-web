"use client"

import React from "react";
import { useRouter } from "next/navigation";
import PatientSearch from "../../ui/patient/patient-search"; 

export default function Page() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/patient/new");
  };
  return (
    <div>
      <h1>Patient Page</h1>
      <p>Search for patients below:</p>
      <PatientSearch /> {/* Add the PatientSearch component here */}
      <button
        onClick={handleClick}
        className={`px-4 py-2 rounded ${"bg-blue-500 text-white hover:bg-blue-600"}`}
      >
        New Patient
      </button>
    </div>
  );
}
