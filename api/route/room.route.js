import express from "express";
import { addRoom } from "../controller/room.controller.js";

const router=express.Router();

router.post('/room',addRoom)

export default router