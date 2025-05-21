import express from 'express'
import { getChatMessages, sendMessage } from '../controllers/message.controller.js';
import { isAuthenticated } from '../Middleware/authUser.js';

const router=express.Router();

router.post("/send/:id",isAuthenticated, sendMessage);
router.get("/get-all/:id",isAuthenticated, getChatMessages);

export default router;