import express from "express";
import { createReviewRating, deleteReviewRating, updateReviewRating } from "../controller/rating.controller.js";

const router = express.Router();

router.post('/rating',createReviewRating)
router.put('/rating/:id',updateReviewRating)
router.delete('/rating/:id',deleteReviewRating)

export default router;
