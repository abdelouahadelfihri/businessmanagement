import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTag, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const CategoryAdd = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/categories', { name, description });
        navigate('/categories');
    };

    return (
        <div className="container">
            <h2><FontAwesomeIcon icon={faPlus} /> Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label><FontAwesomeIcon icon={faTag} /> Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label><FontAwesomeIcon icon={faInfoCircle} /> Description</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                    />
                </div>
                <button type="submit" className="btn btn-success mt-2">Add</button>
            </form>
        </div>
    );
};

export default CategoryAdd;