require("dotenv").config({ path: "../.env" });
const Admin = require("../Models/Admin");
const { sendOTP, verifyOTP } = require("../Services/otpService");
const genToken = require("../Services/jwtTokenService");

exports.AdminLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await Admin.findOne({ email });

    if (!checkEmail) {
      return res.status(400).send({
        success: false,
        message: "Email address is not registered",
      });
    }

    try {
      await sendOTP(email);
      return res.status(200).send({ success: true, message: "OTP sent" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error sending OTP !!!" });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in Sending OTP to your Mail.",
    });
  }
};

exports.AdminLoginVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const is_verified = verifyOTP(email, otp);

    if (is_verified) {
      const admin = await Admin.findOne({ email: email });

      if (!admin) {
        return res.status(400).send({
          success: false,
          message: "Admin with this email not exists.",
        });
      }

      const payload = {
        _id: admin._id,
        email: admin.email,
        type: "Admin",
      };

      const authToken = genToken(payload);

      return res.status(200).send({
        success: true,
        result: authToken,
        type: "Admin",
        _id: admin._id,
        email: admin.email,
      });
    } else
      return res.status(400).send({ success: false, message: "Wrong OTP" });
  } catch (err) {
    console.warn(err);
    return res.status(400).send({
      success: false,
      message: "Error in login Beneficiary.",
    });
  }
};
