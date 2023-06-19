import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const comfirmPasswordRef = useRef();
const navigate = useNavigate()
  const signupHandler = (e) => {
    e.preventDefault();

    if (passwordRef.current.value === comfirmPasswordRef.current.value) {
      const signDetails = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const signup = async (signDetails) => {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhgfETDmnPsAS67cOwZ1v4vIl9_86xuJ4",
            {
              method: "POST",
              body: JSON.stringify({
                ...signDetails,
                returnSecureToken: true,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response.ok) {
            console.log("user signup successful");
            navigate('/login')
          }
        } catch (err) {
          console.log("failed to signup");
        }
      };
      signup(signDetails);
    }else{
     alert('password does not match confirm password');
    }
    emailRef.current.value=''
    passwordRef.current.value=''
    comfirmPasswordRef.current.value=''
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
            SignUp
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
              required
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-3"
            controlId="formBasicPassword"
            label="Password"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-4"
            controlId="formBasicConfirmPassword"
            label="Confirm Password"
          >
            <Form.Control
              type="password"
              placeholder="Confirm password"
              ref={comfirmPasswordRef}
              required
            />
          </FloatingLabel>

          <div className="text-center">
            <Button
              className="mb-2"
              variant="primary"
              type="submit"
              onClick={signupHandler}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </Card>
      <Button style={{ marginTop: "1rem" }} variant="outline-dark" onClick={()=>{navigate('/login')}}>
        Have an account? Login
      </Button>
    </div>
  );
};

export default SignUp;
