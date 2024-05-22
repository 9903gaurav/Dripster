const jwt = require("jsonwebtoken");

exports.sendToken = (req, res) => {
  try {
    const token = jwt.sign(
      { loginAuth: req.body.loginEmail },
      process.env.jwtSecret,
      {
        expiresIn: 24 * 60 * 60,
      }
    );
    res.cookie("loginAuth", token, { httpOnly: true }).json({
      success: true,
      message: "Successfully Logged In",
      navigate: "/",
    });
    return true;
  } catch (error) {
    console.log("Error creating In Creating Token:", error);
    console.log(`${new Date()}/${(req.body.loginEmail, req.body.loginEmail)}`);
    res.json({
      success: false,
      message: "Cannot Create Unique Session",
    });
    return false;
  }
};

exports.verifyToken = (token, callback) => {
  try {
    if (token) {
      jwt.verify(token, process.env.jwtSecret, function (err, decoded) {
        if (err) {
          callback(true, {
            success: false,
            message: "Unauthorized: Invalid token",
            error: err,
          });
        } else {
          callback(false, {
            success: true,
            email: decoded.loginAuth,
            message: "Authenticated User",
          });
        }
      });
    } else {
      callback(true, {
        success: false,
        message: "Unauthorized: No token provided",
        error: "No Token Provided"
      });
    }
  } catch (error) {
    console.log("Cannot Verify Token:", error);
    console.log(`${new Date()}`);
    callback(true, {
      success: false,
      message: "Cannot Verify Token",
      error: error
    });
  }
};

exports.updateToken = (req, res) => {
  try {
    const token = jwt.sign(
      { loginAuth: req.body.email },
      process.env.jwtSecret,
      {
        expiresIn: 24 * 60 * 60,
      }
    );
    res.cookie("loginAuth", token, { httpOnly: true }).json({
      success: true,
      message: "Successfully Updated Data",
      navigate: "/user/account",
    });
    return true;
  } catch (error) {
    console.log("Error creating In Creating Token:", error);
    console.log(`${new Date()}/${(req.body.email)}`);
    res.json({
      success: false,
      message: "Cannot Create Unique Session",
    });
    return false;
  }
};