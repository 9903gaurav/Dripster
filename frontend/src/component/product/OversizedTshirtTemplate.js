import React, { useEffect, useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";

export default function TheGreatOutdoor(props) {
  const [prodData, setProdData] = useState(null);
  const [productDetail, setProductDetail] = useState({});
  const [showPrice, setShowPrice] = useState(0);
  const [selectSize, selectedSize] = useState(null);
  const [showAccordions, setShowAccordions] = useState([false, false, false]);
  const [prodImg, setProdImg] = useState([]);
  const [activeImgNumber, setActiveImgNumber] = useState(0);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    props.axiosInstance
      .post("/api/product/fetchProduct", { productId: props.productId })
      .then((response) => {
        if (response.data.success) {
          setProdData(true);
          const configData = JSON.parse(
            response.data.productData.dripster_product_config
          );
          const prod_temp = configData.map((item) => ({
            id: item.dripster_product_config_id,
            size: item.dripster_product_config_size,
            currPrice: item.dripster_product_config_currPrice,
            MRP: item.dripster_product_config_mrp,
            qty: item.dripster_product_config_qty,
          }));
          setProductDetail({
            dripster_product_id: response.data.productData.dripster_product_id,
            dripster_product_title:
              response.data.productData.dripster_product_title,
            dripster_product_otherImg:
              response.data.productData.dripster_product_otherImg,
            minimum_product_price:
              response.data.productData.minimum_product_price,
            dripster_product_config: prod_temp,
          });
          setShowPrice(response.data.productData.minimum_product_price);
          setProdImg([
            response.data.productData.dripster_product_mainImg,
            ...response.data.productData.dripster_product_otherImg
              .split(",")
              .map((item) => item.replace('"', "")),
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props]);

  const changeActiveImage = (data) =>
    setActiveImgNumber(
      (prev) => (prev + data + prodImg.length) % prodImg.length
    );
  const showAccord = (index) =>
    setShowAccordions((prev) =>
      prev.map((val, i) => (i === index ? !val : false))
    );
  const changeSelectedSize = (e) => {
    selectedSize(e.target.value);
    productDetail.dripster_product_config.forEach((item) => {
      if (item.size === e.target.value) {
        setShowPrice(item.currPrice);
      }
    });
  };

  const addToCart = (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    props.axiosInstance
      .post("/api/cart/addToCart", {
        productId: props.productId,
        productSize: selectSize,
      })
      .then((response) => {
        setLoadingBtn(false);
        props.forAlert({
          type: response.data.success ? "success" : "warning",
          message: response.data.message,
        });
      })
      .catch((error) => {
        setLoadingBtn(false);
        props.forAlert({
          type: "danger",
          message:
            error.code === "ECONNABORTED"
              ? "Connection Timeout"
              : error.message,
        });
      });
  };

  return prodData ? (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="row m-0 p-0 w-100">
              <div className="col-2 text-light align-self-center text-center">
                <button
                  className="btn bg-transparent text-light"
                  onClick={() => changeActiveImage(-1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="col-8 bg-transparent d-flex justify-content-center">
                <div className="row w-100 justify-content-center bg-transparent">
                  <div className="col-12 col-md-10 d-flex justify-content-center bg-transparent">
                    <img
                      className="w-100 bg-transparent"
                      src={`${props.homeUrl}/${prodImg[activeImgNumber]}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-2 text-light align-self-center text-center">
                <button
                  className="btn bg-transparent text-light"
                  onClick={() => changeActiveImage(+1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="row m-0 p-0 w-100 d-flex justify-content-center">
              {prodImg.map((item, index) => (
                <div key={index} className="col-1 m-3 p-2 bg-transparent">
                  <img
                    className="bg-transparent"
                    src={`http://192.168.29.19:3000/${item}`}
                    style={{ width: "40px" }}
                    alt=""
                    onClick={() => setActiveImgNumber(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-6 mt-1">
            <div className="row">
              <p className="text-light-emphasis">
                <NavLink
                  className="btn border-0 m-0 p-0 text-decoration-none text-light-emphasis"
                  to="/"
                >
                  Home
                </NavLink>{" "}
                / Product / {productDetail.dripster_product_title}
              </p>
              <h1 className="text-light">
                {productDetail.dripster_product_title}
              </h1>
              <h4 className="text-light">
                ₹{" "}
                {Number(
                  Math.round(parseFloat(showPrice + "e" + 2)) + "e-" + 2
                ).toFixed(2)}
              </h4>
              <form
                onSubmit={addToCart}
                className="mt-3 needs-validation"
                noValidate
              >
                <h5 className="text-light m-2">Size</h5>
                <div>
                  {(productDetail.dripster_product_config || []).map((item) => (
                    <React.Fragment key={item.size}>
                      <input
                        type="radio"
                        className="btn-check"
                        id={item.size}
                        value={item.size}
                        autoComplete="off"
                        name="product_size"
                        onChange={changeSelectedSize}
                      />
                      <label
                        className="btn btn-outline-light m-2"
                        htmlFor={item.size}
                      >
                        {item.size}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
                <p
                  className="btn btn-transparent border-0 text-light m-2"
                  style={{ fontSize: "12px" }}
                  onClick={() => setShowSizeModal(true)}
                >
                  Need Help! View Size Chart
                </p>
                {(props.loginStatus &&
                  (loadingBtn ? (
                    <button
                      type="button"
                      className="btn btn-dark w-100"
                      disabled
                    >
                      <div
                        className="spinner-border bg-transparent"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </button>
                  ) : (
                    <button type="submit" className="mt-3 btn btn-dark w-100">
                      Add To Cart
                    </button>
                  ))) || (
                  <NavLink to="/login" className="mt-3 btn btn-dark w-100">
                    Login To Buy
                  </NavLink>
                )}
              </form>
            </div>
          </div>
          <div className="col-12 mt-5 pt-3 bg-transparent">
            <div className="container">
              <div className="row">
                <div className="col-12 border-bottom border-top mb-3 pb-3">
                  <h3 className="text-light btn border-0 bg-transparent w-100 m-0 p-0 mt-3 text-start">
                    <strong>Product Description </strong>
                  </h3>
                  <p className="text-light mt-2 pt-2">
                    Our Oversized T-Shirt is the ideal addition to your
                    streetwear wardrobe. This premium garment is made with the
                    finest care and attention to detail and is intended to
                    provide comfort, style, and durability.{" "}
                  </p>
                  <ul className={`text-light mt-2 pt-2 `}>
                    <li className="m-2">Heavyweight 100% Combed Cotton</li>
                    <li className="m-2">Soft and Luxurious Feel</li>
                    <li className="m-2">Pre-Shrunk, Bio-Washed Fabric</li>
                    <li className="m-2">No Harsh Reaction To Skin</li>
                  </ul>
                </div>
                <div className="col-12 border-bottom mb-3 pb-3">
                  <h3
                    className="text-light btn border-0 bg-transparent w-100 m-0 p-0 text-start"
                    onClick={() => {
                      showAccord(0);
                    }}
                  >
                    <strong>Wash Care Instruction</strong>
                    <span style={{ float: "right" }}>
                      {(showAccordions[0] && "-") || "+"}
                    </span>
                  </h3>
                  <div className={`accord ${showAccordions[0] && "expanded"}`}>
                    <p className={`text-light mt-2 pt-2 `}>
                      Following these care instructions will help prolong the
                      life and appearance of your oversized t-shirt, ensuring
                      you can enjoy its comfort and style for a long time.{" "}
                    </p>
                    <ul className={`text-light mt-2 pt-2 `}>
                      <li className="m-2">
                        <strong>Reverse Wash Only</strong>: Turn inside out
                        before washing.
                      </li>
                      <li className="m-2">
                        <strong>Avoid Wrinkles</strong>: Fold neatly for storage
                        and wear.
                      </li>
                      <li className="m-2">
                        <strong>Protect the Print</strong>: Do not iron directly
                        on the print; use a cloth.
                      </li>
                      <li className="m-2">
                        <strong>No Bleach</strong>: Avoid harsh chemicals like
                        bleach.
                      </li>
                      <li className="m-2">
                        <strong>No Tumble Dry</strong>: Air-dry to prevent
                        shrinkage.
                      </li>
                      <li className="m-2">
                        <strong>Cold Machine Wash</strong>: Use a gentle cycle
                        with cold water for cleaning.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-12 border-bottom mb-3 pb-3">
                  <h3
                    className="text-light btn border-0 bg-transparent w-100 m-0 p-0 text-start"
                    onClick={() => {
                      showAccord(1);
                    }}
                  >
                    <strong>Delivery Information</strong>
                    <span style={{ float: "right" }}>
                      {(showAccordions[1] && "-") || "+"}
                    </span>
                  </h3>
                  <div className={`accord ${showAccordions[1] && "expanded"}`}>
                    <p className={`text-light mt-2 pt-2 `}>
                      Enjoy fast and reliable delivery with our streetwear
                      brand. Your order will be shipped within 48 hours of
                      purchase.
                    </p>
                    <ul className={`text-light mt-2 pt-2 `}>
                      <li className="m-2">
                        If you're in a metro city, expect your product to arrive
                        within 4-5 days
                      </li>
                      <li className="m-2">
                        For other cities, delivery typically takes 4-10 days.
                        Get ready to receive your stylish new items in no time!
                      </li>
                    </ul>{" "}
                  </div>
                </div>
                <div className="col-12 mb-3 pb-3 border-bottom">
                  <h3
                    className="text-light btn  border-0 bg-transparent w-100 m-0 p-0 text-start"
                    onClick={() => {
                      showAccord(2);
                    }}
                  >
                    <strong>Return, Exchange & Cancellation Policy</strong>
                    <span style={{ float: "right" }}>
                      {(showAccordions[2] && "-") || "+"}
                    </span>
                    <div
                      className={`accord ${showAccordions[2] && "expanded"}`}
                    >
                      <p className={`text-light mt-2 pt-2 `}>
                        We strive for your satisfaction and offer a
                        straightforward exchange policy.
                      </p>
                      <ul className={`text-light mt-2 pt-2 `}>
                        <li className="m-2">
                          Please note that we do not accept returns.
                        </li>
                        <li className="m-2">
                          However, if you receive the wrong product or a size
                          different from what you ordered, we are happy to
                          facilitate an exchange.
                        </li>
                        <li className="m-2">
                          Please initiate the exchange process within 7 days of
                          receiving your order by writing an email to
                          help@dripsterclothing.com.
                        </li>
                      </ul>
                      <p className={`text-light mt-2 pt-2`}>
                        Your happiness is our priority, and we're here to ensure
                        you receive the right product.
                      </p>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal fade${showSizeModal ? " show" : " d-none"}`}
        id="staticBackdropLive"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLiveLabel"
        aria-modal="true"
        role="dialog"
        style={{
          display: showSizeModal ? "block" : "none",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-light"
                id="staticBackdropLiveLabel"
              >
                Oversized T-shirt Size Chart
              </h1>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowSizeModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <table className="table table-bordered table-hover bg-transparent">
                <thead className="bg-transparent">
                  <tr className="bg-transparent">
                    <th scope="col" className="bg-transparent text-light">
                      Size
                    </th>
                    <th scope="col" className="bg-transparent text-light">
                      Length
                    </th>
                    <th scope="col" className="bg-transparent text-light">
                      Chest
                    </th>
                    <th scope="col" className="bg-transparent text-light">
                      Shoulder
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "X-Small",
                    "Small",
                    "Medium",
                    "Large",
                    "X-Large",
                    "XX-Large",
                  ].map((size, index) => (
                    <tr key={index} className="bg-transparent">
                      <th scope="row" className="bg-transparent text-light">
                        {size}
                      </th>
                      <td className="bg-transparent text-light">19</td>
                      <td className="bg-transparent text-light">19</td>
                      <td className="bg-transparent text-light">19</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h3 style={{ color: "rgb(255,255,255)", marginRight: "10px" }}>
        Loading Your Product
      </h3>
      <div className="waveform">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="waveform__bar"></div>
        ))}
      </div>
    </div>
  );
}