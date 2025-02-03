import mongoose from 'mongoose';
import Note from '../models/Note.js';

export const getNotes = async (req, res) => {
    try {
        // passing in empty curly braces returns all products in the database
        const products = await Note.find({});
        res.status(200).json({ success: true, data: products, message: "All notes successfully retreived" });
    } catch (error) {
        console.error("Error while retrieving notes:", error.message);
        res.status(500).json({ success: false, message: "Server Error: Could not retrieve all notes" });
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const note = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid ID for note" });
    }

    try {
        const updated = await Note.findByIdAndUpdate(id, note, {new:true});
        res.status(200).json({ successs: true, data: updated, message: "Note was successfully updated" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error: Could not update note" });
    }
}

export const createNote = async (req, res) => {
    const note = req.body;
    
    if (!note.name || !note.note) {
        return res.status(400).json({ success: false, message: "A name and note should be provided for each note!" });
    }

    const NewNote = new Note(note);

    try {
        await NewNote.save();
        res.status(201).json({ success: true, data: NewNote, message: "A note was successfully created!" });
    } catch (error) {
        console.error("Error while creating note:", error.message);
        res.status(500).json({ success: false, message: "Server Error: Could not create note" });
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid ID for note" });
    }
    
    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Note was successfully deleted" });
    } catch (error) {
        console.error("Error while deleting note:", error.message);
        res.status(500).json({ success: false, message: "Server Error: Could not delete note" });
    }
}