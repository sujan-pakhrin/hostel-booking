import express from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controller/user.controller.js';
import upload from '../middleware/multerconfig.js';
const router = express.Router()




router.get('/user', getUsers)
router.get('/user/:id', getUser)
router.post('/user', upload.single("profile"),createUser)
router.put('/user/:id', upload.single("profile"),updateUser)
router.delete('/user/:id', upload.single("profile"),deleteUser)


export default router;