import React from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";

class PersonList extends React.Component {
  state = {
    persons: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    this.setState({ loading: true, error: null });
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((res) => {
        this.setState({ persons: res.data.results, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
        console.error("Error fetching data:", error);
      });
  };

  render() {
    const { persons, loading, error } = this.state;

    return (
      <Container className="mt-4">
        <h2 className="text-center mb-3">Random User List (Axios)</h2>

        <div className="mb-3 text-center">
          <Button onClick={this.fetchUsers} disabled={loading}>
            {loading ? "Loading..." : "Refresh Data"}
          </Button>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        )}

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {person.name.title} {person.name.first} {person.name.last}
                </td>
                <td>{person.email}</td>
                <td>{person.location.country}</td>
                <td>
                  <img
                    src={person.picture.thumbnail}
                    alt="User"
                    style={{ borderRadius: "50%" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default PersonList;
