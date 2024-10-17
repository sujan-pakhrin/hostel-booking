import express from 'express';
import { addHostel, deleteHostelById, updateHostelById } from '../controller/hostel.controller.js';
import upload from '../middleware/multerconfig.js';

const router =express.Router();

router.post('/hostel',upload.array('hostel_img'),addHostel)
router.put('/hostel/:id',updateHostelById)
router.delete('/hostel/:id',deleteHostelById)

export default router