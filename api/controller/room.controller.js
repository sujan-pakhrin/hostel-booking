import db from "../db.js";
import { errorHandler } from "../utils/error.js";

export const addRoom = (req, res, next) => {
    const { hostel_id, room_number, capacity, total_bed, bathroom } = req.body;
    const sql = "select * from room where room_number=?";
    const created_at=new Date();
    db.query(sql, [room_number], (err, data) => {
        if (err) {
            return next(errorHandler(500, err));
        } else {
            if (data.length > 0) {
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
                    created_at
                ];
                db.query(sql, values, (err, result) => {
                    if (err) {
                        return next(errorHandler(500, err));
                    } else {
                        res.status(201).json({
                            message: "Room added successfully",
                            roomId: result.insertId,
                        });
                    }
                });
            }
        }
    });
};
