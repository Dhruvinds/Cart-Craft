const User = require("../Schema/UserSchema");
const nodemailer = require("nodemailer");
const generateToken = require("../utils/genrateTocken");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const errLogger = require("../utils/errorLogger");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const alredyregisterd = await User.findOne({ email });
  if (alredyregisterd) {
    res
      .status(401)
      .json({ message: "User with this email address already exists" });

    errLogger.error(
      `401 ||"User with this email address already exists" - ${firstName} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      res.sendStatus(400).json({ Error: "All Fields Are Required" });

      errLogger.error(
        `400 || "All Fields Are Required" - ${firstName} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      if (password === confirmPassword) {
        const data = new User({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          role: "6246b33d13b44bf35888a11b",
        });
        var save = await data.save();
        res.json({
          email: save.email,
          firstName: save.firstName,
          lastName: save.lastName,
          id: save._id,
          password: save.password,
        });
        logger.info(
          `User register Successfully  - ${firstName} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        const sender = nodemailer.createTransport({
          service: "gmail",
          secure: false,
          auth: {
            user: "cartcraftteam@gmail.com",
            pass: "Cartcraft@123",
          },
        });

        var maildata = {
          from: "cartcraftteam@gmail.com",
          to: save.email,
          subject: "Registration to CartCraft",
          html:
            `<!DOCTYPE HTML
          PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        
        <head>
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
          <style type="text/css">
            p {
              margin: 10px 0;
              padding: 0;
            }
        
            table {
              border-collapse: collapse;
            }
        
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              display: block;
              margin: 0;
              padding: 0;
            }
        
            img,
            a img {
              border: 0;
              height: auto;
              outline: none;
              text-decoration: none;
            }
        
            #outlook a {
              padding: 0;
            }
        
            img {
              -ms-interpolation-mode: bicubic;
            }
        
            table {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
        
            .ReadMsgBody {
              width: 100%;
            }
        
            .ExternalClass {
              width: 100%;
            }
        
            p,
            a,
            li,
            td,
            blockquote {
              mso-line-height-rule: exactly;
            }
        
            a[href^=tel],
            a[href^=sms] {
              color: inherit;
              cursor: default;
              text-decoration: none;
            }
        
            p,
            a,
            li,
            td,
            body,
            table,
            blockquote {
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
        
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass td,
            .ExternalClass div,
            .ExternalClass span,
            .ExternalClass font {
              line-height: 100%;
            }
        
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
            }
        
            .templateContainer {
              max-width: 600px !important;
            }
        
            a.mcnButton {
              display: block;
            }
        
            .mcnImage {
              vertical-align: bottom;
            }
        
            .mcnTextContent {
              word-break: break-word;
            }
        
            .mcnTextContent img {
              height: auto !important;
            }
        
            .mcnDividerBlock {
              table-layout: fixed !important;
            }
        
            body,
            #bodyTable {
              /*@editable*/
              background-color: #faf9f5;
              font-family: 'Lato', sans-serif;
            }
        
            #bodyCell {
              /*@editable*/
              border-top: 0;
            }
        
            h1 {
              /*@editable*/
              color: #202020;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 26px;
              /*@editable*/
              font-style: normal;
              /*@editable*/
              font-weight: bold;
              /*@editable*/
              line-height: 125%;
              /*@editable*/
              letter-spacing: normal;
              /*@editable*/
              text-align: left;
            }
        
            h2 {
              /*@editable*/
              color: #202020;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 22px;
              /*@editable*/
              font-style: normal;
              /*@editable*/
              font-weight: bold;
              /*@editable*/
              line-height: 125%;
              /*@editable*/
              letter-spacing: normal;
              /*@editable*/
              text-align: left;
            }
        
            h3 {
              /*@editable*/
              color: #202020;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 20px;
              /*@editable*/
              font-style: normal;
              /*@editable*/
              font-weight: bold;
              /*@editable*/
              line-height: 125%;
              /*@editable*/
              letter-spacing: normal;
              /*@editable*/
              text-align: left;
            }
        
            h4 {
              /*@editable*/
              color: #202020;
              /*@editable*/
              font-family: Helvetica;
              /*@editable*/
              font-size: 18px;
              /*@editable*/
              font-style: normal;
              /*@editable*/
              font-weight: bold;
              /*@editable*/
              line-height: 125%;
              /*@editable*/
              letter-spacing: normal;
              /*@editable*/
              text-align: left;
            }
          </style>
          <style type="text/css">
            table.GeneratedTable {
              color: #7c7c7a;
              width: 100%;
              background-color: #ffffff;
              border-collapse: collapse;
              border-width: 1px;
              border-color: #003145;
              border-style: solid;
            }
        
            table.GeneratedTable td,
            table.GeneratedTable th {
              border-width: 1px;
              border-color: #003145;
              border-style: solid;
              padding: 8px;
            }
        
            table.GeneratedTable thead {
              background-color: #4a87e8;
            }
          </style>
        </head>
        
        <body>
          <center style="background: #faf9f5;padding:20px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0"
              style="width:600px;background:#ffffff;   margin-top: 30px;    box-shadow: 0 0 5px #ddd;">
              <tbody>
                <tr>
                  <td align="center" id="bodyCell" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" id="templatePreheader" valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tbody>
                                <tr>
                                  <td
                                    style="background:#4a87e8; text-align:center; padding:40px 30px;">
                                    <img alt="Clarent Logo" src="https://i.ibb.co/rZ6ZDJY/logo-Clarent.png">
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tbody>
                                <tr>
                                  <td style="padding:30px;">
                                    <p
                                      style="color:#4c4c4a;font-family: 'Lato', sans-serif;font-weight:bold;font-size: 16px;">
                                      Hi` +
            " " +
            save.firstName +
            `</p>
        
                                    <p
                                      style="color:#7c7c7a; line-height:26px;font-family: 'Lato', sans-serif;font-size: 15px;">
                                      Welcome ` +
            save.firstName +
            `! Your have successfully registered
                                      to CartCraft.</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="padding: 30px;font-size: 15px;padding-top: 0px;font-family: 'Lato', sans-serif;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tbody>
                                        <tr>
                                          <td
                                            style="width: 100%;padding: 12px 0;color: #7c7c7a;font-size: 16px;font-family: Arial,Helvetica,sans-serif;font-weight: bold;">
                                            Email : <span
                                              style="font-family: Arial,Helvetica,sans-serif;color: #4a88e9; font-size: 16px;text-transform: none; text-decoration: none;">` +
            save.email +
            `</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="padding: 30px;font-size: 15px;padding-top: 0px;font-family: 'Lato', sans-serif;">
                                    <a href="http://localhost:3000/login"
                                      style="color:#fff; font-family: 'Lato', sans-serif; background-color: #4a88e9;box-shadow: 0 2px 4px 0 rgba(74,136,233,.5);height: 42px;font-size: 15px;padding: 10px 20px;line-height: 1.4;text-align: center;white-space: nowrap;vertical-align: middle;border: none;border-radius: 3px;cursor: pointer; text-decoration: none;">Click
                                      here to Login</a>
                                  </td>
                                </tr>
        
                                <tr>
                                  <td
                                    style="padding:30px 30px 0;  font-family: 'Lato', sans-serif;  font-size: 15px;">
                                    <p
                                      style="color:#7c7c7a; line-height:26px; margin:0;padding:0;font-family: 'Lato', sans-serif;">
                                      Sincerely,</p>
        
                                    <p
                                      style="color:#4c4c4a; line-height:26px;margin:0;padding:0;font-family: 'Lato', sans-serif;">
                                      The CartCraft Team</p>
                                <tr>
                                  <td style="padding: 30px 30px 15px;">
                                </tr>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            </td>
            </tr>
        
            <!--<tr>
              <td style="padding: 30px 30px 15px;">
              <hr style=" border: none;border-top: 1px solid #e6e3d9;"></td>
            </tr>-->
        
            </tbody>
            </table>
          </center>
          <!-- Visual Studio Browser Link -->
          <!-- End Browser Link -->
        </body>
        
        </html>`,
        };
        sender.sendMail(maildata, (err, info) => {});
      } else {
        res.json("Password not matched");
      }
    }
  }
};

const loginUser = async (req, res) => {
  const data = ({ email, password } = req.body);
  const registeredUser = await User.findOne({ email: data.email }).populate(
    "role"
  );
  if (!registeredUser) {
    res.status(401).json({ message: "Invalid Credentials" });

    errLogger.error(
      `401 ||"Invalid Credentials" - ${email} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    if (registeredUser.password == data.password) {
      res.json({
        id: registeredUser._id,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
        token: generateToken(registeredUser._id),
        role: registeredUser.role,
      });
      logger.info(
        `User login Successfully  - ${registeredUser.firstName} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      res.status(401).json({ message: "Invalid Credentials" });

      errLogger.error(
        `401 ||"Invalid Credentials" - ${registeredUser.firstName} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  }
};

const resetPassword = async (req, res) => {
  const data = ({ password, confirmPassword, token } = req.body);
  jwt.verify(token, "HimanshuRupavatiya", async (err, decode) => {
    if (err) {
      return res.json({ error: "Session Expired or Invalid link" });

      errLogger.error(
        `401 ||"Session Expired or Invalid link" - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      var abc = await User.findById(decode.id);
      if (abc.tokenstatus == "pending") {
        if (abc) {
          abc.password = data.password;
          abc.tokenstatus = null;
          abc.confirmPassword = data.confirmPassword;
          var newpassword = await abc.save();
          res.json("Password Successfully Updated");
          logger.info(
            `Password Successfully Updated  -  ${req.originalUrl} - ${req.method} - ${req.ip}`
          );
        }
      } else {
        res.json({ error: "link is valid for only one time" });

        errLogger.error(
          `401 ||"Link is valid for only one time" - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
      }
    }
  });
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.json({ error: "User With this email does't exists" });

    errLogger.error(
      `401 ||"User With this email does't exists" - ${email} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } else {
    const token = jwt.sign({ id: user._id }, "HimanshuRupavatiya", {
      expiresIn: "600s",
    });

    const sender = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "cartcraftteam@gmail.com",
        pass: "Cartcraft@123",
      },
    });

    var maildata = {
      from: "cartcraftteam@gmail.com",
      to: user.email,
      subject: "Reset Your password",
      html:
        `<html>
      <head>
        <title></title>
      </head>
      <body><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></body>
      </html>
      <title></title>
      <link href="https://fonts.googleapis.com/css?family=Lato" type="text/css" />
      <center style=" background: #faf9f5;padding:20px 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;background:#ffffff;   margin-top: 30px;    box-shadow: 0 0 5px #ddd;">
        <tbody>
          <tr>
            <td align="center" id="bodyCell" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td align="center" id="templatePreheader" valign="top">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                      <tr>
                        <td style="background:#4a87e8; text-align:center; padding:40px 30px;"><img alt="Clarent Logo" src="https://i.ibb.co/rZ6ZDJY/logo-Clarent.png" /></td>
                      </tr>
                    </tbody>
                  </table>
                  </td>
                </tr>
                <tr>
                  <td>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                      <tr>
                        <td style="padding:30px;">
                        <p style="color:#4c4c4a;font-family: 'Lato', sans-serif;font-weight:bold;font-size: 16px;">Hi ` +
        user.firstName +
        `</p>
      
                        <p style="color:#7c7c7a; line-height:26px;font-family: 'Lato', sans-serif;font-size: 15px;">Forgot your password?</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 30px;">
                        <p style="color:#7c7c7a; line-height:26px;font-family: 'Lato', sans-serif;font-size: 15px;display: inline-block;margin-top:0; margin-bottom: 15px;">No problem, click on the button below to reset your password!</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 30px;font-size: 15px;padding-top: 0px;font-family: 'Lato', sans-serif;"><a href=` +
        `http://localhost:3000/resetpassword/${token}` +
        ` style="color:#fff; font-family: 'Lato', sans-serif; background-color: #4a88e9;box-shadow: 0 2px 4px 0 rgba(74,136,233,.5);height: 42px;font-size: 15px;padding: 10px 20px;line-height: 1.4;text-align: center;white-space: nowrap;vertical-align: middle;border: none;border-radius: 3px;cursor: pointer; text-decoration: none;">Reset Password</a></td>
                      </tr>
                      <tr>
                        <td style="padding:15px 30px;font-size: 15px;font-family: 'Lato', sans-serif;">
                        <p style="color:#7c7c7a; line-height:26px;font-family: 'Lato', sans-serif;">Heads up! You have <span style="color:red;"> 10 minutes </span> to reset the account password from here. After that, this password reset link will expire and you&#39;ll have to request a new one.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:30px 30px 0;  font-family: 'Lato', sans-serif;  font-size: 15px;">
                        <p style="color:#7c7c7a; line-height:26px; margin:0;padding:0;font-family: 'Lato', sans-serif;">Sincerely,</p>
      
                        <p style="color:#4c4c4a; line-height:26px;margin:0;padding:0;font-family: 'Lato', sans-serif;">The CartCraft Team</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </td>
                </tr>
              </tbody>
            </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 30px 15px;">
            </td>
          </tr>
          
        </tbody>
      </table>
      </center>
      `,
    };
    sender.sendMail(maildata, (err, info) => {});
    user.tokenstatus = "pending";
    await user.save();
    res.json({ success: "Mail send to your email" });
    logger.info(
      `Mail send to User email  - ${email} -  ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

const userProfile = async (req, res) => {
  const userdetalis = await User.findById(user._id).populate("role");
  if (userdetalis) {
    res.json({
      _id: userdetalis._id,
      email: userdetalis.email,
      firstName: userdetalis.firstName,
      lastName: userdetalis.lastName,
      role: userdetalis.role,
      image: userdetalis.image,
    });
    // logger.info(
    //   `User visit  userprofile - ${userdetalis.firstName} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    // );
  } else {
    res.status(400).json({ message: "Not Authorizerd" });

    errLogger.error(
      `400 ||"Not Authorized" - ${userdetalis.firstName} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

const editProfile = async (req, res) => {
  const userData = await User.findById(user._id);

  if (userData) {
    userData.firstName = req.body.firstName || userData.firstName;
    userData.lastName = req.body.lastName || userData.lastName;
    await userData.save();
    res.json({ message: "User details Update Successfully" });
    logger.info(
      `User details Update Successfully  - ${userData.firstName} ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    userData.image = req.body.image || userData.image;

    const update = await userData.save();
    res.json(update);
  } else {
    res.status(400).json({ message: "User not Found" });

    errLogger.error(
      `400 ||"User not Found" - ${userData.firstName} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

const changePassword = async (req, res) => {
  const userData = await User.findById(user._id);
  if (userData) {
    if (userData.password == req.body.oldPassword) {
      userData.password = req.body.password;
      userData.confirmPassword = req.body.confirmPassword;
      await userData.save();
      res.json({ message: "Change Password Update Successfully" });
      logger.info(
        `Change Password Update Successfully  -  ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    } else {
      res.status(400).json({ message: "Old password does not match " });

      errLogger.error(
        `400 ||"Old password does not match" - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  } else {
    res.json({ message: "User Not Founded" });

    errLogger.error(
      `400 ||"User Not Founded" - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

module.exports = {
  loginUser,
  registerUser,
  resetPassword,
  forgetPassword,
  userProfile,
  editProfile,
  changePassword,
};
