import mongoose from 'mongoose';
const ToDoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notes: {
        type: String,
    },
    color: {
        type: Number
    },
})

export default mongoose.models.ToDo || mongoose.model('ToDo', ToDoSchema)