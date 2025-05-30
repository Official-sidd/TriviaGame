import React, { useEffect, useState } from 'react';
import { Typography, Box, LinearProgress } from '@mui/material';

const Timer = ({ timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          onTimeUp();
          return 0;
        }
        const newTime = prev - 1;
        setProgress(((newTime / timeLimit) * 100).toFixed(2));
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimit, onTimeUp]);

  const getTimerColor = () => {
    if (timeLeft <= 5) return 'error';
    if (timeLeft <= 10) return 'warning';
    return 'primary';
  };

  return (
    <Box className="timer-container">
      <Typography variant="h6" sx={{ mb: 1 }}>
        Time Left: {timeLeft}s
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        color={getTimerColor()}
        sx={{
          height: 10,
          borderRadius: 5,
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
          },
        }}
      />
    </Box>
  );
};

export default Timer;
