import React from "react";
import "./Header.css";
import TestLogo from "./assets/testlogo.svg";
import Home from "./assets/Icons/home_FILL0_wght300_GRAD0_opsz24.svg";
import Group from "./assets/Icons/group_FILL0_wght300_GRAD0_opsz24.svg";
import Calender from "./assets/Icons/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg";
import Chat from "./assets/Icons/calendar_today_FILL0_wght300_GRAD0_opsz24.svg";
import Transaction from "./assets/Icons/credit_card_FILL0_wght300_GRAD0_opsz24.svg";
import Settings from "./assets/Icons/settings_FILL0_wght300_GRAD0_opsz24.svg";
import MenuBar from "./assets/Icons/more_vert_FILL0_wght300_GRAD0_opsz24.svg";
// Doctor Image
import DoctorImg from "./assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc@2x.png";
export default function Header() {
  return (
    <div className="Header-section">
      <img src={TestLogo} className="test-logo" alt="Test Logo" />
      <nav className="Navigation-menu">
        <ul>
          <li className="overview">
            <img src={Home} className="icon" alt="Home Icon" /> Overview
          </li>
          <li className="patients">
            <img src={Group} className="icon" alt="Group Icon" /> Patients
          </li>
          <li className="schedule">
            <img src={Calender} className="icon" alt="Calender Icon" />{" "}
            Schedule
          </li>
          <li className="message">
            <img src={Chat} className="icon" alt="Chat Icon" /> Message
          </li>
          <li className="transactions">
            <img
              src={Transaction}
              className="icon"
              alt="Transaction Icon"
            />{" "}
            Transactions
          </li>
        </ul>
      </nav>
      <div className="doctor-and-menu-section">
        <div className="doctors-section">
          <img src={DoctorImg} alt="Doctor Image" />
          <div className="doctor-name-profile">
            <p className="doc-name">Dr. Jose Simmons</p>
            <p className="doc-profile">General Practitioner</p>
          </div>
        </div>
        <div className="settings-menu">
          <img src={Settings} className="icon" alt="Settings Icon" />
          <img src={MenuBar} className="icon" alt="Menu Bar Icon" />
        </div>
      </div>
    </div>
  );
}
