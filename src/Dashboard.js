import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Categorie from './forms/categorie';
import Level from './forms/Level';
import Filliere from './forms/filliere'; 
import Matiere from './forms/matiere'; 
import Lesson from './forms/lesson'; 
import Exercice from './forms/exercice'; 
import Exams from './forms/exams'; 
import ExamsNationaux from './forms/exams_nationaux'; 
import ExamsRegionaux from './forms/exams_regionaux'; 
import Admin_setting from './forms/admin_setting'; 
import './Dashboard.css'; 

const Dashboard = () => {
    const [page, setPage] = useState('loading');

    // Function to handle button clic
    const handleButtonClick = (pageName) => {
        setPage(pageName);
    };

    // Function to render the component
    const renderComponent = () => {
        switch (page) {
            case 'Categorie':
                return <Categorie />;
            case 'Level':
                return <Level />;
            case 'filliere':
                return <Filliere />;
            case 'matiere':
                return <Matiere />;
            case 'lesson':
                return <Lesson />;
            case 'exercice':
                return <Exercice />;
            case 'exams':
                return <Exams />;
            case 'exams regionaux':
                return <ExamsRegionaux />;
            case 'exams nationaux':
                return <ExamsNationaux />;
            case 'admin setting':// eslint-disable-next-line 
                return <Admin_setting />;
            default:
                return 'Loading...';
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row'>

                {/* Sidebar with buttons */}
                <div className='col-3' id='side'>
                    <button className='col-12 btn btn-secondary mt-4' onClick={() => handleButtonClick("Categorie")}>Categorie</button>
                    <button className='col-12 btn btn-secondary mt-4' onClick={() => handleButtonClick("Level")}>Level</button>
                    <button className='col-12 btn btn-secondary mt-4' onClick={() => handleButtonClick("filliere")}>filliere</button>
                    <button className='col-12 btn btn-secondary mt-4' onClick={() => handleButtonClick("matiere")}>matiere</button>
                    <button className='col-12 btn btn-secondary mt-4' onClick={() => handleButtonClick("lesson")}>lesson</button>
                    <button className='col-12 btn btn-secondary mt-4' onClick={() => handleButtonClick("exercice")}>exercice</button>
                    <button className='col-12 btn btn-secondary mt-4' onClick={() => handleButtonClick("exams")}>exams</button>
                    <button className='col-12 btn btn-secondary mt-4' onClick={() => handleButtonClick("exams regionaux")}>exams regionaux</button>
                    <button className='col-12 btn btn-secondary mt-4' onClick={() => handleButtonClick("exams nationaux")}>exams nationaux</button>
                    <button className='col-11 btn btn-primary mt-1 admin_s' type="submit" onClick={() => handleButtonClick("admin setting")}>Admin settings</button>
                </div>

                {/* Main content area */}
                <div className='col-9' id='middle'>
                    {renderComponent()} {/* Render the component based on the page state */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
