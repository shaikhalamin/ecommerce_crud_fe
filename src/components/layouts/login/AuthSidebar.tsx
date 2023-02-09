import React from "react";
import { Row, Col } from "react-bootstrap";
import Banner from "./Banner";

const AuthSidebar = () => {
  return (
    <Row style={{ backgroundColor: "#0CAF60" }} className="min-vh-100">
      <Col className="py-5 mt-5">
        <Row className="">
          <Col md={{ span: 8, offset: 2 }} sm={12} xs={12}>
            <Banner />
            <h1 className="mt-5 mb-5 text-center fw-700 ft-40 text-white">
              The easiest way to build your own eCommerce
            </h1>
            <p className="mt-3 text-center fw-500 ft-18 text-white">
              Create an ecommerce website backed by powerful tools that help you
              find customers, drive sales, and manage your day-to-day.
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AuthSidebar;
