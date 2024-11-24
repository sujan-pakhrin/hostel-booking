import express from 'express';
import { addHostel, deleteHostelById, getHostelById, getHostels, updateHostelById } from '../controller/hostel.controller.js';
import upload from '../middleware/multerconfig.js';

const router =express.Router();

router.get('/hostel',getHostels)
router.get('/hostel/:id',getHostelById)
router.post('/hostel',upload.array('hostel_img'),addHostel)
router.put('/hostel/:id',updateHostelById)
router.delete('/hostel/:id',deleteHostelById)

export default router