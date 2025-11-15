import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import "./App.css"; // ensure this import so styles load

export default function PersonListFetch() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    fetch("https://randomuser.me/api/?results=6&nat=us,gb,ie,ca,au")
      .then((res) => res.json())
      .then((data) => {
        setPersons(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="page-shell">
      <Container className="pt-4">
        <h1 className="lab-title">Output format</h1>

        <div className="user-banner my-3 d-flex justify-content-center align-items-center">
          <h2 className="user-banner-text">User List</h2>
        </div>

        <div className="mt-3">
          <div className="mb-3 text-center">
            <Button onClick={fetchUsers} disabled={loading} variant="primary">
              {loading ? "Loading..." : "Refresh Data"}
            </Button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              Error: {error}
            </div>
          )}

          {persons.map((person, idx) => (
            <div className="user-card mb-4" key={person.login.uuid}>
              <div className="user-card-header">
                <strong>
                  {person.name.title} {person.name.first} {person.name.last}
                </strong>{" "}
                - {person.login.uuid}
              </div>

              <div className="user-card-body row no-gutters align-items-center">
                <div className="col-md-3 text-center">
                  <img
                    className="user-avatar"
                    src={person.picture.large}
                    alt={`${person.name.first}`}
                  />
                  <div className="mt-2">
                    <Button variant="primary" size="sm">Details</Button>
                  </div>
                </div>

                <div className="col-md-9 user-details">
                  <div className="detail-row">
                    <div className="detail-label">User Name:</div>
                    <div className="detail-value">{person.login.username}</div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">Gender:</div>
                    <div className="detail-value">{person.gender.toUpperCase()}</div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">Time Zone Description:</div>
                    <div className="detail-value">{person.location.timezone.description || person.location.timezone.offset}</div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">Address:</div>
                    <div className="detail-value">
                      {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country} - {person.location.postcode}
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">Email:</div>
                    <div className="detail-value">{person.email}</div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">Birth Date and Age:</div>
                    <div className="detail-value">{person.dob.date} ({person.dob.age})</div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">Register Date:</div>
                    <div className="detail-value">{person.registered.date}</div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">Phone#:</div>
                    <div className="detail-value">{person.phone}</div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">Cell#:</div>
                    <div className="detail-value">{person.cell}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
