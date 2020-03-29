import React, {
  Fragment,
  useState,
  useRef,
  useContext,
  useEffect
} from "react";
import AuthContext from "../../context/auth/authContext";
import "antd/dist/antd.css";
import "../Style.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Tooltip, Card, message, Spin } from "antd";

const ResetPassword = props => {
  const authContext = useContext(AuthContext);

  const {
    updatePassword,
    resetRequest,
    msg,
    error,
    loading,
    isAuthenticated
  } = authContext;

  const [form] = Form.useForm();

  const passwordRef = useRef(null);

  useEffect(() => {
    resetRequest(props.match.params.resetToken);
  }, []);

  useEffect(() => {
    if (passwordRef.current) passwordRef.current.focus();
  }, [loading]);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const onFinish = ({ newpassword }) => {
    updatePassword({ email: msg, password: newpassword });
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
        width: "600px"
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

      {error === "Invalid token" ? (
        <Fragment>
          <h2
            style={{
              color: "red",
              marginBottom: "50px"
            }}
          >
            Validation code expired. Please try again later!
          </h2>
          <Button
            size="large"
            type="primary"
            className="login-form-button"
            onClick={() => props.history.push("/login")}
          >
            Return to Login
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <h1
            style={{
              color: "#1890ff",
              marginBottom: "50px"
            }}
          >
            Reset Password
          </h1>
          <Form
            {...formItemLayout}
            form={form}
            name="reset-password"
            className="login-form"
            onFinish={onFinish}
          >
            <Form.Item
              label="New Password"
              name="newpassword"
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
              <Input.Password ref={passwordRef} />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirm"
              dependencies={["newpassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("newpassword") === value) {
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
              Reset Password
            </Button>
          </Form>
        </Fragment>
      )}
    </Card>
  );
};

export default ResetPassword;
