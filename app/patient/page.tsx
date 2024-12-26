import React from 'react';
import PatientSearch from '../ui/patient/patient-search'; // Import the PatientSearch component

export default function Page() {
    return (
        <div>
            <h1>Patient Page</h1>
            <p>Search for patients below:</p>
            <PatientSearch /> {/* Add the PatientSearch component here */}
        </div>
    );
}
