import React, { useState } from "react";
import "./App.css";

const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];


export default function App() {
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(form);
  };

  return (
    <div className="container">
      <h1>Lab Week 10 – Data Entry Form</h1>

      <form className="card" onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="1234 Main St"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

         <div className="row">
          <label htmlFor="address-2">Address 2</label>
          <input
            id="address-2"
            name="address-2"
            type="text"
            placeholder="Apartment,studio, or floor"
            value={form.address-2}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid">
          <div className="row">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <label htmlFor="province">Province</label>
            <select
              id="province"
              name="province"
              value={form.province}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Choose
              </option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={form.postalCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <span>Agree Terms &amp; Conditions?</span>
          </label>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn">Submit</button>
      </form>

      {submitted && (
        <div className="output">
          <h2>Submitted Data</h2>
          <pre>
{`Email:
${submitted.email}

Full Name:
${submitted.fullName}

Address:
${submitted.address}

City:
${submitted.city}

Province:
${submitted.province}

Postal Code:
${submitted.postalCode}`}
          </pre>
        </div>
      )}
    </div>
  );
}
