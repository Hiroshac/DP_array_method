import express from "express";
import { CreateTickets } from "../controllers/Ticket.controller.js";

const router = express.Router();

//create innovation
router.post("/add", CreateTickets);

export default router;