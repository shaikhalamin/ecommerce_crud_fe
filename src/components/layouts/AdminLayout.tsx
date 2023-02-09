import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getLocalSession } from "../../api/local-storage";
import SideNavBar from "./sidebar/SideNavBar";

interface ChildProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<ChildProps> = ({ children }) => {
  let navigate = useNavigate();

  useEffect(() => {
    getLocalSession() === null && navigate("/");
  }, [navigate]);

  return (
    <Row>
      <Col md="2" className="border">
        <Row>
          <Col className="min-vh-100">
            <SideNavBar />
          </Col>
        </Row>
      </Col>
      <Col md="10">{children}</Col>
    </Row>
  );
};

export default AdminLayout;
