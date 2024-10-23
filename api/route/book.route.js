
import express from "express"
import { addBook } from "../controller/book.controller.js"

const router=express.Router()

router.post('/book',addBook)

export default router