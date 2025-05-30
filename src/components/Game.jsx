import React, { useState, useEffect } from 'react';
import Question from './Question';
import Timer from './Timer';
import Loading from './Loading';
import Review from './Review';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Save } from '@mui/icons-material';
import ScoreService from '../services/ScoreService';

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLimit] = useState(15); // 15 seconds per question
  const [timeUp, setTimeUp] = useState(false);

  // useEffect(() => {
  //   // Load questions from JSON file
  //   import('../data/questions.json').then((data) => {
  //     setQuestions(data.questions);
  //     setIsLoading(false);
  //   });

  //   // Load high scores from IndexedDB
  //   ScoreService.getTopScores().then((scores) => {
  //     setHighScores(scores);
  //   });
  // }, []);

  useEffect(() => {
    // Load questions from JSON file
    import('../data/questions.json').then((data) => {
      // Shuffle array and pick first 5 questions
      const shuffled = [...data.default.questions].sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, 5);
      setQuestions(selectedQuestions);
      setIsLoading(false);
    });
  
    // Load high scores from IndexedDB
    ScoreService.getTopScores().then((scores) => {
      setHighScores(scores);
    });
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeUp(false); // Reset time up state for next question
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    setScore(score);
  };

  const saveScore = async () => {
    const playerName = prompt('Enter your name:');
    if (playerName) {
      try {
        const scores = await ScoreService.saveScore(playerName, score);
        setHighScores(scores);
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }
  };

  const restartGame = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setTimeUp(false);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleAnswerSelect(''); // Clear selection when time is up
    nextQuestion();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (showResults) {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          backgroundImage: 'linear-gradient(90deg, rgba(65, 105, 225, 0.2), rgba(0, 191, 255, 0.2))',
          p: { xs: 2, sm: 3 }, 
          borderRadius: 3,
          mb: 2,
          backdropFilter: 'blur(5px)',
          border: '1px solid rgba(65, 105, 225, 0.3)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}>
          <Typography variant="h1" 
            sx={{ 
              mb: 1,
              fontSize: { xs: '2.5rem', sm: '3rem' },
              background: 'linear-gradient(90deg, #4169E1, #00BFFF)',
              WebkitBackgroundClip: 'text',
              // WebkitTextFillColor: 'transparent',
              textShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
            }}
          >
            Game Over
          </Typography>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              color: 'text.secondary', 
              mb: 2,
              fontSize: { xs: '1.2rem', sm: '1.5rem' }
            }}
          >
            Your Score: <span style={{ color: '#00BFFF', fontWeight: 'bold' }}>{score}</span>/{questions.length}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={saveScore}
              sx={{ px: { xs: 2, sm: 3 }, py: 1 }}
            >
              Save Score
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={restartGame}
              sx={{ px: { xs: 2, sm: 3 }, py: 1 }}
            >
              Play Again
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
          gap: 2,
          flex: 1,
          overflow: 'auto',
          pb: 2
        }}>
          <Box sx={{ height: '100%' }}>
            <Review questions={questions} selectedAnswers={selectedAnswers} />
          </Box>
          
          <Box sx={{ 
            p: 2, 
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            border: '1px solid rgba(65, 105, 225, 0.2)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="h4" gutterBottom 
              sx={{ 
                background: 'linear-gradient(90deg, #9370DB, #8A2BE2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '1.8rem' }
              }}
            >
              Hall of Fame
            </Typography>
            <List 
              sx={{ 
                bgcolor: 'rgba(22, 27, 34, 0.6)', 
                borderRadius: 2, 
                overflow: 'auto',
                flex: 1,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0,0,0,0.1)',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(65, 105, 225, 0.5)',
                  borderRadius: '4px',
                }
              }}
            >
              {highScores.map((score, index) => (
                <ListItem key={index} 
                  sx={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    py: 1,
                    px: 2,
                    '&:hover': { bgcolor: 'rgba(65, 105, 225, 0.1)' }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          width: 24, 
                          height: 24, 
                          borderRadius: '50%', 
                          bgcolor: index < 3 ? 'primary.main' : 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}>
                          {index + 1}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{score.name}</Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 500 }}>
                        Score: {score.score} - {new Date(score.date).toLocaleDateString()}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        pb: 2,
        gap : 4,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Typography variant="h2" 
          sx={{ 
            background: 'linear-gradient(90deg, #4169E1, #00BFFF)',
            WebkitBackgroundClip: 'text',
            // WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2.5rem' }
          }}
        >
          The Best Trivia
        </Typography>
        <Box sx={{ 
          backgroundColor: 'rgba(30, 41, 59, 0.8)', 
          p: 1, 
          px: 2, 
          borderRadius: 2,
          border: '1px solid rgba(65, 105, 225, 0.2)',
          backdropFilter: 'blur(5px)'
        }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 'bold' }}>
            Question {currentQuestionIndex + 1}/{questions.length}
          </Typography>
        </Box>
      </Box>
      
      <Timer key={currentQuestionIndex} timeLimit={timeLimit} onTimeUp={handleTimeUp} />
      
      <Box sx={{ 
        p: 4, 
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        border: '1px solid rgba(65, 105, 225, 0.2)',
        mb: 4,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
      }}>
        <Question
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedOption={selectedAnswers[currentQuestionIndex]}
          onSelectOption={handleAnswerSelect}
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={nextQuestion}
          disabled={selectedAnswers[currentQuestionIndex] === undefined || timeUp}
          sx={{ 
            mt: 2,
            px: 4,
            py: 1.5,
            minWidth: '200px',
            fontSize: '1.1rem'
          }}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Game'}
        </Button>
      </Box>
    </Box>
  );
};

export default Game;
