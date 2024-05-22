const connectDatabase = require("../config/database");
connectDatabase;

exports.fetchProductDetail = (req, res) => {
  if (req.body.productId !== "") {
    connectDatabase.getConnection(function (err, connection) {
      if (err) {
        console.log(`${new Date()}/${err}/${"Product Fetch Error"}`);
        res.json({
          success: false,
          message: "Failed to Get Connection",
          navigate: "/",
        });
        return false;
      } else {
        connection.query("SET SESSION group_concat_max_len = @@max_allowed_packet", (errs, results) => {})
        connection.query(
          "SELECT dp.dripster_product_id, dp.dripster_product_title, dp.dripster_product_mainImg, dp.dripster_product_otherImg, CONCAT( '[', GROUP_CONCAT( JSON_OBJECT( 'dripster_product_config_id', dpc.dripster_product_config_id, 'dripster_product_config_size', dpc.dripster_product_config_size, 'dripster_product_config_mrp', dpc.dripster_product_config_mrp, 'dripster_product_config_currPrice', dpc.dripster_product_config_currPrice, 'dripster_product_config_qty', dpc.dripster_product_config_qty ) SEPARATOR ',' ), ']' ) AS dripster_product_config, MIN(dpc.dripster_product_config_currPrice) AS minimum_product_price FROM dripster_ecom.dripster_product dp JOIN dripster_ecom.dripster_product_config dpc ON dp.dripster_product_id = dpc.dripster_product_config_productId WHERE dp.dripster_product_id = ? AND dp.dripster_product_status = 1;",
          [req.body.productId],
          (errs, results) => {
            if (errs) {
              console.log(`${new Date()}/${errs}/${"Product Sql Fetch Error"}`);
            } else {
              if (results[0].dripster_product_id === null) {
                res.json({
                  success: false,
                  message: "Product Not Found",
                  navigate: "/",
                });
                return false;
              } else {
                res.json({
                  success: true,
                  message: "Product Found",
                  productData: results[0],
                });
                return true;
              }
            }
          }
        );
      }
      connection.release();
    });
  } else {
    res.json({
      success: false,
      message: "Unable To Fetch Product Detail",
      navigate: "/",
    });
    return false;
  }
};