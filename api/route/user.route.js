import express from 'express'
import { changePassword, changeProfile, createUser, deleteUser, getUser, getUsers, updateUser } from '../controller/user.controller.js';
import upload from '../middleware/multerconfig.js';
const router = express.Router()




router.get('/user', getUsers)
router.get('/user/:id', getUser)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)
router.put('/user/password/:id',changePassword)
router.put('/user/profile/:id', upload.single("profile"),changeProfile)


export default router;