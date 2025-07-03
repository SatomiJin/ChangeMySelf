import express from "express";

const router = express.Router();
import * as noteController from "../controllers/noteController.js";

router.post("/create-note", noteController.createNote);
router.get("/get-all-notes-by-user", noteController.getAllNotesByUser);
router.get("/get-notes-by-user/:noteId", noteController.getNotesByUser);
router.put("/update-note/:noteId", noteController.updateNote);
router.delete("/delete-note/:noteId", noteController.deleteNote);
export default router;
