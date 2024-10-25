
import express from "express"
import { addBook, updateBooking } from "../controller/book.controller.js"

const router=express.Router()

router.post('/book',addBook)
router.put('/book/:id',updateBooking)

export default router