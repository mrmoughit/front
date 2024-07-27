import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function AddMatiere() {
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [newMatiereName, setNewMatiereName] = useState('');

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

  const handleAddMatiere = () => {
    const category = categories.find(cat => cat.id === parseInt(selectedCategory));
    const level = levels.find(level => level.id === parseInt(selectedLevel));
    
    axios.post('http://localhost:3001/matiere_add', {
      category_name: category ? category.name : '',
      level_name: level ? level.name : '',
      filiere_id: selectedFiliere,
      matiere_name: newMatiereName
    })
      .then(response => {
        if (response.status === 200) {
          alert('Matiere added successfully');
          setNewMatiereName('');
          setSelectedCategory('');
          setSelectedLevel('');
          setSelectedFiliere('');
        } else {
          alert('Error adding matiere');
        }
      })
      .catch(error => {
        console.error('Error adding matiere:', error);
        alert('Error adding matiere');
      });
  };

  return (
    <div>
      <h1>Add Matiere</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="categorySelect">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
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
                  <option key={level.id} value={level.id}>
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
                  <option key={filiere.id} value={filiere.id}>
                    {filiere.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="newMatiereName">
              <Form.Label>Matiere Name</Form.Label>
              <Form.Control type="text" value={newMatiereName} onChange={e => setNewMatiereName(e.target.value)} disabled={!selectedFiliere} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleAddMatiere} disabled={!newMatiereName || !selectedFiliere}>
          Add Matiere
        </Button>
      </Form>
    </div>
  );
}

export default AddMatiere;
