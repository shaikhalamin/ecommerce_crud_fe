import { useState } from "react";
import { Form, Row, Col, Card, Nav, Navbar } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInFormFields, signInSchema } from "./helpers";
import GeneralLayout from "../layouts/GeneralLayout";
import SubmitButton from "../common/form/SubmitButton";
import { getErrorMessage } from "../utils/auth-lib";
import CompanyLogo from "../common/icons/CompanyLogo";
import { login } from "../../api/services/auth";
import { TokenUser } from "../../api/model/token-user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: yupResolver(signInSchema),
    mode: "onTouched",
  });

  const errorMessage = getErrorMessage(errors);

  const onSubmit = async (data: SignInFormFields) => {
    try {
      setSubmitLoading(true);
      const result = await login(data);
      const tokenUser = result.data as TokenUser;
      localStorage.setItem("session", JSON.stringify(tokenUser));
      setSubmitLoading(false);
      navigate(`/dashboard`);
    } catch (error) {
      setSubmitLoading(false);
      console.log("login error", error);
    }
  };

  return (
    <GeneralLayout>
      <Navbar bg="light">
        <Navbar.Brand
          href="/"
          className="text-white"
          style={{ marginLeft: "20px" }}
        >
          <CompanyLogo />
        </Navbar.Brand>
        <Nav className="me-auto"></Nav>
      </Navbar>

      <Row className="py-5 mt-5 mb-5">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="border-0">
            <Card.Body className="rounded-0">
              <Row>
                <Col md="12">
                  <h3 className="text-center ft-32 fw-700 mt-3 mb-4">
                    Login to your account{" "}
                  </h3>
                </Col>
              </Row>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="email">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="email"
                      {...register("email")}
                      placeholder="Email"
                    />
                    {errorMessage("email") && (
                      <Form.Text className="text-danger">
                        {errorMessage("email")}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="password">
                    <Form.Label></Form.Label>
                    <Form.Control
                      type="password"
                      {...register("password")}
                      placeholder="Password"
                    />
                    {errorMessage("password") && (
                      <Form.Text className="text-danger">
                        {errorMessage("password")}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Row>

                <Row className="py-3">
                  <Col md="12" className="">
                    <SubmitButton
                      title="Sign in with email"
                      variant="info"
                      isLoading={submitLoading}
                      loadingTitle="Signin..."
                      buttonCls="w-100 mt-3 border-0 py-2 bg-login text-white"
                    />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </GeneralLayout>
  );
};

export default Login;
