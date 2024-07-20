import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import "./style.css"
import axios from 'axios'

function StagiaireManager(){
  const [stagiaires, setstagiaires] = useState([
    {
        name:"Zakaria Moumni",
        phone:"0609603674",
        convocation:"yes",
        date:"from 01/03/2023 at 31/03/2023",
    },
    {
        name:"khalid HAMDANI",
        phone:"0609603674",
        convocation:"No",
        date:"",
    },
    {
        name:"Ahlam DHAIBI",
        phone:"0609603674",
        convocation:"yes",
        date:"from 01/03/2023 at 31/03/2023",
    },
    {
        name:"Aya TOUIL",
        phone:"0688796574",
        convocation:"yes",
        date:"from 01/03/2023 at 31/03/2023",
    },
    {
        name:"Ahlam DHAIBI",
        phone:"0789083674",
        convocation:"yes",
        date:"from 01/03/2023 at 31/03/2023",
    },
    {
        name:"Yassine WAHBI",
        phone:"0789088974",
        convocation:"No",
        date:"",
    },
    

  ]);
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [convocation, setconvocation] = useState('');
  const [date, setdate] = useState('');

  const handleAdd = () => {
    const newstagiaire = { name,  phone ,convocation ,date };
    setstagiaires([...stagiaires, newstagiaire]);
    setName('');
    setphone('');
    setconvocation('');
    setdate('');
  };

  const handleDelete = (index) => {
    const newstagiaires = [...stagiaires];
    newstagiaires.splice(index, 1);
    setstagiaires(newstagiaires);
  };

  const [state, setstate] = useState(false);
  const [cat, setcat] = useState(false);
  const handleSubmit = async (event) => {
      event.preventDefault();
      await axios.post('http://10.13.10.6:3000/categorie_add', {
          name: cat,
      })
      .then(response => {
          setstate(true)
          console.log('cat added', response.data);
      })
      .catch(error => {
          setstate(false)
          console.log('add cat Failed')
      })
  }
  const handleModify = (index) => {
    console.log("index",index);
    const newstagiaires = [...stagiaires];
    newstagiaires[index] = { name, phone ,convocation ,date };
    setstagiaires(newstagiaires);
    setName('');
    setphone('');
    setconvocation('');
    setdate('');
  };

  return (
    <div>
      <h1>Categories</h1>
      <div>
        <label>Categorie Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Button className='' variant="primary" onClick={handleAdd}>Add</Button>
        <Button className='' variant="danger" onClick={() => setstagiaires([])}>Delete All</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stagiaires.map((stagiaire, index) => (
            <tr key={index}>
              <td className='td'>{stagiaire.name}</td>
              <td className='td'>
                <Button variant="warning" onClick={() => handleModify(index)}>Modify</Button>
                <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button> 
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StagiaireManager;
