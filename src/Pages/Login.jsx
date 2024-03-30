import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "../scss/styles.scss";
import { useContext, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { LoginContext } from "../Shared/LoginContext";

function Login() {
  const { updateLoginStatus } = useContext(LoginContext);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(null);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (isLogin) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAlert = (variant, message) => {
    setAlertData({ variant, message });
  };

  const handleChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData) {
      if (userData.username === loginData.username && userData.password === loginData.password) {
        showAlert("success", "login success full");
        updateLoginStatus(true);
        localStorage.setItem("isLogin", true);
        navigate("/home");
      } else {
        showAlert("danger", "Invalid username or password");
        updateLoginStatus(false);
      }
    } else {
      showAlert("warning", "User not found");
      updateLoginStatus(false);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        {alertData && (
          <Alert variant={alertData.variant} onClose={() => setAlertData(null)} dismissible>
            {alertData.message}
          </Alert>
        )}
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="User Name"
              value={loginData.username}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Form.Group>
          <div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
          <div className="link-text-container">
            <Link className="link-text" to="/auth/registration">
              Does not have an account ?, <span className="link-text-withColor">please register</span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
