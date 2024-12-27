'use client'; // Mark this file as a client component

import React from 'react';
import CreatePatientForm from "../../ui/patient/patient-new"; 

export default function Page() {
    return (
        <div>
            <h1>New Patient Page</h1>
            <CreatePatientForm/>
        </div>
    );
}
