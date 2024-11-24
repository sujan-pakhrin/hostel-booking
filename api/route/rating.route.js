import express from "express";
import { createReviewRating, deleteReviewRating, getReviewRatingByHostelId, updateReviewRating } from "../controller/rating.controller.js";

const router = express.Router();

router.get('/rating',getReviewRatingByHostelId)
router.post('/rating',createReviewRating)
router.put('/rating/:id',updateReviewRating)
router.delete('/rating/:id',deleteReviewRating)

export default router;
