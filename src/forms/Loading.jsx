import React, { useState, useEffect } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import ClockLoader from 'react-spinners/ClockLoader';
import './loading.css';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="loading-container">
      {isLoading ? (
        <PacmanLoader color={'#36D7B7'} isLoading={isLoading} css="override" size={150} />
      ) : (
        <h1 className="loading">
          LOADING
          <ClockLoader color={'#36D7B7'} isLoading={isLoading} css="override" size={150} />
        </h1>
      )}
    </div>
  );
};

export default Loading;
