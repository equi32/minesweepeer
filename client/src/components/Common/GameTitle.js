import React from 'react';

const GameTitle = () => (
    <h1 className="mt-6 text-center text-3xl font-extrabold text-purple-900">
        {process.env.REACT_APP_TITLE }
    </h1>
);
 
export default GameTitle;