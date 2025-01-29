import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true //stores createdAt and updatedAt to schema
});

const Note = mongoose.model('Note', noteSchema);

export default Note;