import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccDetail(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  });
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changePasswordSubmit = (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    const { oldPassword, newPassword, reNewPassword } = formData;
    const { passwordRegex, axiosInstance, forAlert } = props;

    if (!oldPassword || !newPassword || !reNewPassword) {
      setLoadingBtn(false);
      forAlert({ type: "warning", message: "Please fill in all fields" });
      return false;
    }

    if (!passwordRegex.test(oldPassword)) {
      setLoadingBtn(false);
      forAlert({ type: "warning", message: "Please enter a valid old password" });
      return false;
    }

    if (!passwordRegex.test(newPassword)) {
      setLoadingBtn(false);
      forAlert({ type: "warning", message: "Please enter a valid new password" });
      return false;
    }

    if (newPassword !== reNewPassword) {
      setLoadingBtn(false);
      forAlert({ type: "warning", message: "Passwords do not match" });
      return false;
    }

    axiosInstance
      .post("/api/user/changePassword", formData)
      .then((response) => {
        setLoadingBtn(false);
        if (response.data.success) {
          forAlert({ type: "success", message: response.data.message });
          setTimeout(() => navigate("/user/account"), 1000);
        } else {
          forAlert({ type: "warning", message: response.data.message });
        }
      })
      .catch((error) => {
        setLoadingBtn(false);
        if (error.code === "ECONNABORTED") {
          alert(error);
          navigate("/");
        } else {
          alert(error);
          navigate("/");
        }
      });
  };

  return (
    <>
      <div className="col-12 col-md-9 mt-3 text-light">
        <h3 className="w-100 bg-dark p-3 rounded">Change</h3>
        <form
          onSubmit={changePasswordSubmit}
          method="POST"
          key="changePasswordForm"
          className="needs-validation mt-2 row"
          noValidate
        >
          <div className="col-6 mt-3">
            <label htmlFor="oldPassword" className="form-label text-light">
              Old Password
            </label>
            <input
              type="password"
              className="form-control bg-transparent text-light rounded-2 customInput"
              key="oldPassword"
              id="oldPassword"
              name="oldPassword"
              required
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </div>
          <div className="col-6 mt-3">
            <label htmlFor="newPassword" className="form-label text-light">
              New Password
            </label>
            <input
              type="password"
              className="form-control bg-transparent text-light rounded-2 customInput"
              key="newPassword"
              id="newPassword"
              name="newPassword"
              required
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="reNewPassword" className="form-label text-light">
              Re-Enter New Password
            </label>
            <input
              type="password"
              className="form-control bg-transparent text-light rounded-2 customInput"
              key="reNewPassword"
              id="reNewPassword"
              name="reNewPassword"
              required
              value={formData.reNewPassword}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 col-md-3 mt-3">
            {loadingBtn ? (
              <button type="button" className="btn btn-dark w-100" disabled>
                <div className="spinner-border bg-transparent" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button type="submit" className="btn btn-dark w-100">
                Change Password
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}