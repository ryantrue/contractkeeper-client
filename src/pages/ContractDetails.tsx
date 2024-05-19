import React, { useState, useEffect } from 'react';
import { getContract } from '../services/api';
import { Contract } from '../types/user';
import { useParams } from 'react-router-dom';

const ContractDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [contract, setContract] = useState<Contract | null>(null);

    useEffect(() => {
        const fetchContract = async () => {
            if (id) {
                const fetchedContract = await getContract(parseInt(id));
                setContract(fetchedContract);
            }
        };
        fetchContract();
    }, [id]);

    if (!contract) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Contract Details</h2>
            <p><strong>Title:</strong> {contract.title}</p>
            <p><strong>Description:</strong> {contract.description}</p>
        </div>
    );
};

export default ContractDetails;