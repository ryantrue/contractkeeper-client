import React, { useEffect, useState } from 'react';
import { getContracts, deleteContract } from '../services/api';
import { Contract } from '../types/user';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';
import {
    Container, List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField, Box, Typography
} from '@mui/material';

const ContractList: React.FC = () => {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [filteredContracts, setFilteredContracts] = useState<Contract[]>([]);
    const [totalContracts, setTotalContracts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedContractId, setSelectedContractId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContracts = async () => {
            setLoading(true);
            const fetchedContracts = await getContracts(currentPage, itemsPerPage);
            setContracts(fetchedContracts.items);
            setTotalContracts(fetchedContracts.total);
            setLoading(false);
        };

        fetchContracts();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const filtered = contracts.filter(contract =>
            contract.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredContracts(filtered);
    }, [searchTerm, contracts]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDelete = async () => {
        if (selectedContractId !== null) {
            setLoading(true);
            await deleteContract(selectedContractId);
            setContracts(contracts.filter(contract => contract.id !== selectedContractId));
            toast.success('Contract deleted successfully!');
            setLoading(false);
            setOpen(false);
        }
    };

    const handleClickOpen = (id: number) => {
        setSelectedContractId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedContractId(null);
    };

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>Contracts</Typography>
                <TextField
                    fullWidth
                    label="Search contracts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {loading ? <LoadingSpinner /> : (
                    <>
                        <List>
                            {filteredContracts.map((contract) => (
                                <ListItem key={contract.id}>
                                    <ListItemText primary={contract.title} secondary={contract.description} />
                                    <Button variant="outlined" onClick={() => navigate(`/contracts/edit/${contract.id}`)}>Edit</Button>
                                    <Button variant="outlined" onClick={() => navigate(`/contracts/${contract.id}`)}>View Details</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleClickOpen(contract.id)}>Delete</Button>
                                </ListItem>
                            ))}
                        </List>
                        <Pagination
                            totalItems={totalContracts}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this contract?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="secondary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );

};

export default ContractList;