import { useState, useEffect } from 'react';
import { getContracts, deleteContract, createContract, updateContract, getContract } from '../services/api';
import { Contract } from '../types/user';

export const useContracts = (currentPage: number, itemsPerPage: number) => {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [totalContracts, setTotalContracts] = useState(0);

    useEffect(() => {
        const fetchContracts = async () => {
            const fetchedContracts = await getContracts(currentPage, itemsPerPage);
            setContracts(fetchedContracts.items);
            setTotalContracts(fetchedContracts.total);
        };

        fetchContracts();
    }, [currentPage, itemsPerPage]);

    const handleDelete = async (id: number) => {
        await deleteContract(id);
        setContracts(contracts.filter(contract => contract.id !== id));
    };

    const handleCreate = async (contract: Contract) => {
        const newContract = await createContract(contract);
        setContracts([...contracts, newContract]);
    };

    const handleUpdate = async (contract: Contract) => {
        const updatedContract = await updateContract(contract);
        setContracts(contracts.map(c => (c.id === updatedContract.id ? updatedContract : c)));
    };

    const handleGetContract = async (id: number) => {
        return await getContract(id);
    };

    return {
        contracts,
        totalContracts,
        handleDelete,
        handleCreate,
        handleUpdate,
        handleGetContract,
    };
};