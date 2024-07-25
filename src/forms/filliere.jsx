import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

function Filliere() {
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [filliere, setFilliere] = useState('');
  const [fillieres, setFillieres] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [editingFilliere, setEditingFilliere] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get('http://localhost:3001/levels', {
        params: { category_name: selectedCategory }
      })
        .then(response => {
          setLevels(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the levels!', error);
        });
    } else {
      setLevels([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory && selectedLevel) {
      axios.get('http://localhost:3001/filliere', {
        params: { category_name: selectedCategory, level_name: selectedLevel }
      })
        .then(response => {
          setFillieres(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the filliere data!', error);
        });
    } else {
      setFillieres([]);
    }
  }, [selectedCategory, selectedLevel]);

  const handleSubmit = () => {
    const data = { category_name: selectedCategory, level_name: selectedLevel, filliere };
    axios.post('http://localhost:3001/filliere_add', data)
      .then(response => {
        setFilliere('');
        setMessage('Filliere added successfully!');
        setMessageType('success');
        // Refresh the fillieres list
        if (selectedCategory && selectedLevel) {
          axios.get('http://localhost:3001/filliere', {
            params: { category_name: selectedCategory, level_name: selectedLevel }
          })
            .then(response => {
              setFillieres(response.data);
            })
            .catch(error => {
              console.error('There was an error fetching the filliere data after addition!', error);
            });
        }
      })
      .catch(error => {
        console.error('There was an error submitting the data!', error);
        setMessage('Failed to add filliere. Please try again.');
        setMessageType('error');
      });
  };

  const handleRemove = (filliereId) => {
    if (!selectedCategory || !selectedLevel || !filliereId) {
      setMessage('Category, level, and filliere details are required');
      setMessageType('error');
      return;
    }
  
    axios.delete('http://localhost:3001/filliere_remove', {
      data: {
        category_name: selectedCategory,
        level_name: selectedLevel,
        filliere: filliereId
      }
    })
      .then(response => {
        setMessage('Filliere removed successfully!');
        setMessageType('success');
        if (selectedCategory && selectedLevel) {
          axios.get('http://localhost:3001/filliere', {
            params: { category_name: selectedCategory, level_name: selectedLevel }
          })
            .then(response => {
              setFillieres(response.data);
            })
            .catch(error => {
              console.error('There was an error fetching the filliere data after removal!', error);
            });
        }
      })
      .catch(error => {
        console.error('There was an error removing the filliere!', error);
        setMessage('Failed to remove filliere. Please try again.');
        setMessageType('error');
      });
  };

  const handleEdit = (filliere) => {
    setFilliere(filliere.name); // Set current name for editing
    setEditingFilliere(filliere); // Store full filliere object for update
  };

  const handleUpdate = () => {
    if (!filliere.trim()) {
      setMessage('Filliere name is required');
      setMessageType('error');
      return;
    }

    axios.put('http://localhost:3001/filliere_update', {
      filiere_id: editingFilliere.id,
      new_name: filliere,
      category_name: selectedCategory,
      level_name: selectedLevel
    })
      .then(response => {
        setMessage('Filliere updated successfully!');
        setMessageType('success');
        setFilliere('');
        setEditingFilliere(null);
        // Refresh the fillieres list
        if (selectedCategory && selectedLevel) {
          axios.get('http://localhost:3001/filliere', {
            params: { category_name: selectedCategory, level_name: selectedLevel }
          })
            .then(response => {
              setFillieres(response.data);
            })
            .catch(error => {
              console.error('There was an error fetching the filliere data after update!', error);
            });
        }
      })
      .catch(error => {
        console.error('There was an error updating the filliere!', error);
        setMessage('Failed to update filliere. Please try again.');
        setMessageType('error');
      });
  };

  return (
    <div>
      <h1>Filliere</h1>

      {message && (
        <Alert variant={messageType === 'success' ? 'success' : 'danger'}>
          {message}
        </Alert>
      )}

      <Form>
        <Form.Group controlId="categorySelect">
          <Form.Label>Category</Form.Label>
          <Form.Control as="select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="levelSelect">
          <Form.Label>Level</Form.Label>
          <Form.Control as="select" value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}>
            <option value="">Select Level</option>
            {levels.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="filliereInput">
          <Form.Label>Filliere</Form.Label>
          <Form.Control type="text" value={filliere} onChange={e => setFilliere(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={editingFilliere ? handleUpdate : handleSubmit}>
          {editingFilliere ? 'Update' : 'Submit'}
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Filliere Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fillieres.map((f, index) => (
            <tr key={index}>
              <td>{f.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(f)}>Edit</Button>
                <Button variant="danger" onClick={() => handleRemove(f.id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Filliere;
