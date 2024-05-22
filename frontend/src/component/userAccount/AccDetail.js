import "./style.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AccDetail(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    editEmail: true,
    loadingBtn: 0,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const changeEditEmail = () => {
    setFormData((prevData) => ({
      ...prevData,
      editEmail: !prevData.editEmail,
    }));
  };

  const updateAccSubmit = async (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      loadingBtn: 1,
    }));

    try {
      const { firstName, lastName, email } = formData;
      if (!email || !props.emailRegex.test(email)) {
        throw new Error("Please enter a valid email.");
      }

      const response = await props.axiosInstance.post("/api/user/updateAccount", {
        email,
        firstName,
        lastName,
      });

      if (response.data.success) {
        props.forAlert({ type: "success", message: response.data.message });
        setTimeout(() => navigate(response.data.navigate), 1000);
      } else {
        props.forAlert({ type: "warning", message: response.data.message });
      }
    } catch (error) {
      props.forAlert({ type: "warning", message: error.message });
    } finally {
      setFormData((prevData) => ({
        ...prevData,
        loadingBtn: 0,
      }));
    }
  };

  useEffect(() => {
    async function fetchAccDetail() {
      try {
        const response = await props.axiosInstance.post("/api/user/fetchAccDetail");
        if (response.data.success) {
          const { dripster_user_email, dripster_user_firstName, dripster_user_lastName } = response.data.accDetail[0];
          setFormData((prevData) => ({
            ...prevData,
            email: dripster_user_email,
            firstName: dripster_user_firstName,
            lastName: dripster_user_lastName,
          }));
        } else {
          props.forAlert({ type: "warning", message: "Unable To Fetch Data" });
        }
      } catch (error) {
        props.forAlert({ type: "warning", message: error.message });
        navigate("/");
      }
    }
    fetchAccDetail();
  }, [props, navigate]);

  return (
    <>
      <div className="col-12 col-md-9 mt-3 text-light">
        <h3 className="w-100 bg-dark p-3 rounded">Account Detail</h3>
        <form
          onSubmit={updateAccSubmit}
          className="needs-validation mt-2 row"
          noValidate
        >
          <div className="col-6 mt-3">
            <label htmlFor="accFirstName" className="form-label text-light">
              First Name
            </label>
            <input
              type="text"
              className="form-control bg-transparent text-light rounded-2 customInput"
              id="accFirstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={onChange}
            />
          </div>
          <div className="col-6 mt-3">
            <label htmlFor="accLastName" className="form-label text-light">
              Last Name
            </label>
            <input
              type="text"
              className="form-control bg-transparent text-light rounded-2 customInput"
              id="accLastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={onChange}
            />
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="accEmail" className="form-label text-light">
              Email
            </label>
            <div className="input-group">
              <input
                type="email"
                className="form-control text-light rounded-start-2 customInput"
                id="accEmail"
                name="email"
                required
                value={formData.email}
                onChange={onChange}
                style={{
                  backgroundColor: formData.editEmail ? "rgba(0,0,0,0.7)" : "transparent",
                }}
                disabled={formData.editEmail}
              />
              <button
                className="input-group-text text-light border-0 border-end border-top border-bottom rounded-end-2"
                style={{
                  backgroundColor: formData.editEmail ? "rgba(0,0,0,0.7)" : "transparent",
                }}
                onClick={changeEditEmail}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil"
                  viewBox="0 0 16 16"
                  style={{
                    backgroundColor: formData.editEmail ? "rgba(0,0,0,0.7)" : "transparent",
                  }}
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="col-12 col-md-3 mt-3">
            {formData.loadingBtn ? (
              <button type="button" className="btn btn-dark w-100" disabled>
                <div className="spinner-border bg-transparent" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button type="submit" className="btn btn-dark w-100">
                Update Account
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}