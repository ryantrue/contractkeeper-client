import React, { useState } from 'react';
import { createContract } from '../services/api';
import { Contract } from '../types/user';

const CreateContract: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const contract: Contract = { id: 0, user_id: 1, title, description, created_at: '', updated_at: '' };
        const newContract = await createContract(contract);
        console.log('Contract created:', newContract);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit">Create Contract</button>
        </form>
    );
};

export default CreateContract;