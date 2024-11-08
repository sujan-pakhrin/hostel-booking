
import express from "express"
import { addBook, deleteBooking, getBookingById, getBookings, getSingleBooking, updateBooking } from "../controller/book.controller.js"

const router=express.Router()

router.get('/book',getBookings)
router.get('/book/:id',getSingleBooking)
router.get('/book/user/:user_id',getBookingById)
router.post('/book',addBook)
router.put('/book/:id',updateBooking)
router.delete('/book/:id',deleteBooking)

export default router