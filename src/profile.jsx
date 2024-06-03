import React, { useState, useEffect } from 'react';
import './profile.css'
import { useTweetContext } from './tweetContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ setUsername }) => {
    const [newUsername, setNewUsername] = useState('');
    const [currentUsername, setCurrentUsername] = useState(
        localStorage.getItem('currentUsername') || 'Good boy'
    );
    const [successMessage, setSuccessMessage] = useState('');
    const { authenticated } = useTweetContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!authenticated) {
            navigate('/login');
            console.log('User is not authenticated. Redirecting...');
        }
    }, [authenticated]);

    const handleChangeUsername = (e) => {
        setNewUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://655e4d7c9f1e1093c59adfe0.mockapi.io/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: newUsername }),
            });

            if (response.ok) {
                console.log('Username updated successfully on the server.');
                setCurrentUsername(newUsername);
                localStorage.setItem('currentUsername', newUsername);
                setSuccessMessage('Username updated successfully!');
                setNewUsername('');
                setUsername(newUsername);
            } else {
                console.error('Failed to update username on the server.');
            }
        } catch (error) {
            console.error('Error updating username:', error);
        }
    };

    return (
        <div className='changeName'>
            <div className='info'>
                <h2 >Profile</h2>
                <p > User Name</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input className='input' type="text" value={newUsername} onChange={handleChangeUsername} placeholder={currentUsername} />
                <button className='button' type="submit">Save</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default UserProfile;