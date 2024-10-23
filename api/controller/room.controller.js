import db from "../db.js";
import { errorHandler } from "../utils/error.js";

export const addRoom = (req, res, next) => {
    const { hostel_id, room_number, capacity, total_bed, bathroom } = req.body;
    const sql = "select * from room where room_number=?";

    const created_at = new Date();
    const imagePath = [];
    const images = req.files;
    images.forEach((image) => {
        imagePath.push(image.filename);
    });
    db.query(sql, [room_number], (err, data) => {
        if (err) {
            return next(errorHandler(500, err));
        } else {
            if (data.length > 0 && data[0].hostel_id === parseInt(hostel_id)) {
                return next(errorHandler(409, "Room already exists"));
            } else {
                const sql =
                    "INSERT INTO room (hostel_id, room_number, capacity, total_bed, bathroom,created_at) VALUES (?,?,?,?,?,?)";
                const values = [
                    hostel_id,
                    room_number,
                    capacity,
                    total_bed,
                    bathroom,
                    created_at,
                ];
                db.query(sql, values, (err, result) => {
                    if (err) {
                        return next(errorHandler(500, err));
                    } else {
                        const insertImagePromises = imagePath.map((path) => {
                            const imageSql =
                                "INSERT INTO image (path, room_id) VALUES (?, ?)";
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
                                    message: "Room added successfully",
                                    hostelId: result.insertId,
                                });
                            })
                            .catch((error) => {
                                next(errorHandler(500, error.message));
                            });
                    }
                });
            }
        }
    });
};

export const updateRoom = (req, res, next) => {
    const { capacity, total_bed, bathroom } = req.body;
    const updated_at = new Date();
    const id = parseInt(req.params.id);
    const sql = "select * from room where room_id=?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return next(errorHandler(400, err));
        } else {
            if (data.length <= 0) {
                return next(errorHandler(400, "Room not found!!"));
            } else {
                const sql =
                    "UPDATE room SET capacity=?, total_bed=?, bathroom=?, updated_at=? WHERE room_id=?";
                const values = [capacity, total_bed, bathroom, updated_at, id];
                db.query(sql, values, (err, data) => {
                    if (err) {
                        return next(errorHandler(400, err));
                    }
                    if (data.affectedRows === 0) {
                        return next(
                            errorHandler(400, "No room found with this ID")
                        );
                    }
                    res.status(200).send({
                        message: "Room updated successfully",
                        data,
                    });
                });
            }
        }
    });
};

export const deleteRoom = (req, res, next) => {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM image WHERE room_id=?";
    db.query(sql, id, (err, data) => {
        if (err) {
            return next(errorHandler(400, err));
        }
        const sql = "DELETE  FROM room WHERE room_id=?";
        db.query(sql, id, (err, result) => {
            if (err) {
                return next(errorHandler(400, err));
            }
            if (result.affectedRows === 0) {
                return next(errorHandler(400, "No room found with this ID"));
            }
            res.status(200).send({ message: "Room deleted successfully" });
        });
    });
};
