import React, { useState, useEffect } from 'react'
import { FaRegMoon } from "react-icons/fa";
import './Home.css'
import axios from 'axios';

const Home = () => {

    const [notes, setNotes] = useState([]);
    const [inpt, setInpt] = useState('');
    const [darkmode, setDarkmode] = useState(false);

    // Fetch todos
    const fetchTodos = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/todos');
            setNotes(res.data);
        } catch (err) {
            console.log('Error fetching todos:', err);
        }
    };

    // Add new todo
    const addDoto = async () => {
        if (inpt.trim() === '') {
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/todos', { task: inpt });
            setInpt('');
            fetchTodos();
        } catch (err) {
            console.log("Error adding todo", err);
        }
    };

    // Delete DoTo
    const deleteDoto = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            fetchTodos(); // refresh
        } catch (err) {
            console.log('Delete error:', err.response?.data || err.message);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    const togglebg = (e) => {
        e.preventDefault();
        setDarkmode(!darkmode);
    }

    return (
        <div className={darkmode ? 'ctn dark' : 'ctn light'}>
            <h1>TODO LIST</h1>
            <div className="frm">
                <form className='inpt-form'>
                    <input type="text"
                        placeholder='Type..'
                        required
                        value={inpt}
                        onChange={(e) => setInpt(e.target.value)}
                    />
                    <button onClick={addDoto}>ADD</button>
                    <div className='moon-box'>
                        <button onClick={togglebg}><FaRegMoon /></button>
                    </div>
                </form>
            </div>
            <div>
                <ul className='listz'>
                    {notes.map((note) => (
                        <li key={note._id}>
                            {note.task}
                            <button onClick={() => deleteDoto(note._id)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Home
