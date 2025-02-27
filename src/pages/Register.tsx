import { Button, Row } from "antd";
import { Link } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import BForm from "../components/form/BForm";
import BInput from "../components/form/BInput";

const Register = () => {
  const [register] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Processing...");
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      await register(userInfo);

      toast.success("User registered successfully", {
        id: toastId,
        duration: 2500,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2500 });
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      
      <Link to={"/"}>
        <Button
          type="default"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 10,
          }}
        >
          Go back to Home
        </Button>
      </Link>

      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <BForm onSubmit={onSubmit}>
          <BInput type="text" name="name" label="Name" />
          <BInput type="text" name="email" label="Email" />
          <BInput type="text" name="password" label="Password" />
          <p style={{ marginBottom: "20px" }}>
            Already have an account! Please{" "}
            <Link to={"/login"}>
              <span style={{ color: "#0B7C6B", fontWeight: "bold" }}>Login</span>
            </Link>
          </p>
          <Button htmlType="submit">Submit</Button>
        </BForm>
      </Row>
    </div>
  );
};

export default Register;
