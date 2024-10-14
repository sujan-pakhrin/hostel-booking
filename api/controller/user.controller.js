import db from "../db.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import { sendMail } from "../middleware/mail.js";

export const getUsers = (req, res, next) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    if (err) {
      next(errorHandler(500, err));
    } else {
      res.send(data);
      // console.log(data)
    }
  });
};
export const getUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const sql = "select * from user where user_id=?";
  db.query(sql, id, (err, data) => {
    if (err) {
      next(errorHandler(400, err));
    } else res.send(data);
  });
};

export const createUser = (req, res, next) => {
  // const profile = req.file.filename;
  const { f_name, l_name, address, email, phone, password, gender } = req.body;
  const created_at = new Date();
  const generateOTP = () => Math.floor(1000 + Math.random() * 9000);
  const otp = generateOTP();

  const sql = "Select * from user where email=?";
  db.query(sql, [email], (err, data) => {
    if (err) {
      next(errorHandler(500, err));
    } else if (data.length > 0) {
      next(errorHandler(400, "Email already exist!!", err));
    } else {
      const sql = "Select * from user where phone=?";
      db.query(sql, [phone], (err, data) => {
        if (err) {
          next(errorHandler(500, err));
        } else if (data.length > 0) {
          next(errorHandler(400, "Phone already exist!!", err));
        } else {
          console.log(password);
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              return next(
                errorHandler(400, "Error during Hashing password", err)
              );
            } else {
              const sql =
                "Insert into user(f_name,l_name,address,email,phone,password,gender,created_at) Values(?,?,?,?,?,?,?,?)";
              const values = [
                f_name,
                l_name,
                address,
                email,
                phone,
                hash,
                gender,
                created_at,
              ];
              db.query(sql, values, (err, data) => {
                if (err) {
                  next(errorHandler(500, err));
                } else {
                  const msg = `<div> <h1>Hi, ${email},This is your OTP: <span style="color:blue">${otp}</span> Please verify it on <a href="http://localhost:5173">AppName</a>.</h1>
                                </div>`;

                  sendMail({
                    receiver: email,
                    subject: "Mail Verification",
                    text: "msg",
                    html: msg,
                  })
                    .then((messageId) => {
                      console.log(
                        "Email sent successfully with Message ID:",
                        messageId
                      );
                      const sql = "UPDATE user SET otp=? WHERE email=?";
                      db.query(sql, [otp, email], (err, data) => {
                        if (err) {
                          res.status(500).send(err);
                        } else {
                          res.status(200).send({
                            success: true,
                            message: "User added successfully",
                          });
                        }
                      });
                    })
                    .catch((err) => {
                      res.status(500).send(err);
                    });
                }
              });
            }
          });
        }
      });
    }
  });
};
export const verifyOtp = (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(errorHandler(400, "OTP is required"));
  }

  const sql = "SELECT * FROM user WHERE email = ? AND otp = ?";

  db.query(sql, [email, otp], (err, result) => {
    if (err) {
      return next(errorHandler(500, "Database query error"));
    }

    if (result.length > 0) {
      const updateSql = "UPDATE user SET isVerified = 1 WHERE email = ?";
      db.query(updateSql, [email], (err, updateResult) => {
        if (err) {
          return next(
            errorHandler(500, "Failed to update verification status")
          );
        }
        res.send({
          message: "Email verified successfully",
          data: updateResult,
        });
      });
    } else {
      return next(errorHandler(400, "Invalid OTP"));
    }
  });
};

export const updateUser = (req, res, next) => {
  const { f_name, l_name, address, email, phone } = req.body;
  const id = parseInt(req.params.id);
  // const profile = req.file.filename;
  const updated_at = new Date();
  const sql = "select * from user where user_id=?";
  db.query(sql, id, (err, data) => {
    if (err) {
      next(errorHandler(500, "Server error!!", err));
    } else {
      if (data.length === 0) {
        res.send(errorHandler(400, "User not found!!"));
      } else {
        const existingUserData = data[0];
        const sql = "select * from user where email=?";
        db.query(sql, [email], (err, data) => {
          if (err) {
            next(errorHandler(400, err));
          } else {
            if (data[0]?.email === email && data[0]?.user_id !== id) {
              next(errorHandler(400, "Email already exists!"));
            } else {
              const sql = "select * from user where phone=?";
              db.query(sql, [phone], (err, result) => {
                if (err) {
                  next(errorHandler(400, "Something went wrong", err));
                } else {
                  if (
                    result.length > 0 &&
                    result[0].phone === phone &&
                    result[0].user_id !== id
                  ) {
                    next(errorHandler(400, "Phone already exists!"));
                  } else {
                    const updatedData = {
                      f_name: f_name || existingUserData.f_name,
                      l_name: l_name || existingUserData.l_name,
                      address: address || existingUserData.address,
                      email: email || existingUserData.email,
                      phone: phone || existingUserData.phone,
                    };
                    const sql =
                      "UPDATE user SET f_name = ?, l_name = ?, address = ?, email = ?, phone = ?, updated_at = ? WHERE user_id = ?";
                    const values = [
                      updatedData.f_name,
                      updatedData.l_name,
                      updatedData.address,
                      updatedData.email,
                      updatedData.phone,
                      updated_at,
                      id,
                    ];
                    db.query(sql, values, (err, data) => {
                      if (err) {
                        next(errorHandler(400, err));
                      } else {
                        //   res.send(data)
                        if (data.affectedRows === 0) {
                          next(errorHandler(400, "Didnot update the user"));
                        } else {
                          res.send(data);
                        }
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    }
  });
};

export const deleteUser = (req, res, next) => {
  const id = parseInt(req.params.id);
  const sql = "select * from user where user_id=?";
  db.query(sql, id, (err, result) => {
    if (err) {
      next(errorHandler(400, err));
    } else {
      if (result.length <= 0) {
        next(errorHandler(400, "User not found!!"));
      } else {
        const sql = "delete from user where user_id=?";
        db.query(sql, id, (err, data) => {
          if (err) {
            next(errorHandler(400, err));
          } else {
            if (data.affectedRows === 0) {
              next(errorHandler(400, "User is not deleted!!"));
            } else res.send(data);
          }
        });
      }
    }
  });
};

export const changePassword = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const id = parseInt(req.params.id);
  const sql = "SELECT * FROM user WHERE user_id = ?";

  db.query(sql, id, (err, data) => {
    if (err) {
      return next(errorHandler(500, "Server error", err));
    }

    if (data.length === 0) {
      return next(errorHandler(404, "User not found"));
    }

    // Compare the current password
    bcrypt.compare(currentPassword, data[0].password, (err, isMatch) => {
      if (err) {
        return next(errorHandler(500, "Server error", err));
      }

      if (!isMatch) {
        return next(errorHandler(400, "Incorrect current password"));
      }

      // Check if the new password is the same as the current password
      bcrypt.compare(newPassword, data[0].password, (err, isSame) => {
        if (err) {
          return next(errorHandler(500, "Server error", err));
        }

        if (isSame) {
          return next(errorHandler(400, "Please enter a different password"));
        }

        // Hash the new password
        bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
            return next(errorHandler(500, "Server error", err));
          }

          const updateSql = "UPDATE user SET password = ? WHERE user_id = ?";
          db.query(updateSql, [hash, id], (err, result) => {
            if (err) {
              return next(errorHandler(500, "Server error", err));
            }

            res.send({ success: 1, message: "Password changed successfully" });
          });
        });
      });
    });
  });
};

export const changeProfile = (req, res, next) => {
  const profile = req.file.filename;
  const id = parseInt(req.params.id);

  const sql = "UPDATE user SET profile = ? WHERE user_id = ?";

  db.query(sql, [profile, id], (err, data) => {
    if (err) {
      return next(errorHandler(500, "Something went wrong, please try later"));
    }
    res.send({ success: 1, message: "Profile updated successfully", data });
  });
};

export const forgetPassword = (req, res,next) => {
  const { email } = req.body;
  const generateOTP = () => Math.floor(1000 + Math.random() * 9000);
  const otp = generateOTP();
  const sql = "select * from user where email=?";
  db.query(sql, email, (err, data) => {
    if (err) {
      return next(errorHandler(500, "Something went wrong"));
    } else {
      if (data.length === 0) {
        return next(errorHandler("Email not valid"));
      } else  {
        const msg = `<div>
        <h1>Hi, ${email},This is your reset password OTP: <span style="color:blue">${otp}</span> Please reset password it on <a href="http://localhost:5173">AppName</a>.</h1>
      </div>`;

        sendMail({
          receiver: email,
          subject: "Mail Verification",
          text: "msg",
          html: msg,
        })
          .then((messageId) => {
            console.log("Email sent successfully with Message ID:", messageId);
            const sql = "UPDATE user SET otp=? WHERE email=?";
            db.query(sql, [otp, email], (err, data) => {
              if (err) {
                return next(errorHandler(500, "Something went wrong!!"));
              } else {
                res
                  .status(200)
                  .send({ message: "OTP send successfully", data: data });
              }
            });
          })
          .catch((error) => {
            return next(errorHandler("Failed to send email:", error));
          });
      }
    }
  });
};

export const verifyForgetOtp = (req, res,next) => {
  const { email, otp } = req.body;
  const sql = "SELECT * FROM user WHERE email = ? AND otp = ?";

  db.query(sql, [email, otp], (err, result) => {
    if (err) {
      return next(errorHandler(500,err))
    }
    if (result.length > 0) {
      res.send("otp is correct");
    } else {
      return next(errorHandler(400,"Invalid OTP"));
    }
  });
};

export const changeNewPassword = (req, res,next) => {
  const { email, password } = req.body;
  const sql = "update user set password=? where email=?";
  bcrypt.hash(password,10,(err,hash) => {
    if (err) {
      return next(errorHandler(500,err));
    }
    db.query(sql, [hash, email], (err, data) => {
      if (err) {
        return next(errorHandler(500,err));
      } else {
        res.send({ message: `password change successfully`, data });
      }
    });
  })
 
};
