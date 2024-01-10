import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
function HeaderOrganism() {
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/adverts">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <button
            className="btn btn-secondary btn-sm ms-4"
            onClick={handleLogout}
          >
            Logout
          </button>
          <Link to={"/adverts/new"} className="btn btn-success btn-sm ms-4">
            Create new
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderOrganism;
