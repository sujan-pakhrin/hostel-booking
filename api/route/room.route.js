import express from "express";
import { addRoom, deleteRoom, getRoom, getRoomsByHostelId, updateRoom } from "../controller/room.controller.js";
import upload from "../middleware/multerconfig.js";

const router = express.Router();

router.get("/room", getRoomsByHostelId);
router.get("/room/:id", getRoom);
router.post("/room", upload.array("room_img"), addRoom);
router.put("/room/:id", updateRoom);
router.delete("/room/:id", deleteRoom);

export default router;
