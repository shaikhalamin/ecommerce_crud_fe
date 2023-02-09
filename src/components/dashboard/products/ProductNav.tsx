import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { MdDashboard, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  getLocalSession,
  removeLocalSession,
} from "../../../api/local-storage";

const ProductNav = () => {
  const session = getLocalSession();
  let navigate = useNavigate();
  const handleLogOut = () => {
    removeLocalSession();
    navigate("/");
  };
  return (
    <Navbar bg="light" expand="lg" className="px-0 border">
      <Container fluid>
        <Navbar.Brand href="/dashboard">
          <span className="text-dark ft-18 fw-bold">Products</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#" disabled></Nav.Link>
          </Nav>
          <Nav>
            <Nav>
              <Dropdown align={"end"}>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="text-dark"
                >
                  <span className="ft-15 fw-bold">
                    {session?.user?.firstName} {session?.user?.lastName}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/dashboard">
                    <span style={{ marginRight: "3px" }} className="nav-drop">
                      <MdDashboard size={19} className="nav-drop" />
                    </span>
                    <span className="ft-14 fw-normal">Dashboard</span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLogOut()}>
                    <span style={{ marginRight: "3px" }} className="nav-drop">
                      <MdLogout size={19} className="nav-drop" />
                    </span>
                    <span className="ft-14 fw-normal">Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ProductNav;
