import React, { useState, useRef, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import "antd/dist/antd.css";
import "../Style.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Tooltip, Card, message, Spin } from "antd";

const ForgotPassword = props => {
  const authContext = useContext(AuthContext);

  const {
    forgotPassword,
    error,
    clearErrors,
    loading,
    msg,
    clearMsg
  } = authContext;

  const [form] = Form.useForm();

  const emailRef = useRef(null);

  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, [loading]);

  useEffect(() => {
    if (error === "There is no user with that email") {
      message.error("There is no user with that email");
      clearErrors();
      clearMsg();
      setInfo(null);
    }

    if (msg === "Email sent") {
      message.success("Email sent");
      clearMsg();
      setInfo(
        `An email with a password reset link has been sent to your mailbox! Please check it!`
      );
    }

    // eslint-disable-next-line
  }, [info, msg, error, props.history]);

  const onFinish = ({ email }) => {
    forgotPassword({
      email
    });
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
        Account Recovery
      </h1>
      {loading ? (
        <Spin />
      ) : (
        <Form
          form={form}
          name="reset-password"
          className="login-form"
          onFinish={onFinish}
        >
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
            <Input ref={emailRef} />
          </Form.Item>
          {info !== null && loading === false && <p>{info}</p>}
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Send Password Reset Email
          </Button>
        </Form>
      )}
    </Card>
  );
};

export default ForgotPassword;
