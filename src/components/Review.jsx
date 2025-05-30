import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Review = ({ questions, selectedAnswers }) => {
  const wrongAnswers = questions
    .map((question, index) => ({
      question,
      selected: selectedAnswers[index],
      correct: question.correctAnswer,
      isWrong: selectedAnswers[index] !== question.correctAnswer
    }))
    .filter(item => item.isWrong && item.selected !== undefined);

  const [showCorrect, setShowCorrect] = React.useState(false);

  return (
    <Box sx={{ 
      backgroundColor: 'rgba(30, 41, 59, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: 3,
      border: '1px solid rgba(65, 105, 225, 0.2)',
      p: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          background: 'linear-gradient(90deg, #FF4081, #F50057)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '1.5rem', sm: '1.8rem' },
          mb: 2
        }}
      >
        Review Answers
      </Typography>
      
      <Button
        variant="outlined"
        size="small"
        startIcon={showCorrect ? <VisibilityOff /> : <Visibility />}
        onClick={() => setShowCorrect(!showCorrect)}
        sx={{ mb: 2, alignSelf: 'flex-start' }}
      >
        {showCorrect ? 'Hide Correct' : 'Show Correct'}
      </Button>

      {wrongAnswers.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'rgba(46, 125, 50, 0.1)',
          borderRadius: 2,
          p: 3
        }}>
          <Typography variant="body1" sx={{ color: '#66BB6A', fontWeight: 'bold' }}>
            Perfect Score! 🎉 No mistakes!
          </Typography>
        </Box>
      ) : (
        <List sx={{ 
          overflow: 'auto', 
          flex: 1,
          bgcolor: 'rgba(22, 27, 34, 0.6)', 
          borderRadius: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(244, 67, 54, 0.5)',
            borderRadius: '4px',
          }
        }}>
          {wrongAnswers.map((item, index) => (
            <ListItem 
              key={index}
              sx={{ 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                flexDirection: 'column',
                alignItems: 'flex-start',
                py: 1.5
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                {item.question.question}
              </Typography>
              <Box sx={{ width: '100%' }}>
                <Typography
                  variant="caption"
                  sx={{ 
                    display: 'block',
                    mb: 0.5,
                    color: '#F44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    p: 1,
                    borderRadius: 1
                  }}
                >
                  ❌ Your Answer: {item.selected}
                </Typography>
                {showCorrect && (
                  <Typography
                    variant="caption"
                    sx={{ 
                      display: 'block',
                      color: '#4CAF50',
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      p: 1,
                      borderRadius: 1
                    }}
                  >
                    ✅ Correct: {item.correct}
                  </Typography>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Review;
