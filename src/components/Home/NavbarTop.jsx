import { Button, Navbar, Container, NavDropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

function NavbarTop() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleRequestDemo = () => {
    if (location.pathname === "/") {
      // If on home page, scroll to the section
      const element = document.getElementById("request-demo");
      if (element) {
        element.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }
    } else {
      // If on other pages, navigate to home and then scroll
      navigate("/");
      // Use setTimeout to ensure the page has loaded before scrolling
      setTimeout(() => {
        const element = document.getElementById("request-demo");
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
          });
        }
      }, 100);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/about">About us</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Button
              className="request-demo"
              variant="outline-primary"
              bg="primary"
              onClick={handleRequestDemo}
            >
              Request Demo
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
