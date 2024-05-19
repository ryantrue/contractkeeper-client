import React, { useState, useEffect } from 'react';
import { getContract, updateContract } from '../services/api';
import { Contract } from '../types/user';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditContract: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [contract, setContract] = useState<Contract | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContract = async () => {
            if (id) {
                const fetchedContract = await getContract(parseInt(id));
                setContract(fetchedContract);
                setTitle(fetchedContract.title);
                setDescription(fetchedContract.description);
            }
        };
        fetchContract();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (contract) {
            const updatedContract = { ...contract, title, description };
            await updateContract(updatedContract);
            toast.success('Contract updated successfully!');
            navigate('/dashboard');
        }
    };

    return (
        <div>
            <h2>Edit Contract</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Update Contract</button>
            </form>
        </div>
    );
};

export default EditContract;