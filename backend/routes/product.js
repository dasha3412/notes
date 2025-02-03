import express from 'express';
import { getNotes, updateNote, createNote, deleteNote } from '../controllers/controller.js';

const router = express.Router();

router.get("/", getNotes);

router.put("/:id", updateNote);

router.post("/", createNote);

router.delete("/:id", deleteNote)

export default router;