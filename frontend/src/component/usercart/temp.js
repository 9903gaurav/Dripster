import "./style.css";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function UserCart(props) {
  const navigate = useNavigate();

  const [cart, setCartProduct] = useState([]);
  const [status, setStatus] = useState(0);
  const [loadingScreen, setLoadingScreen] = useState(0);

  const [couponCode, setCouponCode] = useState("");

  const [loadingApplyCoupon, setLoadingApplyCoupon] = useState(0);
  const [loadingRemoveCoupon, setLoadingRemoveCoupon] = useState(0);

  const [checkoutLoading, setCheckoutLoading] = useState(0);

  useEffect(() => {
    props.axiosInstance
      .post("/api/cart/fetchCart")
      .then((response) => {
        if (response.data.success) {
          setStatus(1);
          setCartProduct(response.data.cart);
          if (response.data.cart[0].couponCode !== "No Code Applied") {
            setCouponCode(response.data.cart[0].couponCode);
          }
        } else {
        }
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          console.log(error);
          props.forAlert({ type: "danger", message: "Connection Timeout" });
          return false;
        } else {
          props.forAlert({ type: "danger", message: error.message });
          return false;
        }
      });
  }, [props]);

  const deleteProd = (cart_item_id) => {
    setLoadingScreen(1);
    props.axiosInstance
      .post("/api/cart/deleteProduct", { cart_item_id: cart_item_id })
      .then((response) => {
        if (response.data.success) {
          setLoadingScreen(0);
          props.forAlert({ type: "success", message: response.data.message });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setLoadingScreen(0);
          props.forAlert({ type: "warning", message: response.data.message });
        }
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          setLoadingScreen(0);
          console.log(error);
          props.forAlert({ type: "danger", message: "Connection Timeout" });
          return false;
        } else {
          setLoadingScreen(0);
          props.forAlert({ type: "danger", message: error.message });
          return false;
        }
      });
  };

  const updateQty = (e, index) => {
    setLoadingScreen(1);
    let newState = [...cart];
    newState[index].qty = e.target.value;
    setCartProduct(newState);
    props.axiosInstance
      .post("/api/cart/updateCartQty", {
        qty: e.target.value,
        cart_item_id: cart[index].cart_item_id,
      })
      .then((response) => {
        if (response.data.success) {
          setLoadingScreen(0);
          props.forAlert({ type: "success", message: response.data.message });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          setLoadingScreen(0);
          props.forAlert({ type: "warning", message: response.data.message });
        }
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          setLoadingScreen(0);
          console.log(error);
          props.forAlert({ type: "danger", message: "Connection Timeout" });
          return false;
        } else {
          setLoadingScreen(0);
          props.forAlert({ type: "danger", message: error.message });
          return false;
        }
      });
  };

  const couponSubmit = (e) => {
    setLoadingApplyCoupon(1);
    e.preventDefault();
    if (couponCode !== "") {
      props.axiosInstance
        .post("/api/cart/applyCoupon", {
          couponCode: couponCode,
        })
        .then((response) => {
          if (response.data.success) {
            setLoadingApplyCoupon(0);
            props.forAlert({ type: "success", message: response.data.message });
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            setLoadingApplyCoupon(0);
            props.forAlert({ type: "warning", message: response.data.message });
          }
        })
        .catch((error) => {
          if (error.code === "ECONNABORTED") {
            setLoadingApplyCoupon(0);
            console.log(error);
            props.forAlert({ type: "danger", message: "Connection Timeout" });
            return false;
          } else {
            setLoadingApplyCoupon(0);
            props.forAlert({ type: "danger", message: error.message });
            return false;
          }
        });
    } else {
      setLoadingApplyCoupon(0);
      props.forAlert({ type: "warning", message: "Please Enter Code" });
      return false;
    }
  };

  const couponRemove = (e) => {
    setLoadingRemoveCoupon(1);
    e.preventDefault();
    props.axiosInstance
      .post("/api/cart/removeCoupon")
      .then((response) => {
        if (response.data.success) {
          setLoadingRemoveCoupon(0);
          props.forAlert({ type: "success", message: response.data.message });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          setLoadingRemoveCoupon(0);
          props.forAlert({ type: "warning", message: response.data.message });
        }
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          setLoadingRemoveCoupon(0);
          console.log(error);
          props.forAlert({ type: "danger", message: "Connection Timeout" });
          return false;
        } else {
          setLoadingRemoveCoupon(0);
          props.forAlert({ type: "danger", message: error.message });
          return false;
        }
      });
  };

  const onChangeCoupon = (e) => {
    setCouponCode(e.target.value);
  };

  const userCheckout = () => {
    setCheckoutLoading(1);
    if (cart.length > 0) {
    } else {
      props.forAlert({
        type: "warning",
        message: "Add Items in Cart To Checkout",
      });
      setCheckoutLoading(0);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="mt-3 col-12 col-md-4 order-md-last">
            {(cart[0]?.couponCode === "No Code Applied" && (
              <form
                onSubmit={couponSubmit}
                method="POST"
                key="couponForm"
                className="needs-validation mt-2"
                noValidate
              >
                <div className="input-group border-bottom mb-3">
                  <input
                    type="text"
                    className="form-control bg-transparent border-0 text-light customInput"
                    placeholder="Enter Coupon Code"
                    aria-describedby="couponCodeLabel"
                    value={couponCode}
                    onChange={onChangeCoupon}
                  />
                  {(loadingApplyCoupon && (
                    <button
                      type="button"
                      className="input-group-text btn bg-transparent border-0 text-light"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                  )) || (
                    <button
                      type="submit"
                      className="bg-transparent border-0 text-light input-group-text btn"
                      id="couponCodeLabel"
                    >
                      Apply Code
                    </button>
                  )}
                </div>
              </form>
            )) || (
              <form
                onSubmit={couponRemove}
                method="POST"
                key="couponForm"
                className="needs-validation mt-2"
                noValidate
              >
                <div className="input-group border-bottom mb-3">
                  <input
                    type="text"
                    className="form-control bg-transparent border-0 text-light customInput"
                    placeholder="Enter Coupon Code"
                    aria-describedby="couponCodeLabel"
                    value={cart[0]?.couponCode}
                    disabled
                  />
                  {(loadingRemoveCoupon && (
                    <button
                      type="button"
                      className="input-group-text btn bg-transparent border-0 text-light"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                  )) || (
                    <button
                      type="submit"
                      className="bg-transparent border-0 text-light input-group-text btn"
                      id="couponCodeLabel"
                    >
                      Remove Code
                    </button>
                  )}
                </div>
              </form>
            )}
            <table className="table table-dark table-borderless">
              <tbody>
                <tr>
                  <th scope="row">Subtotal:</th>
                  <td className="text-end">
                    ₹{" "}
                    {status &&
                      Number(
                        Math.round(
                          parseFloat(cart[0].subtotal_cart_value + "e" + 2)
                        ) +
                          "e-" +
                          2
                      ).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th scope="row" style={{ cursor: "pointer" }}>
                    Discount:
                  </th>
                  <td className="text-end">
                    ₹{" "}
                    {status &&
                      Number(
                        Math.round(
                          parseFloat(cart[0].discountAmount + "e" + 2)
                        ) +
                          "e-" +
                          2
                      ).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Total:</th>
                  <td className="text-end">
                    ₹{" "}
                    {status &&
                      Number(
                        Math.round(
                          parseFloat(cart[0].subtotal_minus_discount + "e" + 2)
                        ) +
                          "e-" +
                          2
                      ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="btn w-100 mt-2 btn-dark" onClick={userCheckout}>
              {(checkoutLoading && (
                <span
                  className="spinner-border spinner-border-sm text-light bg-transparent"
                  role="status"
                  aria-hidden="true"
                ></span>
              )) ||
                "Checkout"}
            </button>
            <NavLink to={"/"} className="btn w-100 mt-3 btn-outline-light">
              Continue Shopping
            </NavLink>
          </div>
          <div className="col-12 col-md-8 mt-3">
            <div className="row">
              {cart?.map((item, value) => {
                return (
                  <div className="col-12 m-2 p-2">
                    <div className="container">
                      <div className="row w-100">
                        <div className="col-2 col-md-1">
                          <img
                            className="w-100"
                            src={`${props.homeUrl}${item.dripster_product_mainImg}`}
                            alt=""
                          />
                        </div>
                        <div className="col-9">
                          <div className="row w-100">
                            <div className="col-12">
                              <p className="m-0 p-0 text-light">
                                {item.dripster_product_title}
                              </p>
                              <p className="m-0 p-0 text-light">{`Size: ${item.dripster_product_config_size}`}</p>
                            </div>
                            <div className="col-12">
                              <div className="row w-100">
                                <div className="col-6">
                                  <div className="input-group bg-transparent border-0">
                                    <label
                                      className="input-group-text m-0 p-0 bg-transparent border-0 text-light"
                                      htmlFor="inputGroupSelect01"
                                    >
                                      Qty
                                    </label>
                                    <select
                                      className="form-select bg-transparent m-0 p-0 text-center text-light border-0 customInput"
                                      id="inputGroupSelect01"
                                      value={item.qty}
                                      onChange={(e) => {
                                        updateQty(e, value);
                                      }}
                                    >
                                      {[
                                        [...Array(item.qty_display)].map(
                                          (_, index) => (
                                            <option
                                              key={index + 1}
                                              value={index + 1}
                                            >
                                              {index + 1}
                                            </option>
                                          )
                                        ),
                                      ]}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <p className="m-0 p-0 text-light">{`₹ ${item.total_product_value} (${item.currPrice} * ${item.qty})`}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-1 text-light">
                          <button
                            className="btn text-light border-0 bg-transparent"
                            onClick={() => {
                              deleteProd(item.cart_item_id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash bg-transparent tet-light"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {loadingScreen && (
        <div
          className="container fixed-top min-vw-100 min-vh-100"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="row bg-transparent min-vw-100 min-vh-100 justify-content-center ">
            <div
              className="spinner-border bg-transparent text-light position-absolute top-50 left-50"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
