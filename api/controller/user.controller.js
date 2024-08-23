import db from "../db.js";
import { errorHandler } from "../utils/error.js";

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
    // console.log(req.file)
    // let imagePath = []
    // const images = req.files
    // images.forEach((image) =>{
    //     imagePath.push(image.filename)
    // })
    const profile = req.file.filename;
    const { f_name, l_name, address, email, phone, password } = req.body;
    const created_at = new Date();

    const sql = "Select * from user where email=?";
    db.query(sql, email, (err, data) => {
        if (err) {
            next(errorHandler(500, err));
        } else if (data.length > 0) {
            next(errorHandler(400, "Email already exist!!", err));
        } else {
            const sql = "Select * from user where phone=?";
            db.query(sql, phone, (err, data) => {
                if (err) {
                    next(errorHandler(500, err));
                } else if (data.length > 0) {
                    next(errorHandler(400, "Phone already exist!!", err));
                } else {
                    const sql =
                        "Insert into user(f_name,l_name,address,email,phone,password,profile,created_at) Values(?,?,?,?,?,?,?,?)";
                    const values = [
                        f_name,
                        l_name,
                        address,
                        email,
                        phone,
                        password,
                        profile,
                        created_at,
                    ];
                    db.query(sql, values, (err, data) => {
                        if (err) {
                            next(errorHandler(500, err));
                        } else {
                            res.send(data);
                        }
                    });
                }
            });
        }
    });
};

export const updateUser = (req, res, next) => {
    const { f_name, l_name, address, email, phone, password } = req.body;
    const id = parseInt(req.params.id);
    const profile = req.file.filename;
    const updated_at = new Date();
    const sql = "select * from user where email=?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            next(errorHandler(400, err));
        } else {
            if (data.length === 0) {
                next(errorHandler(400, "User not found!!"));
            } else if (data[0].email === email && data[0].user_id !== id) {
                next(errorHandler(400, "Email already exists!"));
            } else {
                // console.log("comming")
                const sql = "select * from user where phone=?";
                db.query(sql, [phone], (err, result) => {
                    if (err) {
                        next(errorHandler(400, err));
                    } else {
                        if (
                            result.length > 0 &&
                            result[0].phone === phone &&
                            result[0].user_id !== id
                        ) {
                            next(errorHandler(400, "Phone already exists!"));
                        } else {
                            const existingUserData = result[0];
                            const updatedData = {
                                f_name: f_name || existingUserData.f_name,
                                l_name: l_name || existingUserData.l_name,
                                address: address || existingUserData.address,
                                email: email || existingUserData.email,
                                phone: phone || existingUserData.phone,
                                password: password || existingUserData.password,
                                profile: profile || existingUserData.profile,
                            };
                            // console.log(updatedData);
                            const sql =
                                "UPDATE user SET f_name = ?, l_name = ?, address = ?, email = ?, phone = ?, password = ?, profile = ?, updated_at = ? WHERE user_id = ?";
                            const values = [
                                updatedData.f_name,
                                updatedData.l_name,
                                updatedData.address,
                                updatedData.email,
                                updatedData.phone,
                                updatedData.password,
                                updatedData.profile,
                                updated_at,
                                id,
                            ];
                            db.query(sql, values, (err, data) => {
                                if (err) {
                                    next(errorHandler(400, err));
                                } else {
                                    //   res.send(data)
                                    if (data.affectedRows === 0) {
                                        next(
                                            errorHandler(
                                                400,
                                                "Didnot update the user"
                                            )
                                        );
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





