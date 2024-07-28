import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Toast, Table } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function AddMatiere() {
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [matiereName, setMatiereName] = useState('');
  const [newMatiereName, setNewMatiereName] = useState('');
  const [editMatiereId, setEditMatiereId] = useState(null);
  const [oldMatiereName, setOldMatiereName] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get('http://localhost:3001/levels', {
        params: { category_name: selectedCategory }
      })
        .then(response => setLevels(response.data))
        .catch(error => console.error('Error fetching levels:', error));
    } else {
      setLevels([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory && selectedLevel) {
      axios.get('http://localhost:3001/filliere', {
        params: {
          category_name: selectedCategory,
          level_name: selectedLevel,
        }
      })
        .then(response => setFilieres(response.data))
        .catch(error => console.error('Error fetching filieres:', error));
    } else {
      setFilieres([]);
    }
  }, [selectedLevel, selectedCategory]);

  useEffect(() => {
    if (selectedCategory && selectedLevel && selectedFiliere) {
      axios.get('http://localhost:3001/matieres', {
        params: {
          category_name: selectedCategory,
          level_name: selectedLevel,
          filiere_name: selectedFiliere,
        }
      })
        .then(response => setMatieres(response.data))
        .catch(error => console.error('Error fetching matieres:', error));
    }
  }, [selectedCategory, selectedLevel, selectedFiliere]);

  const handleAddMatiere = () => {
    const payload = {
      category_name: selectedCategory,
      level_name: selectedLevel,
      filiere_name: selectedFiliere,
      matiere_name: matiereName,
    };

    axios.post('http://localhost:3001/matiere_add', payload)
      .then(response => {
        if (response.status === 200) {
          setMessage('Matiere added successfully');
          setMessageType('success');
          setMatiereName('');
          fetchMatieres();
        } else {
          setMessage('Error adding matiere');
          setMessageType('error');
        }
      })
      .catch(error => {
        console.error('Error adding matiere:', error);
        setMessage('Error adding matiere');
        setMessageType('error');
      });
  };

  const handleEditMatiere = () => {
    const payload = {
      category_name: selectedCategory,
      level_name: selectedLevel,
      filiere_name: selectedFiliere,
      old_matiere_name: oldMatiereName,
      new_matiere_name: newMatiereName,
    };

    axios.put('http://localhost:3001/matiere_edit', payload)
      .then(response => {
        if (response.status === 200) {
          setMessage('Matiere edited successfully');
          setMessageType('success');
          setMatiereName('');
          setNewMatiereName('');
          setOldMatiereName('');
          setEditMatiereId(null);
          fetchMatieres();
        } else {
          setMessage('Error editing matiere');
          setMessageType('error');
        }
      })
      .catch(error => {
        console.error('Error editing matiere:', error);
        setMessage('Error editing matiere');
        setMessageType('error');
      });
  };

  const fetchMatieres = () => {
    axios.get('http://localhost:3001/matieres', {
      params: {
        category_name: selectedCategory,
        level_name: selectedLevel,
        filiere_name: selectedFiliere,
      }
    })
      .then(response => setMatieres(response.data))
      .catch(error => console.error('Error fetching matieres:', error));
  };

  const handleEdit = (matiere) => {
    setMatiereName(matiere.name);
    setNewMatiereName(matiere.name);
    setOldMatiereName(matiere.name);
    setEditMatiereId(matiere.id);
  };

  const handleDelete = (matiere) => {
    axios.delete('http://localhost:3001/matiere_delete', {
      data: {
        category_name: selectedCategory,
        level_name: selectedLevel,
        filiere_name: selectedFiliere,
        matiere_name: matiere.name,
      }
    })
      .then(response => {
        if (response.status === 200) {
          setMessage('Matiere deleted successfully');
          setMessageType('success');
          fetchMatieres();
        } else {
          setMessage('Error deleting matiere');
          setMessageType('error');
        }
      })
      .catch(error => {
        console.error('Error deleting matiere:', error);
        setMessage('Error deleting matiere');
        setMessageType('error');
      });
  };

  return (
    <div>
      <h1>Add Matiere</h1>
      {message && (
        <Toast
          onClose={() => setMessage(null)}
          show={!!message}
          delay={3000}
          autohide
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: messageType === 'success' ? 'green' : 'red',
            color: 'white'
          }}
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      )}
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="categorySelect">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="levelSelect">
              <Form.Label>Level</Form.Label>
              <Form.Control as="select" value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)} disabled={!selectedCategory}>
                <option value="">Select a level</option>
                {levels.map(level => (
                  <option key={level.id} value={level.name}>
                    {level}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="filiereSelect">
              <Form.Label>Filiere</Form.Label>
              <Form.Control as="select" value={selectedFiliere} onChange={e => setSelectedFiliere(e.target.value)} disabled={!selectedLevel}>
                <option value="">Select a filiere</option>
                {filieres.map(filiere => (
                  <option key={filiere.id} value={filiere.name}>
                    {filiere.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="matiereName">
              <Form.Label>Matiere Name</Form.Label>
              <Form.Control type="text" value={editMatiereId ? newMatiereName : matiereName} onChange={e => editMatiereId ? setNewMatiereName(e.target.value) : setMatiereName(e.target.value)} disabled={!selectedFiliere} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={editMatiereId ? handleEditMatiere : handleAddMatiere} disabled={!(editMatiereId ? newMatiereName : matiereName) || !selectedFiliere}>
          {editMatiereId ? 'Edit Matiere' : 'Add Matiere'}
        </Button>
      </Form>
      <h2>List of Matieres</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Matiere Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matieres.map(matiere => (
            <tr key={matiere.id}>
              <td>{matiere.name}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(matiere)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(matiere)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AddMatiere;
