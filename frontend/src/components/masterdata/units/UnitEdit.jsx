import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTag, faInfoCircle, faHashtag } from '@fortawesome/free-solid-svg-icons';

const CategoryEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        const response = await api.get(`/categories/${id}`);
        setName(response.data.name);
        setDescription(response.data.description);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.put(`/categories/${id}`, { name, description });
        navigate('/categories');
    };

    return (
        <div className="container">
            <h2><FontAwesomeIcon icon={faEdit} /> Edit Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label><FontAwesomeIcon icon={faHashtag} /> ID</label>
                    <input type="text" className="form-control" value={id} readOnly />
                </div>
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
                <button type="submit" className="btn btn-success mt-2">Save</button>
            </form>
        </div>
    );
};

export default CategoryEdit;