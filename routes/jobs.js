import express from "express";
import { addJob, getJobs } from "../controllers/jobController.js";
import auth from "../middleware/auth.js";

// Express Router
const router = express.Router();

// Route um ein job hinzuzufügen
router.post("/", auth, addJob);

// Route um alle jobs abzurufen
router.get("/", auth, getJobs);

export default router;
