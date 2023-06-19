import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
 const [token, setToken] = useState(null)
const navigate = useNavigate()
  const loginHandler = (e) => {
    e.preventDefault();

    const loginDetails = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }
    
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
            const data = await response.json();
            setToken(data.idToken)
            localStorage.setItem("token", data.idToken)
            localStorage.setItem('email', data.email)
            console.log("user login successful");
            navigate('/')
           
          }
        } catch (err) {
          console.log("failed to login");
        }
      

    }
    login(loginDetails);
    emailRef.current.value=''
    passwordRef.current.value=''
   console.log(token)
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
      <Button style={{ marginTop: "1rem" }} variant="outline-dark" onClick={()=>{navigate('/signup')}}>
       Don't Have an account? Sign up
      </Button>
    </div>
  );
};

export default Login;
