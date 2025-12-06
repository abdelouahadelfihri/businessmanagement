import React, { useEffect, useState } from 'react';
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await api.get('/categories');
        setCategories(response.data);
    };

    const deleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            await api.delete(`/categories/${id}`);
            fetchCategories();
        }
    };

    return (
        <div className="container">
            <h2><FontAwesomeIcon icon={faList} /> Categories</h2>
            <Link to="/categories/add" className="btn btn-primary mb-2">
                <FontAwesomeIcon icon={faPlus} /> Add Category
            </Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th><FontAwesomeIcon icon={faList} /> Name</th>
                        <th><FontAwesomeIcon icon={faList} /> Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <Link to={`/categories/edit/${category.id}`} className="btn btn-sm btn-warning mr-2">
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </Link>
                                <button onClick={() => deleteCategory(category.id)} className="btn btn-sm btn-danger">
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;