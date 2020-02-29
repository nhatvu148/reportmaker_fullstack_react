import React, { useContext, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import "../Style.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { cypher, decypher } from "./Cypher";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const myCypher = cypher("myscrets");
  const myDecypher = decypher("myscrets");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const getCookie = name => {
    const re = new RegExp(name + "=([^;]+)");
    const value = re.exec(document.cookie);

    return value != null ? myDecypher(unescape(value[1])) : null;
  };

  const onFinish = values => {
    // console.log("Received values of form: ", values);

    if (values.remember === true) {
      const today = new Date();
      const expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days

      const setCookie = (name, value) => {
        document.cookie =
          name +
          "=" +
          escape(value) +
          "; path=/; expires=" +
          expiry.toGMTString();
      };

      setCookie("gaz9me37", myCypher(values.username));
      setCookie("tu01dfr43", myCypher(values.password));
    }

    if (values.remember === false) {
      const today = new Date();
      const expired = new Date(today.getTime() - 24 * 3600 * 1000); // less 24 hours

      const deleteCookie = name => {
        document.cookie =
          name + "=null; path=/; expires=" + expired.toGMTString();
      };
      deleteCookie("gaz9me37");
      deleteCookie("tu01dfr43");
    }

    login({
      name: values.username,
      password: values.password
    });
  };

  const firstKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  return (
    <Row>
      <Col xs={0} sm={0} md={8} lg={16}>
        <img
          alt="/"
          width="100%"
          height={document.body.clientHeight}
          style={{ zIndex: "-1" }}
          src="https://i.insider.com/5d26280921a86107bb51bd92?width=1067&format=jpeg"
        />
      </Col>
      <Col
        xs={24}
        sm={24}
        md={16}
        lg={8}
        style={{ height: "730px", textAlign: "center" }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            username: getCookie("gaz9me37"),
            password: getCookie("tu01dfr43"),
            remember: true
          }}
          onFinish={onFinish}
          style={{
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <h1 style={{ textAlign: "center" }}>Report Maker</h1>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              ref={usernameRef}
              onKeyDown={firstKeyDown}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input
              ref={passwordRef}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="https://www.google.com/">
              Forgot password
            </a>
          </Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
