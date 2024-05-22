import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    props.axiosInstance
      .post("/api/user/logout")
      .then((response) => {
        const { loginStatus, forAlert } = props;
        loginStatus(false);
        forAlert({ type: "success", message: response.data.message });
        navigate(response.data.navigate);
      })
      .catch((error) => {
        const { loginStatus } = props;
        loginStatus(false);
        alert(error);
        navigate("/");
      });
  }, [props, navigate]);

  return null; // No need for an empty div
}
