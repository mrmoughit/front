
// import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import axios from 'axios'

const Categorie = () => {
    const [check, setcheck] = useState();
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
  return (
    <div className="Categorie">
    <form onSubmit={handleSubmit}>

        
      <h1>Categories</h1>
      <label htmlFor="categorie">Categorie name</label>
      <input
                type="text"
                className="form-control"
                id="categorie"
                placeholder="Enter categorie"
                value={cat}
                onChange={(e) => setcat(e.target.value)}
                required
        />
        <button className="btn btn-primary mt-3 col-12" type="submit">
                Add
        </button>
        <>
            {
                check == null ? "" : check ?
                <p id='status'>cat added</p>:<p id='status_'>add cat Failed</p>
            }
        </>
    </form>
    </div>
  );
}

export default Categorie;
