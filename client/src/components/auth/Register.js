import React, { useRef, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import "antd/dist/antd.css";
import "../Style.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Tooltip, Card } from "antd";

const Register = props => {
  const authContext = useContext(AuthContext);

  const { register, isAuthenticated } = authContext;

  const [form] = Form.useForm();

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const onFinish = ({ name, email, password }) => {
    register({
      name,
      email,
      password
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    }
  };

  return (
    <Card
      style={{
        margin: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderColor: "#1890ff",
        borderWidth: "1.5px",
        padding: "40px 20px",
        textAlign: "center",
        width: "500px"
      }}
      bordered={true}
    >
      <div className="logo">
        <h2>
          <a
            href="http://www.e-technostar.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="/"
              width={160}
              src="http://www.e-technostar.com/beta2016/wp-content/uploads/2019/04/technostar_logo_w210.png"
            />
          </a>
        </h2>
      </div>
      <h1
        style={{
          color: "#1890ff",
          marginBottom: "50px"
        }}
      >
        Account Register
      </h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What is your username in Create Weekly Review?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input ref={usernameRef} />
        </Form.Item>
        <Form.Item
          label={
            <span>
              Email&nbsp;
              <Tooltip title="What is your TechnoStar's email?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your TechnoStar's email!"
            },
            {
              type: "email",
              message: "The input is not a valid E-mail!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your password!"
            },
            {
              min: 6,
              message: "Please enter a password with 6 or more characters"
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Register
        </Button>
      </Form>
    </Card>
  );
};

export default Register;
