import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Note from './models/Note.js';

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
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
});

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Note.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Note was successfully deleted" });
    } catch (error) {
        console.error("Error while deleting note:", error.message);
        res.status(404).json({ success: false, message: "Note not found" });
    }
})

app.listen(3000, () => {
    connectDB();
    console.log('Server started at port 3000');
});

// end at 32.12