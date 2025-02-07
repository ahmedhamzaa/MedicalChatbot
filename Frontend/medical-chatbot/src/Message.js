import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Message = ({ message, isUser }) => {
  return (
    <div
      className={`d-flex mb-2 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}
    >
      <div
        className={`d-flex flex-column ${isUser ? 'align-items-end' : 'align-items-start'}`}
      >
        <div
          className={`p-2 rounded-3 ${
            isUser ? 'bg-primary text-white' : 'bg-light'
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default Message;
