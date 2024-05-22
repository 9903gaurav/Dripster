const connectDatabase = require("../config/database");
connectDatabase;

const { verifyToken } = require("../auth/authToken");

exports.addToCart = (req, res) => {
  verifyToken(req.cookies.loginAuth, function (err, result) {
    if (err) {
      res.json(result);
      return false;
    } else {
      connectDatabase.getConnection(function (err, connection) {
        if (err) {
          console.log(`${new Date()}/${err}/${result.email}`);
          res.json({
            success: false,
            message: "Failed to Get Connection",
          });
          return false;
        } else {
          connection.beginTransaction(function (err1) {
            if (err1) {
              console.log(`${new Date()}/${err1}/${result.email}`);
              res.json({
                success: false,
                message: "Failed to Begin Transcation",
              });
              return false;
            } else {
              connection.query(
                "SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email  = ?",
                [result.email],
                function (err2, result1, fields) {
                  if (err2) {
                    return connection.rollback(function () {
                      console.log(`${new Date()}/${err2}/${result.email}`);
                      res.json({
                        success: false,
                        message: "Failed to Fetch User Error",
                      });
                      return false;
                    });
                  } else {
                    if (result1.length === 0) {
                      console.log(
                        `${new Date()}/${"User Not Found"}/${result.email}`
                      );
                      res.json({
                        success: false,
                        message: "User Not Found",
                      });
                      return false;
                    } else {
                      connection.query(
                        "SELECT cart_id FROM dripster_cart  WHERE user_id = ?",
                        [result1[0].dripster_user_id],
                        function (err3, result2, fields) {
                          if (err3) {
                            return connection.rollback(function () {
                              console.log(
                                `${new Date()}/${err3}/${result.email}`
                              );
                              res.json({
                                success: false,
                                message: "Failed to Fetch Cart",
                              });
                              return false;
                            });
                          } else {
                            if (result2.length < 1) {
                              connection.query(
                                "INSERT INTO dripster_cart (user_id) VALUES (?)",
                                [result1[0].dripster_user_id],
                                function (err4, result3, fields) {
                                  if (err4) {
                                    return connection.rollback(function () {
                                      console.log(
                                        `${new Date()}/${err4}/${result.email}`
                                      );
                                      res.json({
                                        success: false,
                                        message: "Failed to Create Cart",
                                      });
                                      return false;
                                    });
                                  } else {
                                    connection.query(
                                      "INSERT INTO dripster_cart_item (cart_id, prod_config_id, prod_qty) VALUES ( (SELECT cart_id FROM dripster_cart WHERE user_id = ?), (SELECT dripster_product_config_id FROM dripster_product_config WHERE dripster_product_config_productId = ? AND dripster_product_config_size = ?),1) ON DUPLICATE KEY UPDATE prod_qty = CASE WHEN prod_qty + 1 <= ( SELECT dripster_product_config_qty FROM  dripster_product_config WHERE dripster_product_config_productId = ? AND dripster_product_config_size = ? ) AND prod_qty < 10 THEN prod_qty + 1 ELSE prod_qty END;",
                                      [
                                        result1[0].dripster_user_id,
                                        req.body.productId,
                                        req.body.productSize,
                                        req.body.productId,
                                        req.body.productSize,
                                      ],
                                      function (err5, result5) {
                                        if (err5) {
                                          return connection.rollback(
                                            function () {
                                              console.log(
                                                `${new Date()}/${err5}/${
                                                  result.email
                                                }/11`
                                              );
                                              res.json({
                                                success: false,
                                                message:
                                                  "Failed to Insert Cart Item",
                                              });
                                              return false;
                                            }
                                          );
                                        } else {
                                          if (result5.affectedRows >= 1) {
                                            connection.commit(function (err) {
                                              if (err) {
                                                return connection.rollback(
                                                  function () {
                                                    console.log(
                                                      err,
                                                      result.email
                                                    );
                                                    res.json({
                                                      success: false,
                                                      message:
                                                        "Failed To Committ the Product",
                                                    });
                                                    return false;
                                                  }
                                                );
                                              }
                                              res.json({
                                                success: true,
                                                message:
                                                  "Product Added To Cart",
                                              });
                                              return true;
                                            });
                                          } else {
                                            return connection.rollback(
                                              function () {
                                                res.json({
                                                  success: false,
                                                  message:
                                                    "Failed to Insert Cart",
                                                });
                                                return false;
                                              }
                                            );
                                          }
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            } else {
                              connection.query(
                                "INSERT INTO dripster_cart_item (cart_id, prod_config_id, prod_qty) VALUES ( (SELECT cart_id FROM dripster_cart WHERE user_id = ?), (SELECT dripster_product_config_id FROM dripster_product_config WHERE dripster_product_config_productId = ? AND dripster_product_config_size = ?),1) ON DUPLICATE KEY UPDATE prod_qty = CASE WHEN prod_qty + 1 <= ( SELECT dripster_product_config_qty FROM  dripster_product_config WHERE dripster_product_config_productId = ? AND dripster_product_config_size = ? ) AND prod_qty < 10 THEN prod_qty + 1 ELSE prod_qty END;",
                                [
                                  result1[0].dripster_user_id,
                                  req.body.productId,
                                  req.body.productSize,
                                  req.body.productId,
                                  req.body.productSize,
                                ],
                                function (err5, result5) {
                                  if (err5) {
                                    return connection.rollback(function () {
                                      console.log(
                                        `${new Date()}/${err5}/${
                                          result.email
                                        }/he`
                                      );
                                      res.json({
                                        success: false,
                                        message: "Failed to Insert Cart",
                                      });
                                      return false;
                                    });
                                  } else {
                                    if (result5.affectedRows >= 1) {
                                      connection.commit(function (err) {
                                        if (err) {
                                          return connection.rollback(
                                            function () {
                                              console.log(err, result.email);
                                              res.json({
                                                success: false,
                                                message:
                                                  "Failed To Committ the Product",
                                              });
                                              return false;
                                            }
                                          );
                                        }
                                        res.json({
                                          success: true,
                                          message: "Product Added To Cart",
                                        });
                                        return true;
                                      });
                                    } else {
                                      return connection.rollback(function () {
                                        res.json({
                                          success: false,
                                          message: "Failed to Insert Into Cart",
                                        });
                                        return false;
                                      });
                                    }
                                  }
                                }
                              );
                            }
                          }
                        }
                      );
                    }
                  }
                }
              );
            }
          });
        }
        connection.release();
      });
    }
  });
};

exports.fetchCart = (req, res) => {
  verifyToken(req.cookies.loginAuth, function (err, result) {
    if (err) {
      res.json(result);
      return false;
    } else {
      connectDatabase.getConnection(function (err1, connection) {
        if (err1) {
          console.log(`${new Date()}/${err1}/${result.email}`);
          res.json({
            success: false,
            message: "Failed to Get Connection",
          });
          return false;
        } else {
          connection.query(
            "SELECT ci.cart_item_id, p.dripster_product_title, p.dripster_product_mainImg, pc.dripster_product_config_size, ci.prod_qty as qty,(CASE WHEN pc.dripster_product_config_qty >= 10 THEN 10 ELSE pc.dripster_product_config_qty END) as qty_display,pc.dripster_product_config_currPrice as currPrice, ( pc.dripster_product_config_currPrice * ci.prod_qty ) AS total_product_value, co.couponCode, SUM( pc.dripster_product_config_currPrice * ci.prod_qty) OVER() AS subtotal_cart_value, CASE WHEN SUM( ( co.discountPercentage *( pc.dripster_product_config_currPrice * ci.prod_qty) / 100 ) ) OVER() < co.discountUpto THEN SUM((co.discountPercentage *( pc.dripster_product_config_currPrice * ci.prod_qty) / 100)) OVER() ELSE co.discountUpto END AS discountAmount,( SUM( pc.dripster_product_config_currPrice * ci.prod_qty ) OVER() - CASE WHEN SUM((co.discountPercentage *(pc.dripster_product_config_currPrice * ci.prod_qty) / 100)) OVER() < co.discountUpto THEN SUM((co.discountPercentage *(pc.dripster_product_config_currPrice * ci.prod_qty) / 100)) OVER() ELSE co.discountUpto END) AS subtotal_minus_discount FROM dripster_cart_item ci JOIN dripster_product_config pc ON ci.prod_config_id = pc.dripster_product_config_id JOIN dripster_product p ON pc.dripster_product_config_productId = p.dripster_product_id JOIN dripster_cart c ON ci.cart_id = c.cart_id LEFT JOIN dripster_coupons co ON c.coupon_id = co.id WHERE c.user_id =( SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email = ?);",
            [result.email],
            function (err2, result1) {
              if (err2) {
                return connection.rollback(function () {
                  console.log(`${new Date()}/${err2}/${result.email}`);
                  res.json({
                    success: false,
                    message: "Failed to Fetch Cart Product",
                  });
                  return false;
                });
              } else {
                if (result1.length > 0) {
                  res.json({
                    success: true,
                    message: "Cart Product FOund",
                    cart: result1,
                  });
                  return true;
                } else {
                  res.json({
                    success: false,
                    message: "No Product Found in Your Cart",
                  });
                  return false;
                }
              }
            }
          );
        }
        connection.release();
      });
    }
  });
};

exports.deleteProduct = (req, res) => {
  verifyToken(req.cookies.loginAuth, function (err, result) {
    if (err) {
      res.json(result);
      return false;
    } else {
      connectDatabase.getConnection(function (err1, connection) {
        if (err1) {
          console.log(`${new Date()}/${err1}/${result.email}`);
          res.json({
            success: false,
            message: "Failed to Get Connection",
          });
          return false;
        } else {
          connection.query(
            "DELETE FROM dripster_cart_item WHERE cart_item_id = ? AND cart_id = (SELECT cart_id FROM dripster_cart WHERE user_id  = (SELECT dripster_user_id  FROM dripster_user WHERE dripster_user_email = ?))",
            [req.body.cart_item_id, result.email],
            function (err2, result1) {
              if (err2) {
                console.log(`${new Date()}/${err2}/${result.email}`);
                res.json({
                  success: false,
                  message: "Failed to Fetch Cart Product",
                });
                return false;
              } else {
                if (result1.affectedRows > 0) {
                  res.json({
                    success: true,
                    message: "Successfully Deleted Product",
                  });
                  return true;
                } else {
                  res.json({
                    success: false,
                    message: "Failed to Delete the Product",
                  });
                  return false;
                }
              }
            }
          );
        }
        connection.release();
      });
    }
  });
};

exports.updateCartProduct = (req, res) => {
  verifyToken(req.cookies.loginAuth, function (err, result) {
    if (err) {
      res.json(result);
      return false;
    } else {
      connectDatabase.getConnection(function (err, connection) {
        if (err) {
          console.log(`${new Date()}/${err}/${result.email}`);
          res.json({
            success: false,
            message: "Failed to Get Connection",
          });
          return false;
        } else {
          connection.query(
            "UPDATE dripster_cart_item SET prod_qty = CASE WHEN ? <=( SELECT dripster_product_config_qty FROM dripster_product_config WHERE dripster_product_config_id = (SELECT prod_config_id FROM dripster_cart_item WHERE cart_item_id = ?) ) AND ? <= 10 THEN ? ELSE prod_qty END WHERE cart_item_id = ? AND cart_id = (SELECT cart_id FROM dripster_cart WHERE user_id = (SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email = ?));",
            [
              req.body.qty,
              req.body.cart_item_id,
              req.body.qty,
              req.body.qty,
              req.body.cart_item_id,
              result.email,
            ],
            function (err2, result1, fields) {
              if (err2) {
                console.log(`${new Date()}/${err2}/${result.email}`);
                res.json({
                  success: false,
                  message: "Failed to Update",
                });
                return false;
              } else {
                if (result1.affectedRows >= 1) {
                  res.json({
                    success: true,
                    message: "Updated Qty",
                  });
                  return true;
                } else {
                  res.json({
                    success: false,
                    message: "Failed to Update the Product",
                  });
                  return false;
                }
              }
            }
          );
        }
        connection.release();
      });
    }
  });
};

exports.applyCoupon = (req, res) => {
  if (req.body.couponCode !== "") {
    verifyToken(req.cookies.loginAuth, function (err, result) {
      if (err) {
        res.json(result);
        return false;
      } else {
        connectDatabase.getConnection(function (err, connection) {
          if (err) {
            console.log(`${new Date()}/${err}/${result.email}`);
            res.json({
              success: false,
              message: "Failed to Get Connection",
            });
            return false;
          } else {
            connection.beginTransaction(function (err1) {
              if (err1) {
                console.log(`${new Date()}/${err1}/${result.email}`);
                res.json({
                  success: false,
                  message: "Failed to Begin Transcation",
                });
                return false;
              } else {
                connection.query(
                  "SELECT * FROM dripster_coupons WHERE couponCode = ? and isActive = 1;",
                  [req.body.couponCode],
                  function (err2, result1, fields) {
                    if (err2) {
                      return connection.rollback(function () {
                        console.log(`${new Date()}/${err2}/${result.email}`);
                        res.json({
                          success: false,
                          message: "Failed to Fetch User Error",
                        });
                        return false;
                      });
                    } else {
                      if (result1.length > 0) {
                        if (result1[0].isNewUser) {
                          connection.query(
                            "SELECT count(order_id) as orderCount FROM dripster_order WHERE user_id = (SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email = ?) AND payment_status IN ('Pending', 'Failed');",
                            [result.email],
                            function (err3, result2) {
                              if (err3) {
                                return connection.rollback(function () {
                                  console.log(
                                    `${new Date()}/${err3}/${result.email}`
                                  );
                                  res.json({
                                    success: false,
                                    message: "Failed to Fetch User Order",
                                  });
                                  return false;
                                });
                              } else {
                                if (!result2[0].orderCount) {
                                  return connection.rollback(function () {
                                    res.json({
                                      success: false,
                                      message: "Code Only Valid For New User",
                                    });
                                    return false;
                                  });
                                } else {
                                  connection.query(
                                    "SELECT sum(prod_qty) as qtyCount FROM dripster_cart_item WHERE cart_id = (SELECT cart_id FROM dripster_cart WHERE user_id = (SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email = ?));",
                                    [result.email],
                                    function (err4, result3) {
                                      if (err4) {
                                        return connection.rollback(function () {
                                          console.log(
                                            `${new Date()}/${err4}/${
                                              result.email
                                            }`
                                          );
                                          res.json({
                                            success: false,
                                            message: "Failed to Verify Order",
                                          });
                                          return false;
                                        });
                                      } else {
                                        if (
                                          result3[0].qtyCount >=
                                          result1[0].minimumQty
                                        ) {
                                          connection.query(
                                            "SELECT SUM( pc.dripster_product_config_currPrice * ci.prod_qty ) AS purchaseValue FROM dripster_cart_item ci JOIN dripster_product_config pc ON ci.prod_config_id = pc.dripster_product_config_id WHERE ci.cart_id = (SELECT cart_id FROM dripster_cart WHERE user_id = (SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email = ?));",
                                            [result.email],
                                            function (err6, result6) {
                                              if (err6) {
                                                return connection.rollback(
                                                  function () {
                                                    console.log(
                                                      `${new Date()}/${err6}/${
                                                        result.email
                                                      }`
                                                    );
                                                    res.json({
                                                      success: false,
                                                      message:
                                                        "Unable To Fetch Cart Value",
                                                    });
                                                    return false;
                                                  }
                                                );
                                              } else {
                                                if (
                                                  result6[0].purchaseValue >=
                                                  result1[0].minimumPurchase
                                                ) {
                                                  connection.query(
                                                    "UPDATE dripster_cart SET coupon_id = ? WHERE user_id = (SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email = ?);",
                                                    [
                                                      result1[0].id,
                                                      result.email,
                                                    ],
                                                    function (err5, result5) {
                                                      if (err5) {
                                                        return connection.rollback(
                                                          function () {
                                                            console.log(
                                                              `${new Date()}/${err5}/${
                                                                result.email
                                                              }`
                                                            );
                                                            res.json({
                                                              success: false,
                                                              message:
                                                                "Unable To Apply Coupon In System",
                                                            });
                                                            return false;
                                                          }
                                                        );
                                                      } else {
                                                        if (
                                                          result5.affectedRows >=
                                                          1
                                                        ) {
                                                          connection.commit(
                                                            function (err6) {
                                                              if (err6) {
                                                                return connection.rollback(
                                                                  function () {
                                                                    console.log(
                                                                      err6,
                                                                      result.email
                                                                    );
                                                                    res.json({
                                                                      success: false,
                                                                      message:
                                                                        "Failed To Committ the Coupon",
                                                                    });
                                                                    return false;
                                                                  }
                                                                );
                                                              }
                                                              res.json({
                                                                success: true,
                                                                message:
                                                                  "Coupon Applied",
                                                              });
                                                              return true;
                                                            }
                                                          );
                                                        } else {
                                                          return connection.rollback(
                                                            function () {
                                                              res.json({
                                                                success: false,
                                                                message: `Unable To Apply Coupon`,
                                                              });
                                                              return false;
                                                            }
                                                          );
                                                        }
                                                      }
                                                    }
                                                  );
                                                } else {
                                                  return connection.rollback(
                                                    function () {
                                                      res.json({
                                                        success: false,
                                                        message: `Minium Order Value ₹ ${result1[0].minimumPurchase}`,
                                                      });
                                                      return false;
                                                    }
                                                  );
                                                }
                                              }
                                            }
                                          );
                                        } else {
                                          return connection.rollback(
                                            function () {
                                              res.json({
                                                success: false,
                                                message: `Minimum of ${result1[0].minimumQty} Qty is Required`,
                                              });
                                              return false;
                                            }
                                          );
                                        }
                                      }
                                    }
                                  );
                                }
                              }
                            }
                          );
                        } else {
                          connection.query(
                            "SELECT count(order_id) as orderCount FROM dripster_order WHERE user_id = (SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email = ?) AND payment_status IN ('Pending', 'Confirmed') AND coupon_id = ?;",
                            [result.email, result1[0].id],
                            function (err3, result2) {
                              if (err3) {
                                return connection.rollback(function () {
                                  console.log(
                                    `${new Date()}/${err3}/${result.email}`
                                  );
                                  res.json({
                                    success: false,
                                    message: "Failed to Fetch User Order",
                                  });
                                  return false;
                                });
                              } else {
                                if (
                                  result2[0].orderCount >= result1[0].limitUpto
                                ) {
                                  return connection.rollback(function () {
                                    res.json({
                                      success: false,
                                      message: `Code Can Only be Used ${result1[0].limitUpto} Times`,
                                    });
                                    return false;
                                  });
                                } else {
                                  connection.query(
                                    "SELECT sum(prod_qty) as qtyCount FROM dripster_cart_item WHERE cart_id = (SELECT cart_id FROM dripster_cart WHERE user_id = (SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email = ?));",
                                    [result.email],
                                    function (err4, result3) {
                                      if (err4) {
                                        return connection.rollback(function () {
                                          console.log(
                                            `${new Date()}/${err4}/${
                                              result.email
                                            }`
                                          );
                                          res.json({
                                            success: false,
                                            message: "Failed to Verify Order",
                                          });
                                          return false;
                                        });
                                      } else {
                                        if (
                                          result3[0].qtyCount >=
                                          result1[0].minimumQty
                                        ) {
                                          connection.query(
                                            "SELECT SUM( pc.dripster_product_config_currPrice * ci.prod_qty ) AS purchaseValue FROM dripster_cart_item ci JOIN dripster_product_config pc ON ci.prod_config_id = pc.dripster_product_config_id WHERE ci.cart_id = (SELECT cart_id FROM dripster_cart WHERE user_id = (SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email = ?));",
                                            [result.email],
                                            function (err6, result6) {
                                              if (err6) {
                                                return connection.rollback(
                                                  function () {
                                                    console.log(
                                                      `${new Date()}/${err6}/${
                                                        result.email
                                                      }`
                                                    );
                                                    res.json({
                                                      success: false,
                                                      message:
                                                        "Unable To Fetch Cart Value",
                                                    });
                                                    return false;
                                                  }
                                                );
                                              } else {
                                                if (
                                                  result6[0].purchaseValue >=
                                                  result1[0].minimumPurchase
                                                ) {
                                                  connection.query(
                                                    "UPDATE dripster_cart SET coupon_id = ? WHERE user_id = (SELECT dripster_user_id FROM dripster_user WHERE dripster_user_email = ?);",
                                                    [
                                                      result1[0].id,
                                                      result.email,
                                                    ],
                                                    function (err5, result5) {
                                                      if (err5) {
                                                        return connection.rollback(
                                                          function () {
                                                            console.log(
                                                              `${new Date()}/${err5}/${
                                                                result.email
                                                              }`
                                                            );
                                                            res.json({
                                                              success: false,
                                                              message:
                                                                "Unable To Apply Coupon In System",
                                                            });
                                                            return false;
                                                          }
                                                        );
                                                      } else {
                                                        if (
                                                          result5.affectedRows >=
                                                          1
                                                        ) {
                                                          connection.commit(
                                                            function (err6) {
                                                              if (err6) {
                                                                return connection.rollback(
                                                                  function () {
                                                                    console.log(
                                                                      err6,
                                                                      result.email
                                                                    );
                                                                    res.json({
                                                                      success: false,
                                                                      message:
                                                                        "Failed To Committ the Coupon",
                                                                    });
                                                                    return false;
                                                                  }
                                                                );
                                                              }
                                                              res.json({
                                                                success: true,
                                                                message:
                                                                  "Coupon Applied",
                                                              });
                                                              return true;
                                                            }
                                                          );
                                                        } else {
                                                          return connection.rollback(
                                                            function () {
                                                              res.json({
                                                                success: false,
                                                                message: `Unable To Apply Coupon`,
                                                              });
                                                              return false;
                                                            }
                                                          );
                                                        }
                                                      }
                                                    }
                                                  );
                                                } else {
                                                  return connection.rollback(
                                                    function () {
                                                      res.json({
                                                        success: false,
                                                        message: `Minium Order Value ₹ ${result1[0].minimumPurchase}`,
                                                      });
                                                      return false;
                                                    }
                                                  );
                                                }
                                              }
                                            }
                                          );
                                        } else {
                                          return connection.rollback(
                                            function () {
                                              res.json({
                                                success: false,
                                                message: `Minimum of ${result1[0].minimumQty} Qty is Required`,
                                              });
                                              return false;
                                            }
                                          );
                                        }
                                      }
                                    }
                                  );
                                }
                              }
                            }
                          );
                        }
                      } else {
                        return connection.rollback(function () {
                          res.json({
                            success: false,
                            message: "Coupon Code Invalid",
                          });
                          return false;
                        });
                      }
                    }
                  }
                );
              }
            });
          }
          connection.release();
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: "Please Enter Coupon Code",
    });
    return false;
  }
};

exports.removeCoupon = (req, res) => {
  verifyToken(req.cookies.loginAuth, function (err, result) {
    if (err) {
      res.json(result);
      return false;
    } else {
      connectDatabase.getConnection(function (err, connection) {
        if (err) {
          console.log(`${new Date()}/${err}/${result.email}`);
          res.json({
            success: false,
            message: "Failed to Get Connection",
          });
          return false;
        } else {
          connection.query(
            "UPDATE dripster_cart SET coupon_id = 0 WHERE dripster_cart.user_id = (SELECT dripster_user_id from dripster_user WHERE dripster_user_email = ?);",
            [result.email],
            function (err2, result1) {
              if (err2) {
                console.log(`${new Date()}/${err2}/${result.email}`);
                res.json({
                  success: false,
                  message: "Failed to Update Coupon",
                });
                return false;
              } else {
                if (result1.affectedRows > 0) {
                  res.json({
                    success: true,
                    message: "Successfully Removed Coupon",
                  });
                  return true;
                } else {
                  res.json({
                    success: false,
                    message: "Failed to Remove The Coupon",
                  });
                  return false;
                }
              }
            }
          );
        }
        connection.release();
      });
    }
  });
};

exports.userCheckout = (req, res) => {
  verifyToken(req.cookies.loginAuth, function (err, result) {
    if (err) {
      res.json(result);
      return false;
    } else {
      connectDatabase.getConnection(function (err, connection) {
        if (err) {
          console.log(`${new Date()}/${err}/${result.email}`);
          res.json({
            success: false,
            message: "Failed to Get Connection",
          });
          return false;
        } else {
        }
        connection.release();
      });
    }
  });
};