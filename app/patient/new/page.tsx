// Page.tsx
'use client'; // Mark this file as a client component

import React, { use, useEffect, useState } from 'react';
import CreatePatientForm from "@/ui/patient/patient-new";
import CreateDentalHistoryForm from "@/ui/dental-history/dental-history-new"; // Adjust path if necessary

export default function Page() {
    const [patientId, setPatientId] = useState<number | null>(null);

    const handlePatientCreationSuccess = (id: number) => {
        setPatientId(id); // Set the patient id after successful creation
    };

    // useEffect(() => {
    //     setPatientId(1);
    // }, []);

    return (
        <div>
            <h1>New Patient Page</h1>

            {!patientId && <CreatePatientForm onSuccess={handlePatientCreationSuccess} />}

            {patientId && <CreateDentalHistoryForm patient_id={patientId} />}
        </div>
    );
}
