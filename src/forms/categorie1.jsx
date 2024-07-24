import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

const Categorie = () => {
    const [check, setCheck] = useState(null);
    const [cat, setCat] = useState('');
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3001/categories');
            setCategories(response.data);
        } catch (error) {
            console.log('Error fetching categories', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (cat.trim() === '') {
            setCheck(false);
            console.log('Category name is required');
            return;
        }

        try {
            let response;
            if (editingCategory) {
                // Update category by name
                response = await axios.put('http://localhost:3001/categorie_update', {
                    name: editingCategory,
                    new_name: cat,
                });
                setEditingCategory('');
            } else {
                // Add new category
                response = await axios.post('http://localhost:3001/categorie_add', {
                    name: cat,
                });
            }
            setCat('');
            setCheck(true);
            fetchCategories(); // Refresh categories list
            console.log('Category added/updated', response.data);
        } catch (error) {
            setCheck(false);
            console.log('Add/update category failed', error);
        }
    };

    const handleDelete = async (name) => {
        try {
            await axios.delete(`http://localhost:3001/categorie_delete`, {
                data: { name: name}
            });
            fetchCategories(); // Refresh categories list
        } catch (error) {
            console.log('Delete category failed', error);
        }
    };

    const handleEdit = (categoryName) => {
        setCat(categoryName);
        setEditingCategory(categoryName);
    };

    return (
        <div className="Categorie">
            <form onSubmit={handleSubmit}>
                <h1>Categories</h1>
                <label htmlFor="categorie">Category Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="categorie"
                    placeholder="Enter category"
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    required
                />
                <button className="btn btn-primary mt-3 col-12" type="submit">
                    {editingCategory ? 'Update' : 'Add'}
                </button>
                {check !== null && (
                    <p id={check ? 'status' : 'status_'}>
                        {check ? 'Category added/updated successfully' : 'Failed to add/update category'}
                    </p>
                )}
            </form>

            <h2 className="mt-5">Category List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <td>{category}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEdit(category)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(category)}
                                    className="ms-2"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Categorie;