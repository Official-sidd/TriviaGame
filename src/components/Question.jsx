import React from 'react';
import { Typography, Box } from '@mui/material';

const Question = ({ question, options, selectedOption, onSelectOption }) => {
  return (
    <div className="question-container">
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 600, 
          mb: 4,
          color: 'white',
          textAlign: 'center'
        }}
      >
        {question}
      </Typography>
      
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => onSelectOption(option)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: 30, 
                  height: 30, 
                  borderRadius: '50%', 
                  bgcolor: 'rgba(65, 105, 225, 0.3)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 2,
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(65, 105, 225, 0.6)'
                }}
              >
                {String.fromCharCode(65 + index)}
              </Box>
              {option}
            </Box>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
