'use client'; // Mark this file as a client component

import { useState, useEffect } from 'react';
import { searchPatients } from '../../service/patient'; // Import the searchPatients function
import { Patient } from '../../service/patient'; // Import the Patient type

const PatientSearch = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    total_count: 0,
    total_pages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fetchPatients = async (searchParams: { firstname: string; lastname: string }) => {
    setLoading(true);
    try {
      const { patients, pagination: newPagination } = await searchPatients({
        firstname: searchParams.firstname,
        lastname: searchParams.lastname,
        page: pagination.page,
        page_size: pagination.page_size,
      });
      setPatients(patients);
      setPagination(newPagination);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPatients({ firstname: firstName, lastname: lastName });
  };

  const isSearchDisabled = !firstName.trim() && !lastName.trim(); // Whitespace is treated as empty
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Search</h1>

      <div className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearchDisabled}
          className={`px-4 py-2 rounded ${
            isSearchDisabled
              ? 'bg-gray-400 text-white cursor-not-allowed' // Disabled style
              : 'bg-blue-500 text-white hover:bg-blue-600' // Enabled style
          }`}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Birthdate</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Gender</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Nationality</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Street Address</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">City/Town</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Province</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Zip Code</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Occupation</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={patient.id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.first_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.last_name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.birthdate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.gender}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.email_address}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.nationality}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.street_address}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.city_town}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.province}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.zip_code}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {patient.attributes.occupation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-gray-700">
            <p>
              Page <span className="font-bold">{pagination.page}</span> of{' '}
              <span className="font-bold">{pagination.total_pages}</span>
            </p>
            <p>
              Total patients: <span className="font-bold">{pagination.total_count}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientSearch;
