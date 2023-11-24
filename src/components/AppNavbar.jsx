import { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FavoritesSidebar from "./FavoritesSidebar";

const AppNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" variant="dark" bg="primary" size="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            News App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/favorites">
                Favorites
              </Nav.Link>
              <Nav.Link onClick={handleShow}>Favorites (sidebar)</Nav.Link>
              <Nav.Link onClick={logout}>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <FavoritesSidebar show={show} handleClose={handleClose} />
    </>
  );
};

export default AppNavbar;
