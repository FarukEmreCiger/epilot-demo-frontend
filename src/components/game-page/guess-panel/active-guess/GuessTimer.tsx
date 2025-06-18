import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Guess } from '../../../../types/guess.type';
import "./ActiveGuess.css";

interface GuessTimerProps {
    guess: Guess;
}

export const GuessTimer = ({ guess }: GuessTimerProps) => {
    const [remainingTime, setRemainingTime] = useState<string>('');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (guess.status !== 'pending') {
            setIsVisible(false);
            return;
        }

        const calculateRemainingTime = () => {
            const createdAt = new Date(guess.createdAt).getTime();
            const endTime = createdAt + (guess.guessResolveDelay * 1000);
            const now = new Date().getTime();
            const timeLeft = endTime - now;

            if (timeLeft <= 0) {
                setIsVisible(false);
                return;
            }

            const seconds = Math.floor((timeLeft / 1000) % 60);
            const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);

            setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        };

        calculateRemainingTime();
        const interval = setInterval(calculateRemainingTime, 1000);

        return () => clearInterval(interval);
    }, [guess]);

    if (!isVisible) return null;

    return (
        <Box className="guess-timer-container">
            <Typography
                variant="h4"
                className="guess-timer-text"
            >
               ⏳ {remainingTime}
            </Typography>
        </Box>
    );
}; 