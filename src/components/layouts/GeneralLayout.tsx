import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthSidebar from "./login/AuthSidebar";

type GeneralLayoutProps = {
  children: React.ReactNode;
};

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={6}>{children}</Col>
        <Col md={6}>
          <AuthSidebar />
        </Col>
      </Row>
    </Container>
  );
};

export default GeneralLayout;
