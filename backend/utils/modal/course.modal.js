import mongoose, { Schema } from 'mongoose';

// Define the Course Schema
const courseSchema = new Schema(
    {
        courseTitle: { type: String, required: true }, // Fixed key name typo
        courseContent: { type: String, required: true },
        coursePdf: { type: String },
        courseAuthor: { type: String, required: true }, // Fixed key name typo
        faculityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "faculity", // Reference to the faculty collection
            required: true,
        },
    },
    { timestamps: true }
);

// Create the Course Model
const courseModal = mongoose.model("course", courseSchema);

export default courseModal;
