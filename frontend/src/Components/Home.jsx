import React, { useState, useEffect } from 'react'
import { RxUpdate } from "react-icons/rx";
import './Home.css'
import axios from 'axios';
import UpdateForm from './UpdateForm';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {

    const [notes, setNotes] = useState([]);
    const [task, setTazk] = useState('');
    const [reminderDate, setReminderDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [userName, setUserName] = useState('');

    // Get task from userId
    const fetchTodos = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            return;
        };
        try {
            const res = await axios.get(`http://localhost:5000/api/todos/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNotes(res.data);
        } catch (err) {
            console.log('Error fetching todos:', err);
        }
    };

    // Create Task
    const addDoto = async (e) => {
        e.preventDefault();

        if (task.trim() === '') {
            alert('Please Enter your Task..');
            return;
        }
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const demo = {
            task,
            reminderDate,
            reminderTime,
            user: userId
        };

        console.log("Sending Todo:", {
            task,
            reminderDate,
            reminderTime,
            user: localStorage.getItem('userId')
        });

        try {
            await axios.post('http://localhost:5000/api/todos', demo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log('Todo created:', res.data);
            }).catch(err => {
                console.error('Error adding todo', err);
            })
            console.log("Task Payload:", demo);
            console.log("User ID from localStorage:", userId);
            setTazk('');
            setReminderDate('');
            setReminderTime('');
            fetchTodos();
        } catch (err) {
            console.log("Error adding todo", err);
        }
    };

    // Delete DoTo
    const deleteDoto = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            fetchTodos();
        } catch (err) {
            console.log('Delete error:', err.response?.data || err.message);
        }
    }

    // Update DoTo
    const handleUpdate = async (id, updatedData) => {
        if (!updatedData.task || updatedData.task.trim() === '') {
            alert('Task cannot be empty');
            return;
        }

        try {
            const res = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedData);
            const updatedTodos = notes.map((note) =>
                note._id === id ? res.data : note
            );
            setNotes(updatedTodos);
        }
        catch (err) {
            console.log('Error updating task:', err);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const today = new Date().toISOString().split('T')[0];

    return (
        <div>
            <h1>📝TODO LIST⏰</h1>
            <div className="frm">
                <form className='inpt-form'>
                    <input type="text"
                        placeholder='Add your Task..'
                        required
                        value={task}
                        onChange={(e) => setTazk(e.target.value)}
                    />
                    <input type="date"
                        min={today}
                        value={reminderDate}
                        onChange={(e) => setReminderDate(e.target.value)}
                    />
                    <input type="time"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                    />
                    <button onClick={addDoto}>ADD</button>

                </form>
                <div className="current-user">
                    <h3>Welcome, <span>{userName}!</span></h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div>
                <ul className='listz'>
                    {notes.map((note) => (
                        <li key={note._id}>
                            <span className="task-text">{note.task}</span>

                            <span className="reminder-text">
                                {note.reminderDate && <span className="date-text">{note.reminderDate}</span>}
                                {note.reminderTime && <span className="time-text">{note.reminderTime}</span>}
                            </span>

                            <div className="btn-group">
                                <button onClick={() => setSelectedTodo(note)}>
                                    <RxUpdate />
                                </button>
                                <button onClick={() => deleteDoto(note._id)}>X</button>
                            </div>
                        </li>
                    ))}

                    {selectedTodo && (
                        <UpdateForm
                            note={selectedTodo}
                            onUpdate={handleUpdate}
                            onClose={() => setSelectedTodo(null)}
                        />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Home
