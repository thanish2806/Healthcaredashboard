import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import "./Diagnosishistory.css";
import Respiratory from "./assets/Icons/respiratory rate.svg";
import TempIcon from "./assets/Icons/temperature.svg";
import HeartIcon from "./assets/Icons/HeartBPM.svg";

export default function DiagnosisHistory({ diagnosisHistory, diagnosticList }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // Time duration state (6 months default)
  const [duration, setDuration] = useState(6);

  useEffect(() => {
    if (!diagnosisHistory || diagnosisHistory.length === 0) return;

    // Sort data chronologically
    const sortedHistory = [...diagnosisHistory].sort(
      (a, b) =>
        new Date(`${a.month} 1, ${a.year}`) -
        new Date(`${b.month} 1, ${b.year}`),
    );

    // Filter based on selected duration
    const filteredHistory = sortedHistory.slice(-duration);

    const labels = filteredHistory.map(
      (item) => `${item.month.slice(0, 3)}, ${item.year}`,
    );

    const systolicData = filteredHistory.map(
      (item) => item.blood_pressure.systolic.value,
    );

    const diastolicData = filteredHistory.map(
      (item) => item.blood_pressure.diastolic.value,
    );

    // Destroy previous chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Systolic",
            data: systolicData,
            borderColor: "#C26EB4",
            backgroundColor: "#E66FD2",
            tension: 0.4,
            pointRadius: 6,
            pointBorderWidth: 0,
            fill: false,
          },
          {
            label: "Diastolic",
            data: diastolicData,
            borderColor: "#7E6CAB",
            backgroundColor: "#7A6EE6",
            tension: 0.4,
            pointRadius: 6,
            pointBorderWidth: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: {
                size: 12,
                weight: "500",
                family: "Inter, Arial, sans-serif",
              },
              color: "#6b7280",
            },
          },
          y: {
            min: 60,
            max: 180,
            ticks: {
              font: {
                size: 12,
                weight: "500",
                family: "Manrope, sans-serif",
              },
              color: "#6b7280",
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [diagnosisHistory, duration]);

  // Latest values (used on right side stats)
  const latest =
    diagnosisHistory && diagnosisHistory.length
      ? diagnosisHistory[diagnosisHistory.length - 1]
      : null;

  return (
    <div className="diagnosis-section">
      <div className="bp-card">
        {/* HEADER */}
        <div className="chart-container-main">
          <div className="bp-header">
            <h3>Blood Pressure</h3>
            {/* Time duration selector */}
            <select
              className="bp-select"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={6}>Last 6 months</option>
              <option value={12}>Last 12 months</option>
            </select>
          </div>
          <div className="bp-chart-container">
            <canvas ref={canvasRef} />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {/* STATS */}
          {latest && (
            <div className="bp-stats">
              <div className="bp-stat">
                <div className="bp-label">
                  <span className="bp-dot systolic" />
                  Systolic
                </div>
                <div className="bp-value">
                  {latest.blood_pressure.systolic.value}
                </div>
                <div className="bp-status up">
                  {latest.blood_pressure.systolic.levels}
                </div>
              </div>
              <div className="line-break"></div>
              <div className="bp-stat">
                <div className="bp-label">
                  <span className="bp-dot diastolic" />
                  Diastolic
                </div>
                <div className="bp-value">
                  {latest.blood_pressure.diastolic.value}
                </div>
                <div className="bp-status down">
                  {latest.blood_pressure.diastolic.levels}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="heart-temp-section">
        <div className="respiratory-rate-value">
          <img src={Respiratory} alt="Temperature icon" className="rate-icon" />
          <h3>Respiratory Rate</h3>
          <p className="points">
            {latest ? `${latest.respiratory_rate.value} bpm` : "N/A"}
          </p>
          <p className="temp-status">
            {latest ? `${latest.respiratory_rate.levels} ` : "N/A"}
          </p>
        </div>

        <div className="temperature-rate-value">
          <img src={TempIcon} alt="Temperature icon" className="rate-icon" />
          <h3>Temperature</h3>
          <p className="points">
            {latest ? `${latest.temperature.value} °F` : "N/A"}
          </p>
          <p className="temp-status">
            {latest ? `${latest.temperature.levels} ` : "N/A"}
          </p>
        </div>

        <div className="heart-rate-value">
          <img src={HeartIcon} alt="Temperature icon" className="rate-icon" />
          <h3>Heart Rate</h3>
          <p className="points">
            {latest ? `${latest.heart_rate.value} bpm` : "N/A"}
          </p>
          <p className="temp-status">
            {latest ? `${latest.heart_rate.levels} ` : "N/A"}
          </p>
        </div>
      </div>
      <div className="diagonistic-list">
        <h3>Diagnostic List</h3>
        <table>
          <thead>
            <tr>
              <th>Problem</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnosticList && diagnosticList.length > 0 ? (
              diagnosticList.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">N/A</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
