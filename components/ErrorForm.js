import React from 'react';

const ErrorForm = ({ msg }) => {
    return (
        <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p className="font-bold">Error</p>
            <p>{ msg }</p>
        </div>
    );
};

export default ErrorForm;