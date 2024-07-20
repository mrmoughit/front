
// import React, { useState } from 'react';
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
function ExamsRegionaux() {
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
      <h1>ExamsRegionaux</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Convocation</th>
            <th>Period of stage</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stagiaires.map((stagiaire, index) => (
            <tr key={index}>
              <td>{stagiaire.name}</td>
              <td>{stagiaire.phone}</td>
              <td>{stagiaire.convocation}</td>
              <td>{stagiaire.date}</td>
              <td>
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

export default ExamsRegionaux;
