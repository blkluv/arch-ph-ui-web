'use client'; // Mark this file as a client component

import React from 'react';
import CreateDentalHistoryForm from "@/ui/dental-history/dental-history-new"; 

export default function Page() {

    const patientId = 123;

    return (
        <div>
            <h1>New Dental History Page</h1>
            <CreateDentalHistoryForm patient_id={patientId}/>
        </div>
    );
}
