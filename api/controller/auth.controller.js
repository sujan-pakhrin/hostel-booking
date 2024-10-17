import bcrypt from "bcryptjs";
import db from "../db.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const Login = (req, res, next) => {
      const { email, password } = req.body;

      if (!email || !password) {
            return next(errorHandler(400, "Email and password are required"));
      }

      const sql = "SELECT * FROM user WHERE email=?";
      db.query(sql, [email], (err, data) => {
            if (err) {
                  return next(errorHandler(500, err));
            }

            if (!data[0]) {
                  return next(errorHandler(402, "Invalid Email"));
            }

            if (data[0].isVerified === 0) {
                  return next(errorHandler(402, "You are not verified"));
            }

            // Use bcrypt.compare instead of compareSync
            bcrypt.compare(password, data[0].password, (err, result) => {
                  if (err) {
                        return next(errorHandler(500, err));
                  }

                  if (result) {
                        console.log(data[0]);
                        const {
                              password: hashedPassword,
                              isAdmin,
                              ...others
                        } = data[0];
                        const token = jwt.sign(
                              { id: data[0].user_id, isAdmin: data[0].isAdmin },
                              process.env.JWT
                        );
                        res.cookie("access_token", token, {
                              httpOnly: true,
                        })
                              .status(200)
                              .json({ details: others, isAdmin });
                  } else {
                        return next(errorHandler(401, "Incorrect Password"));
                  }
            });
      });
};
