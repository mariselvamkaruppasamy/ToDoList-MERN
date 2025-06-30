import React, { useState } from 'react'
import { FaRegMoon } from "react-icons/fa";
import './Home.css'

const Home = () => {

    const [notes, setNotes] = useState([]);
    const [inpt, setInpt] = useState('');
    const [darkmode, setDarkmode] = useState(false);

    const togglebg = (e) => {
        e.preventDefault();
        setDarkmode(!darkmode);
    }


    const handleAdd = (e) => {
        e.preventDefault();
        if (inpt.trim() !== '') {
            setNotes([...notes, inpt]);
            setInpt('');
        }
    };

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
                    <button onClick={handleAdd}>ADD</button>
                    <div className='moon-box'>
                        <button onClick={togglebg}><FaRegMoon /></button>
                    </div>
                </form>
            </div>
            <div>
                <ul className='listz'>
                    {notes.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Home
