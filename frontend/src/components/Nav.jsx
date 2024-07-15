import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../AuthContext";

function NavComponent() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">Read Around</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {" "}
            {/* Align items to the right */}
            <Nav.Link href="/" className="mx-2">
              Home
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link href="/user-profile" className="mx-2">
                  User Profile
                </Nav.Link>
                <Nav.Link href="/" onClick={handleLogout} className="mx-2">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login" className="mx-2">
                  Login
                </Nav.Link>
                <Nav.Link href="/signup" className="mx-2">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComponent;
