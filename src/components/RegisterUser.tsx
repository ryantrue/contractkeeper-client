import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { User } from '../types/user';

const RegisterUser: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const user: User = { id: 0, username, password, created_at: '', updated_at: '' };
        const registeredUser = await registerUser(user);
        console.log('User registered:', registeredUser);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterUser;