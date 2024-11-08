import db from "../db.js";
import { errorHandler } from "../utils/error.js";

export const getBookings = (req, res, next) =>{
    const sql = "SELECT * FROM booking";
    db.query(sql, (err, data) => {
        if (err) {
            next(errorHandler(500, err));
        } else {
            res.send(data);
        }
    });
}
export const getSingleBooking = (req, res, next) =>{
    const sql = "SELECT * FROM booking WHERE booking_id=?"
    const id=parseInt(req.params.id)
    db.query(sql, id, (err, data) => {
        if(err){
            return next(errorHandler(400, err));
        }
        if(data.length<=0){
            return next(errorHandler(400, "Booking not found!!"));
        }
        res.send(data[0]);
    })
}
export const getBookingById = (req, res, next) =>{
    const sql = "SELECT * FROM booking WHERE user_id=?";
    const id = parseInt(req.params.user_id);
    db.query(sql, [id], (err, data) => {
        if (err) {
            return next(errorHandler(500, err));
        }
        
        res.send(data);
    });
}

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
        const sql = `select * from booking where user_id=? and room_id=? and hostel_id=?`;
        const values = [user_id, room_id, hostel_id];
        db.query(sql, values, (err, data) => {
            if (err) {
                return next(errorHandler(500, err));
            }
            const checkInDates = data.map(
                (booking) => new Date(booking.check_in)
            );
            console.log(checkInDates);
            const latestCheckIn = new Date(Math.max(...checkInDates));
            if (data.length && latestCheckIn > created_at) {
                const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                };

                const checkInDate = new Date(latestCheckIn).toLocaleDateString(
                    "en-US",
                    options
                );

                return next(
                    errorHandler(
                        400,
                        `You already booked this room from ${checkInDate}`
                    )
                );
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
                        message:
                            "Room is already booked for the selected dates.",
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
    });
};

export const updateBooking = (req, res, next) => {
    const { total_guest, check_in, check_out, user_id } = req.body;
    const id = parseInt(req.params.id);
    const updated_at = new Date();
    const sql = "select * from booking where booking_id=?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return next(errorHandler(400, err));
        }
        if (data.length <= 0) {
            return next(errorHandler(400, "Booking not found!!"));
        }
        const booking = data[0];
        const sql = `SELECT * FROM booking
                        WHERE room_id = ?
                        AND hostel_id = ?
                        AND user_id!=?
                        AND (
                            (check_in < ? AND check_out > ?) OR
                            (check_in < ? AND check_out > ?) OR
                            (check_out = ?)OR
                            (check_in = ?)

                        )`;
        const values = [
            booking.room_id,
            booking.hostel_id,
            booking.user_id,
            new Date(check_out),
            new Date(check_in),
            new Date(check_in),
            new Date(check_out),
            new Date(check_in),
            new Date(check_out),
        ];
        db.query(sql, values, (err, result) => {
            console.log(result);
            if (err) {
                return next(errorHandler(400, err));
            }
            if (result.length > 0) {
                return res.status(409).json({
                    message: "Room is already booked for the selected dates.",
                });
            }
            const sql = `UPDATE booking 
                            SET total_guest=?, check_in=?, check_out=?, updated_at=? 
                            WHERE booking_id=?`;
            const values = [total_guest, check_in, check_out, updated_at, id];
            db.query(sql, values, (err, result) => {
                if (err) {
                    return next(errorHandler(400, err));
                }
                if (result.affectedRows === 0) {
                    return next(errorHandler(400, "No booking found with this ID"));
                }
                res.status(200).json({ message: "Booking updated successfully" });
            })
        });
    });
};

export const deleteBooking=(req,res,next)=>{
    const id = req.params.id;
    const sql = "DELETE FROM booking WHERE booking_id=?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return next(errorHandler(500, err));
        }
        if (result.affectedRows === 0) {
            return next(errorHandler(400, "No booking found with this ID"));
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    })
}
