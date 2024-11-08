import db from "../db.js";
import { errorHandler } from "../utils/error.js";

export const createReviewRating = (req, res, next) => {
    const { user_id, hostel_id, room_id, rating, review } = req.body;
    const sql =
        "select * from rating where user_id = ? and hostel_id = ? and room_id=?";
    const values = [user_id, hostel_id, room_id];
    db.query(sql, values, (err, result) => {
        if (err) {
            return next(errorHandler(400, err));
        }
        if (result.length > 0) {
            return next(
                errorHandler(
                    400,
                    "You already provide the rating for this room"
                )
            );
        }
        const sql =
            "select * from booking where user_id=? and hostel_id=? and room_id=?";
        db.query(sql, values, (err, result) => {
            if (err) {
                return next(errorHandler(400, err));
            }
            if (result.length === 0) {
                return next(errorHandler(400, "You have not booked this room"));
            }
            const sql = "insert into rating set?";
            const values = { user_id, hostel_id, room_id, rating, review };
            db.query(sql, values, (err, result) => {
                if (err) {
                    return next(errorHandler(400, err));
                }
                res.status(200).json({
                    message: "Review and rating added successfully",
                });
            });
        });
    });
};

export const updateReviewRating = (req, res, next) => {
    const { user_id, hostel_id, room_id, rating, review } = req.body;
    const id = parseInt(req.params.id);
    const sql = "select * from rating where rating_id=?";

    db.query(sql, id, (err, result) => {
        if (err) {
            return next(errorHandler(400, err));
        }
        if (result.length === 0) {
            return next(errorHandler(400, "No review found with this ID"));
        }
        if (result[0].user_id != parseInt(user_id)) {
            return next(errorHandler(302, "You cannot edit this review"));
        }
        if (
            result[0].hostel_id != parseInt(hostel_id) &&
            result[0].room_id != parseInt(room_id)
        ) {
            return next(errorHandler(400, "You cannot edit this review!!"));
        }
        const sql = "update rating set rating=?, review=? where rating_id=?";
        const values = [rating, review, id];
        db.query(sql, values, (err, result) => {
            if (err) {
                return next(errorHandler(400, err));
            }
            res.status(200).json({ message: "Review updated successfully" });
        });
    });
};

export const deleteReviewRating = (req, res, next) => {
      const id = parseInt(req.params.id);
      const sql = "delete from rating where rating_id=?";
      db.query(sql, id, (err, result) => {
            if (err) {
                  return next(errorHandler(400, err))
            }
            if (result.affectedRows === 0) {
                  return next(errorHandler(400, "No review found with this ID"));
            }
            res.status(200).json({ message: "Review deleted successfully" });
      });
}
