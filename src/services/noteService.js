export const createNote = async (data) => {
  try {
    if (!data.title || !data.content) {
      return {
        status: "ERROR",
        message: "Title and content are required",
      };
    }
    if (!data.userId) {
      return {
        status: "ERROR",
        message: "Please login to create a note",
      };
    }
    const newNote = await db.Note.create({
      data: {
        title: data.title,
        content: data.content,
        userId: data.userId,
      },
    });
    if (!newNote) {
      return {
        status: "ERROR",
        message: "Failed to create note",
      };
    }
    return {
      status: "SUCCESS",
      message: "Note created successfully",
      data: newNote,
    };
  } catch (err) {
    console.error("Error creating note:", err);
    return {
      status: "ERROR",
      message: "Error creating note",
    };
  }
};

export const getAllNotesByUser = async (uid) => {
  try {
    if (!uid) {
      return {
        status: "ERROR",
        message: "Please login to view notes",
      };
    }

    let listNotes = await db.Note.findMany({
      where: {
        userId: uid,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (listNotes.length <= 0) {
      return {
        status: "SUCCESS",
        message: "No notes found",
        data: [],
      };
    }

    return {
      status: "SUCCESS",
      message: "Notes fetched successfully",
      data: listNotes,
    };
  } catch (err) {
    console.error("Error fetching notes:", err);
    return {
      status: "ERROR",
      message: "Error fetching notes",
    };
  }
};

export const getNotesByUser = async (uid, noteId) => {
  try {
    if (!uid || !noteId) {
      return {
        status: "ERROR",
        message: "Missing parameters",
      };
    }
    let note = await db.Note.findUnique({
      where: {
        id: noteId,
        userId: uid,
      },
    });
    if (!note) {
      return {
        status: "ERROR",
        message: "Note not found or you do not have permission to view it",
      };
    }
    return {
      status: "SUCCESS",
      message: "Note fetched successfully",
      data: note,
    };
  } catch (err) {
    console.error("Error fetching notes by user:", err);
    return {
      status: "ERROR",
      message: "Error fetching notes by user",
    };
  }
};

export const updateNote = async (uid, noteId, data) => {
  try {
    if (!uid || !noteId || !data) {
      return {
        status: "ERROR",
        message: "Missing parameters",
      };
    }
    const noteFind = await db.Note.findUnique({
      where: {
        id: noteId,
        userId: uid,
      },
    });
    if (!noteFind) {
      return {
        status: "ERROR",
        message: "Note not found or you do not have permission to update it",
      };
    }
    const updatedNote = await db.Note.update({
      where: {
        id: noteId,
      },
      data: {
        title: data.title || noteFind.title,
        content: data.content || noteFind.content,
      },
    });
    return {
      status: "SUCCESS",
      message: "Note updated successfully",
      data: updatedNote,
    };
  } catch (err) {
    console.error("Error updating note:", err);
    return {
      status: "ERROR",
      message: "Error updating note",
    };
  }
};

export const deleteNote = async (uid, noteId) => {
  try {
    if (!uid || !noteId) {
      return {
        status: "ERROR",
        message: "Missing parameters",
      };
    }
    const noteFind = await db.Note.findUnique({
      where: {
        id: noteId,
        userId: uid,
      },
    });
    if (!noteFind) {
      return {
        status: "ERROR",
        message: "Note not found or you do not have permission to delete it",
      };
    }
    await db.Note.delete({
      where: {
        id: noteId,
      },
    });
    return {
      status: "SUCCESS",
      message: "Note deleted successfully",
    };
  } catch (err) {
    console.error("Error deleting note:", err);
    return {
      status: "ERROR",
      message: "Error deleting note",
    };
  }
};
