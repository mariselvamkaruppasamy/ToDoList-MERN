import React, { useState } from 'react'
import './UpdateForm.css'

const UpdateForm = ({ note, onUpdate, onClose }) => {

    const [newTask, setNewTask] = useState(note.task);
    const [newReminderDate, setNewReminderDate] = useState(note.reminderDate || '');
    const [newReminderTime, setNewReminderTime] = useState(note.reminderTime || '');

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            task: newTask,
            reminderDate: newReminderDate,
            reminderTime: newReminderTime
        }
        onUpdate(note._id, updatedData);
        onClose();
    }

    return (
        <div className='popup'>
            <form className='popup-inner' onSubmit={handleSubmit}>
                <h3>Edit Task</h3>
                <input type="text"
                    required
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <input type="date"
                    min={today}
                    value={newReminderDate}
                    onChange={(e) => setNewReminderDate(e.target.value)}
                />
                <input type="time"
                    value={newReminderTime}
                    onChange={(e) => setNewReminderTime(e.target.value)}
                />
                <br />
                <button type="submit">Update</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    )
}

export default UpdateForm
