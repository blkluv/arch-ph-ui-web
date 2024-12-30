// Page.tsx
"use client"; // Mark this file as a client component

import React, { use, useEffect, useState } from "react";
import CreatePatientForm from "@/ui/patient/patient-new";
import CreateDentalHistoryForm from "@/ui/dental-history/dental-history-new";
import CreateMedicalHistoryForm from "@/ui/medical-history/medical-history-new";

export default function Page() {
  const [patientId, setPatientId] = useState<number | null>(null);
  const [dentalHistoryId, setDentalHistoryId] = useState<number | null>(null);

  const handlePatientCreationSuccess = (id: number) => {
    setPatientId(id); // Set the patient id after successful creation
  };

  const handleDentalHistoryCreationSuccess = (id: number) => {
    setDentalHistoryId(id); // Set the patient id after successful creation
  };

  useEffect(() => {
    setPatientId(1);
    setDentalHistoryId(1);
  }, []);

  return (
    <div>
      <h1>New Patient Page</h1>

      {!patientId && !dentalHistoryId && (
        <CreatePatientForm onSuccess={handlePatientCreationSuccess} />
      )}

      {patientId && !dentalHistoryId && (
        <CreateDentalHistoryForm
          patientId={patientId}
          onSuccess={handleDentalHistoryCreationSuccess}
        />
      )}

      {patientId && dentalHistoryId && (
        <CreateMedicalHistoryForm
          patientId={patientId}
          onSuccess={handleDentalHistoryCreationSuccess}
        />
      )}
    </div>
  );
}
