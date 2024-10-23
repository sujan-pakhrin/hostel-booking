import db from "../db.js";
import { errorHandler } from "../utils/error.js";

// export const addBook =(req,res,next) =>{
//       const {hostel_id,room_id,user_id,total_guest,check_in,check_out,total_amount}=req.body;
//       const created_at=new Date()
//       const sql = "INSERT INTO booking SET hostel_id=?, room_id=?, user_id=?, total_guest=?, check_in=?, check_out=?,total_amount=?,created_at=?";
//       const values = [hostel_id,room_id,user_id,total_guest,check_in,check_out,total_amount,created_at];
//       db.query(sql, values, (err, result) => {
//             if (err) {
//                 return next(errorHandler(500, err));
//             } else {
//                 res.status(201).json({ message: "Booking added successfully" });
//             }
//       })
// }
export const addBook = (req, res, next) => {
    const {
        hostel_id,
        room_id,
        user_id,
        total_guest,
        check_in,
        check_out,
        total_amount,
    } = req.body;
    const created_at = new Date();
    const sql = "SELECT * FROM room WHERE room_id = ? AND hostel_id = ?";
    const values = [room_id, hostel_id];
    db.query(sql, values, (err, result) => {
        if (err) {
            return next(errorHandler(500, err));
        }
        if (result.length === 0) {
            return next(errorHandler(401, "Room not found!!"));
        }
        const checkSql = `SELECT * FROM booking
                        WHERE room_id = ?
                        AND hostel_id = ?
                        AND (
                              (check_in < ? AND check_out > ?) OR
                              (check_in < ? AND check_out > ?) OR
                              (check_out = ?)OR
                              (check_in = ?)

                        )`;
        const checkValues = [
            room_id,
            hostel_id,
            new Date(check_out),
            new Date(check_in),
            new Date(check_in),
            new Date(check_out),
            new Date(check_in),
            new Date(check_out),
        ];

        db.query(checkSql, checkValues, (err, results) => {
            if (err) {
                return next(errorHandler(500, err));
            }

            if (results.length > 0) {
                return res.status(409).json({
                    message: "Room is already booked for the selected dates.",
                });
            }

            const sql = `INSERT INTO booking 
                        SET hostel_id=?, room_id=?, user_id=?, total_guest=?, check_in=?, check_out=?, total_amount=?, created_at=?`;
            const values = [
                hostel_id,
                room_id,
                user_id,
                total_guest,
                new Date(check_in),
                new Date(check_out),
                total_amount,
                created_at,
            ];

            db.query(sql, values, (err, result) => {
                if (err) {
                    return next(errorHandler(500, err));
                } else {
                    res.status(201).json({
                        message: "Booking added successfully",
                    });
                }
            });
        });
    });
};


