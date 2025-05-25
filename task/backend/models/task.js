import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
   iduser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
   },
   task: {
    type: String,
    required: true,
    trim: true
   },
   createdAt: {
    type: Date,
    default: Date.now,
   },
   
})

const Task = mongoose.model('Task', taskSchema);

export default Task;

