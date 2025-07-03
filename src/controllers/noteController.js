import * as noteService from "../services/noteService.js";

export const createNote = async (req, res) => {
  try {
    // Assuming you have a Note model defined

    const newNote = await noteService.createNote(req.body);
    return res.status(201).json(newNote);
  } catch (error) {
    return res.status(500).json({ message: "Error creating note", error });
  }
};

export const getAllNotesByUser = async (req, res) => {
  try {
    const response = await noteService.getAllNotesByUser(req.headers.uid);
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error fetching notes:", err);

    return res
      .status(500)
      .json({ message: "Error fetching notes", error: err });
  }
};

export const getNotesByUser = async (req, res) => {
  try {
    const response = await noteService.getNotesByUser(
      req.headers.uid,
      req.params.noteId
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error fetching notes by user:", err);
    return res
      .status(500)
      .json({ message: "Error fetching notes by user", error: err });
  }
};

export const updateNote = async (req, res) => {
  try {
    const response = await noteService.updateNote(
      req.headers.uid,
      req.params.noteId,
      req.body
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error updating note:", err);
    return res.status(500).json({ message: "Error updating note", error: err });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const response = await noteService.deleteNote(
      req.headers.uid,
      req.params.noteId
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error deleting note:", err);
    return res.status(500).json({ message: "Error deleting note", error: err });
  }
};
