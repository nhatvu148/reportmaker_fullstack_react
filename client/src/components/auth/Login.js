import React, { useContext, useEffect } from "react";
import "antd/dist/antd.css";
import "../Style.css";
import { Form, Icon, Input, Button, Checkbox } from "antd";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const LoginForm = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

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
    return value != null ? unescape(value[1]) : null;
  };

  const onSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

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
          setCookie("gaz9me37", values.username);
          setCookie("tu01dfr43", values.password);
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
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <Form
      onSubmit={onSubmit}
      className="login-form"
      style={{
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <h1 style={{ textAlign: "center" }}>Please Login</h1>
      <Form.Item>
        {getFieldDecorator("username", {
          initialValue: getCookie("gaz9me37"),
          rules: [{ required: true, message: "Please input your username!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          initialValue: getCookie("tu01dfr43"),
          rules: [{ required: true, message: "Please input your password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("remember", {
          valuePropName: "checked",
          initialValue: true
        })(<Checkbox>Remember me</Checkbox>)}
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

const Login = Form.create({ name: "normal_login" })(LoginForm);

export default Login;
