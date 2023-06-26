import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../store/Auth";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
const token= useSelector(state=>state.auth.token)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const loginHandler = (e) => {
    e.preventDefault();

    const loginDetails = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const login = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhgfETDmnPsAS67cOwZ1v4vIl9_86xuJ4",
          {
            method: "POST",
            body: JSON.stringify({
              ...loginDetails,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          dispatch(
            authAction.setUserId({
              userId: responseData.email.replace(/[@.]/g, ""),
            })
          );

          dispatch(authAction.setToken({ token: responseData.idToken }));

          navigate("/");
          dispatch(authAction.login());
          console.log("user login successful");
          localStorage.setItem('authToken',token );
        }
      } catch (err) {
        console.log("failed to login");
      }
    };
    login(loginDetails);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        content: "",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        backgroundColor: "#007bff",
        borderRadius: "100% 0% 0% 0%",
      }}
    >
      <Card style={{ width: "18rem", padding: "1rem" }}>
        <Form>
          <h4
            className="mb-2"
            style={{ textAlign: "center", paddingBottom: "1rem" }}
          >
            Login
          </h4>

          <FloatingLabel
            className="mb-3"
            controlId="formBasicEmail"
            label="Email address"
          >
            <Form.Control
              type="email"
              placeholder="Enter email"
              size="small"
              ref={emailRef}
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-3"
            controlId="formBasicPassword"
            label="Password"
          >
            <Form.Control
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
            />
            <div className="password-toggle" onClick={toggleShowPassword}>
              {!showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </FloatingLabel>

          <div className="text-center">
            <Button
              className="mb-2"
              variant="primary"
              type="submit"
              onClick={loginHandler}
            >
              Login
            </Button>
          </div>
        </Form>
      </Card>
      <Button
        style={{ marginTop: "1rem" }}
        variant="outline-dark"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Don't Have an account? Sign up
      </Button>
    </div>
  );
};

export default Login;
