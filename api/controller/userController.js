const connectDatabase = require("../config/database");
connectDatabase

const bcrypt = require("bcrypt");
const { sendToken, verifyToken, updateToken } = require("../auth/authToken");

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const saltRounds = 10;

const validateEmail = (email) => emailRegex.test(email);
const validatePassword = (password) => passwordRegex.test(password);

const handleDBConnection = (query, params, callback) => {
  connectDatabase.getConnection((err, connection) => {
    if (err) {
      console.log(`${new Date()}/${err}/${params.join(", ")}`);
      callback({ success: false, message: "Failed to Get Connection" });
      return;
    }

    connection.query(query, params, (err, results) => {
      connection.release();
      callback(err ? { success: false, message: err } : results);
    });
  });
};

exports.login = (req, res) => {
  const { loginEmail, loginPassword } = req.body;

  if (!loginEmail || !loginPassword) {
    res.json({ success: false, message: "Please Enter Email and Password" });
    return;
  }

  if (!validateEmail(loginEmail)) {
    res.json({ success: false, message: "Please Enter Valid Email" });
    return;
  }

  if (!validatePassword(loginPassword)) {
    res.json({ success: false, message: "Please Enter Valid Password" });
    return;
  }

  handleDBConnection(
    "SELECT dripster_user_password FROM dripster_user WHERE dripster_user_email = ?",
    [loginEmail],
    (results) => {
      if (!results || results.length < 1) {
        res.json({ success: false, message: "Email Not Registered" });
        return;
      }

      const hashedPassword = results[0]["dripster_user_password"];
      bcrypt.compare(loginPassword, hashedPassword, (err, same) => {
        if (err) {
          res.json({ success: false, message: "Something Went Wrong" });
          return;
        }

        if (same) {
          sendToken(req, res);
        } else {
          res.json({ success: false, message: "Wrong Password" });
        }
      });
    }
  );
};

exports.signup = (req, res) => {
  const { signupFirstName, signupLastName, signupEmail, signupPassword } = req.body;

  if (!signupFirstName || !signupLastName || !signupEmail || !signupPassword) {
    res.json({ success: false, message: "Please Fill All Fields" });
    return;
  }

  if (!validateEmail(signupEmail)) {
    res.json({ success: false, message: "Please Enter Valid Email" });
    return;
  }

  if (!validatePassword(signupPassword)) {
    res.json({ success: false, message: "Please Enter Valid Password" });
    return;
  }

  handleDBConnection(
    "SELECT * FROM dripster_user WHERE dripster_user_email = ?",
    [signupEmail],
    (results) => {
      if (results && results.length > 0) {
        res.json({ success: false, message: "Email Already Registered" });
        return;
      }

      bcrypt.hash(signupPassword, saltRounds, (err, hashedPassword) => {
        if (err) {
          res.json({ success: false, message: "Unable to Store Password" });
          return;
        }

        handleDBConnection(
          "INSERT INTO `dripster_user` (`dripster_user_email`, `dripster_user_password`, `dripster_user_firstName`, `dripster_user_lastName`) VALUES (?, ?, ?, ?)",
          [signupEmail, hashedPassword, signupFirstName, signupLastName],
          (results) => {
            if (results && results.affectedRows !== 0) {
              res.json({
                success: true,
                message: "Successfully Registered",
                navigate: "/login",
              });
            } else {
              res.json({ success: false, message: "Unable To Register" });
            }
          }
        );
      });
    }
  );
};

exports.updateAccDetail = (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.json({ success: false, message: "Please Fill All Fields" });
  }

  if (!validateEmail(email)) {
    return res.json({ success: false, message: "Please Enter Valid Email" });
  }

  verifyToken(req.cookies.loginAuth, (err, result) => {
    if (err) {
      return res.json(result);
    }

    handleDBConnection(
      "SELECT * FROM dripster_user WHERE dripster_user_email = ?",
      [result.email],
      (results) => {
        if (!results || results.length !== 1) {
          return res.json({ success: false, message: "Unable To Find Account" });
        }

        if (email !== result.email) {
          handleDBConnection(
            "UPDATE dripster_user AS du1 JOIN ( SELECT dripster_user_id, CASE WHEN dripster_user_email = ? THEN ? ELSE dripster_user_firstName END AS new_firstName, CASE WHEN dripster_user_email = ? THEN ? ELSE dripster_user_lastName END AS new_lastName, CASE WHEN dripster_user_email = ? THEN ? ELSE dripster_user_email END AS new_email FROM dripster_user WHERE dripster_user_email IN (?, ?) ) AS du2 ON du1.dripster_user_id = du2.dripster_user_id SET du1.dripster_user_firstName = du2.new_firstName, du1.dripster_user_lastName = du2.new_lastName, du1.dripster_user_email = du2.new_email;",
            [result.email, firstName, result.email, lastName, result.email, email, result.email, email],
            (result1) => {
              if (result1 && result1.affectedRows > 0) {
                updateToken(req, res);
              } else {
                return res.json({ success: false, message: "Email Already In Use" });
              }
            }
          );
        } else {
          handleDBConnection(
            "UPDATE dripster_user SET dripster_user_firstName = ?, dripster_user_lastName = ? WHERE dripster_user_email = ?",
            [firstName, lastName, email],
            (result2) => {
              if (result2 && result2.affectedRows > 0) {
                return res.json({
                  success: true,
                  message: "Successfully Updated Data",
                  navigate: "/user/account",
                });
              } else {
                return res.json({ success: false, message: "Unable to Update" });
              }
            }
          );
        }
      }
    );
  });
};

exports.updatePassword = (req, res) => {
  const { oldPassword, newPassword, reNewPassword } = req.body;

  if (!oldPassword || !newPassword || !reNewPassword) {
    return res.json({ success: false, message: "Please Fill All Fields" });
  }

  if (!validatePassword(newPassword)) {
    return res.json({ success: false, message: "Please Enter Valid New Password" });
  }

  if (newPassword !== reNewPassword) {
    return res.json({ success: false, message: "Both New Passwords are Not Matching" });
  }

  verifyToken(req.cookies.loginAuth, (err, result) => {
    if (err) {
      return res.json(result);
    }

    handleDBConnection(
      "SELECT dripster_user_password FROM dripster_user WHERE dripster_user_email = ?",
      [result.email],
      (results) => {
        if (!results || results.length !== 1) {
          return res.json({ success: false, message: "Account Not Found" });
        }

        bcrypt.compare(oldPassword, results[0]["dripster_user_password"], (err, same) => {
          if (err) {
            return res.json({ success: false, message: "Something Went Wrong" });
          }

          if (same) {
            bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
              if (err) {
                return res.json({ success: false, message: "Unable to Store Password" });
              }

              handleDBConnection(
                "UPDATE dripster_user SET dripster_user_password = ? WHERE dripster_user_email = ?",
                [hashedPassword, result.email],
                (result) => {
                  if (result && result.affectedRows > 0) {
                    return res.json({
                      success: true,
                      message: "Successfully Changed Password",
                      navigate: "/user/changePassword",
                    });
                  } else {
                    return res.json({ success: false, message: "Unable to Update" });
                  }
                }
              );
            });
          } else {
            return res.json({ success: false, message: "Wrong Old Password" });
          }
        });
      }
    );
  });
};

exports.fetchAccDetail = (req, res) => {
  verifyToken(req.cookies.loginAuth, (err, result) => {
    if (err) {
      return res.json(result);
    }

    handleDBConnection(
      "SELECT dripster_user_email, dripster_user_firstName, dripster_user_lastName FROM dripster_user WHERE dripster_user_email = ?",
      [result.email],
      (results) => {
        if (!results || results.length !== 1) {
          return res.json({ success: false, message: "Account Detail Not Found" });
        }

        return res.json({
          success: true,
          message: "Account Detail Found",
          accDetail: results,
        });
      }
    );
  });
};

exports.logout = (req, res) => {
  res.cookie("loginAuth", false, { httpOnly: true }).json({
    success: true,
    message: "Successfully Logged Out",
    navigate: "/",
  });
};

exports.verifyLogin = (req, res) => {
  verifyToken(req.cookies.loginAuth, function (err, result) {
    if (err) {
      res.json(result);
      return false;
    } else {
      res.json(result);
    }
  });
};