import React, { useState, useEffect } from 'react';
import { Button, Form, Dropdown, DropdownButton, Row, Col, Alert, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

function Level() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [levelName, setLevelName] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [levels, setLevels] = useState([]);
  const [editingLevel, setEditingLevel] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchLevels(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchLevels = async (category) => {
    try {
      const response = await axios.get('http://localhost:3001/levels', {
        params: { category_name: category }
      });
      setLevels(response.data);
    } catch (error) {
      console.error('Error fetching levels:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !levelName.trim()) {
      setMessage('Category name and level name are required');
      setMessageType('danger');
      return;
    }

    const payload = {
      category_name: selectedCategory,
      level_name: levelName,
    };

    try {
      await axios.post('http://localhost:3001/add_level', payload);
      setMessage('Level added successfully');
      setMessageType('success');
      setLevelName('');
      fetchLevels(selectedCategory); // Refresh levels list
    } catch (error) {
      console.error('Error submitting level:', error);
      setMessage('Failed to add level');
      setMessageType('danger');
    }
  };

  const handleDelete = async (levelName) => {
    try {
      await axios.delete('http://localhost:3001/delete_level', {
        data: {
          category: selectedCategory,
          name: levelName
        }
      });
      setMessage('Level deleted successfully');
      setMessageType('success');
      fetchLevels(selectedCategory);
    } catch (error) {
      console.error('Error deleting level:', error);
      setMessage('Failed to delete level');
      setMessageType('danger');
    }
  };

  const handleEdit = (level) => {
    setLevelName(level);
    setEditingLevel(level); // Set the whole level object
  };

  const handleUpdate = async () => {
    if (!levelName.trim()) {
      setMessage('Level name is required');
      setMessageType('danger');
      return;
    }

    try {
      await axios.put('http://localhost:3001/update_level', {
        old_name: editingLevel,
        new_name: levelName,
        category_name: selectedCategory
      });
      setMessage('Level updated successfully');
      setMessageType('success');
      setLevelName('');
      setEditingLevel(null); // Clear the editing level
      fetchLevels(selectedCategory); // Refresh levels list
    } catch (error) {
      console.error('Error updating level:', error);
      setMessage('Failed to update level');
      setMessageType('danger');
    }
  };

  return (
    <div>
      <h1>Manage Levels</h1>

      {message && (
        <Alert variant={messageType} onClose={() => setMessage(null)} dismissible>
          {message}
        </Alert>
      )}

      <Form>
        <Form.Group as={Row} controlId="formCategory">
          <Form.Label column sm={2}>Select Category</Form.Label>
          <Col sm={10}>
            <DropdownButton
              title={selectedCategory || 'Choose Category'}
              onSelect={(eventKey) => setSelectedCategory(eventKey)}
            >
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <Dropdown.Item key={index} eventKey={typeof category === 'string' ? category : category.name}>
                    {typeof category === 'string' ? category : category.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>No categories available</Dropdown.Item>
              )}
            </DropdownButton>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formLevelName">
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter level name"
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Row className="mt-3">
          <Col>
            <Button variant="primary" onClick={editingLevel ? handleUpdate : handleSubmit}>
              {editingLevel ? 'Update' : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Form>

      <h2 className="mt-5">Levels in Selected Category</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {levels.length > 0 ? (
            levels.map((level) => (
              <tr key={level.id}>
                <td>{level}</td> {/* Correct property access */}
                <td>
                  <Button variant="warning" onClick={() => handleEdit(level)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(level)} className="ms-2">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No levels available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Level;
