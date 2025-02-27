import { Button, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import BForm from "../components/form/BForm";
import BInput from "../components/form/BInput";



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in successfully", { id: toastId, duration: 2500 });
      navigate(`/${user.role}/home`);
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
          <BInput type="text" name="email" label="Email" />
          <BInput type="text" name="password" label="Password" />
          <p style={{ marginBottom: "20px" }}>
            Do not have an account! Please{" "}
            <Link to={"/register"}>
              <span style={{ color: "#0B7C6B", fontWeight: "bold" }}>
                Register
              </span>
            </Link>
          </p>
          <Button htmlType="submit">Submit</Button>
        </BForm>
      </Row>
    </div>
  );
};

export default Login;
