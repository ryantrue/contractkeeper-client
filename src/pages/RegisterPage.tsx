import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { User } from '../types/user';
import { toast } from 'react-toastify';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: User = { id: undefined, username, password, created_at: undefined, updated_at: undefined };
        try {
            await registerUser(newUser);
            toast.success('Registration successful!');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            console.error('Registration failed', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>Register</Typography>
                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary">Register</Button>
                </form>
            </Box>
        </Container>
    );
};

export default RegisterPage;