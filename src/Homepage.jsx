import React, { useEffect, useState } from "react";
import SearchIcon from "./assets/Icons/search_FILL0_wght300_GRAD0_opsz24.svg";
import "./Homepage.css";

import { fetchPatients } from "./Js/Api.js";
import MenuBar from "./assets/Icons/more_vert_FILL0_wght300_GRAD0_opsz24.svg";
import DiagnosisHistory from "./Diagnosishistory.jsx";
import Jessicataylor from "./assets/Layer 2@2x.png";
import Birthicon from "./assets/Icons/BirthIcon.svg";
import Gender from "./assets/Icons/FemaleIcon.svg";
import Contact from "./assets/Icons/PhoneIcon.svg";
import Insurance from "./assets/Icons/InsuranceIcon.svg";
import Downloadicon from "./assets/Icons/download_FILL0_wght300_GRAD0_opsz24 (1) (1).svg";
export default function Homepage() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();

        setPatients(data);

        const jessica = data.find((p) => p.name === "Jessica Taylor");
        setSelectedPatient(jessica);
      } catch (error) {
        console.error("Failed to load patients", error);
      }
    };

    loadPatients();
  }, []);

  // ✅ Prevent crash while loading
  if (!selectedPatient) {
    return <div className="loading">Loading patient data...</div>;
  }

  return (
    <div className="Homepage-section">
      {/* LEFT SIDEBAR */}
      <div className="patient-details">
        <div className="searchbar">
          <p>Patients</p>
          <img src={SearchIcon} className="search-icon" alt="Search icon" />
        </div>

        <div className="patient-list">
          {patients.map((patient) => (
            <div
              key={patient.name}
              className={`patient-item ${
                patient.name === "Jessica Taylor" ? "active" : ""
              }`}
            >
              <div className="patient-image-name-age">
                <div className="patient-info">
                  <img
                    src={patient.profile_picture}
                    alt={patient.name}
                    className="patient-avatar"
                  />
                  <div>
                    <p className="patient-name">{patient.name}</p>
                    <p className="patient-age">
                      {patient.gender}, {patient.age}
                    </p>
                  </div>
                </div>
                <img src={MenuBar} className="icon" alt="Menu icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="diagnosis-history">
        <h2 className="diagnosis-header">Diagnosis History</h2>

        <DiagnosisHistory
          diagnosisHistory={selectedPatient.diagnosis_history}
          diagnosticList={selectedPatient.diagnostic_list}
        />
      </div>
      <div className="patient-profile">
        <div className="profile-img-name">
          <img
            src={Jessicataylor}
            alt={selectedPatient.name}
            className="profile-image"
          />
          <h2>{selectedPatient.name}</h2>
          {/* <p>
            {selectedPatient.gender}, {selectedPatient.age}
          </p> */}
        </div>

        <div className="patient-about">
          <div className="info-section">
            <img src={Birthicon} alt="Birth icon" />
            <div className="info">
              <p
                className="info-property-name
              "
              >
                Date of Birth{" "}
              </p>
              <p className="info-property">{selectedPatient.date_of_birth}</p>
            </div>
          </div>
          <div className="info-section">
            <img src={Gender} alt="Gender icon" />
            <div className="info">
              <p
                className="info-property-name
              "
              >
                Gender{" "}
              </p>
              <p className="info-property">{selectedPatient.gender}</p>
            </div>
          </div>
          <div className="info-section">
            <img src={Contact} alt="Contact icon" />
            <div className="info">
              <p
                className="info-property-name
              "
              >
                Contact{" "}
              </p>
              <p className="info-property">{selectedPatient.phone_number}</p>
            </div>
          </div>
          <div className="info-section">
            <img src={Contact} alt="Emergency icon" />
            <div className="info">
              <p className="info-property-name">Emergency </p>
              <p className="info-property">
                {selectedPatient.emergency_contact}
              </p>
            </div>
          </div>
          <div className="info-section">
            <img src={Insurance} alt="Insurance icon" />
            <div className="info">
              <p className="info-property-name">Insurance Provider </p>
              <p className="info-property">{selectedPatient.insurance_type}</p>
            </div>
          </div>
          <button className="show-all">Show All Information</button>
          <div className="lab-results">
            <h3>Latest Lab Results</h3>

            {selectedPatient?.lab_results?.length > 0 ? (
              selectedPatient.lab_results.map((result, index) => (
                <div className="each-result">
                  <p key={index}>{result}</p>
                  <img src={Downloadicon} alt="Downloadicon" className="download-icon"/>
                </div>
              ))
            ) : (
              <p>N/A</p>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
