import db from "../db.js";
import { errorHandler } from "../utils/error.js";

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const validateCoordinates = (latitude, longitude) => {
      const latNum = parseFloat(latitude);
      const lonNum = parseFloat(longitude);
  
      return (
          !isNaN(latNum) &&
          !isNaN(lonNum) && // Corrected this line
          latNum >= -90 && 
          latNum <= 90 && 
          lonNum >= -180 && 
          lonNum <= 180
      );
  };
export const addHostel = (req, res, next) => {
    const {
        name,
        city,
        state,
        country,
        postal_code,
        phone,
        email,
        latitude,
        longitude,
    } = req.body;
    const created_at = new Date();

    let imagePath = [];
    const images = req.files;
    images.forEach((image) => {
        imagePath.push(image.filename);
    });

    if (
        !name ||
        !city ||
        !state ||
        !country ||
        !postal_code ||
        !phone ||
        !email ||
        !latitude ||
        !longitude
    ) {
        return next(errorHandler(400, "All fields are required"));
    }

    if (!validateEmail(email)) {
        return next(errorHandler(400, "Invalid email format"));
    }

    if (!validateCoordinates(latitude, longitude)) {
        return next(
            errorHandler(
                400,
                "Latitude must be between -90 and 90, and longitude must be between -180 and 180"
            )
        );
    }
    const sql =
        "INSERT INTO hostel (name, city, state, country, postal_code, phone, email, latitude, longitude,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const values = [
        name,
        city,
        state,
        country,
        postal_code,
        phone,
        email,
        latitude,
        longitude,
        created_at,
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            return next(errorHandler(500, "Database query error"));
        } else {
            const insertImagePromises = imagePath.map((path) => {
                const imageSql =
                    "INSERT INTO image (path, hostel_id) VALUES (?, ?)";
                const imageValues = [path, result.insertId];
                return new Promise((resolve, reject) => {
                    db.query(imageSql, imageValues, (err) => {
                        if (err) {
                            return reject(
                                new Error(
                                    "Database query error while inserting images"
                                )
                            );
                        }
                        resolve();
                    });
                });
            });
            Promise.all(insertImagePromises)
                .then(() => {
                    res.status(200).json({
                        message: "Hostel added successfully",
                        hostelId: result.insertId,
                    });
                })
                .catch((error) => {
                    next(errorHandler(500, error.message));
                });
        }
    });
};

export const getHostels = (req, res, next) => {};

export const getHostelById = (req, res, next) => {};

export const updateHostelById = (req, res, next) => {
    const {
        name,
        city,
        state,
        country,
        postal_code,
        phone,
        email,
        latitude,
        longitude,
    } = req.body;
    const updated_at = new Date();
    const id = parseInt(req.params.id);
    const sql =
        "UPDATE hostel SET name=?, city=?, state=?, country=?, postal_code=?, phone=?, email=?, latitude=?, longitude=?, updated_at=? WHERE hostel_id=?";
    const values = [
        name,
        city,
        state,
        country,
        postal_code,
        phone,
        email,
        latitude,
        longitude,
        updated_at,
        id,
    ];
    if (!validateEmail(email)) {
        return next(errorHandler(400, "Invalid email format"));
    }

    if (!validateCoordinates(latitude, longitude)) {
        return next(
            errorHandler(
                400,
                "Latitude must be between -90 and 90, and longitude must be between -180 and 180"
            )
        );
    }
    db.query(sql, values, (err, data) => {
        if (err) {
            return next(errorHandler(400, err));
        }
        if (data.affectedRows === 0) {
            return next(errorHandler(400, "No hostel found with this ID"));
        }
        res.status(200).send({
            message: "Hostel updated successfully",
            data,
        });
    });
};

export const deleteHostelById = (req, res, next) => {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM hostel WHERE hostel_id=?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return next(errorHandler(400, err));
        }
        if (data.affectedRows === 0) {
            return next(errorHandler(400, "No hostel found with this ID"));
        }
        res.status(200).send({ message: "Hostel deleted successfully" });
    });
};
