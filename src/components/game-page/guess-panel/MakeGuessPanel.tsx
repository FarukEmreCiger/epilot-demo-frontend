import React, { useState } from 'react';
import { MakeGuessButton } from './MakeGuessButton';
import { DirectionButton } from './DirectionButton';
import { gameService } from '../../../services/game.service';

type GuessDirection = 'up' | 'down' | null;

export const MakeGuessPanel: React.FC = () => {
    const [guessDirection, setGuessDirection] = useState<GuessDirection>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleMakeGuess = async () => {
        if (!guessDirection) {
            setError('Please select up or down!');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log('Making guess:', guessDirection);
            
            const result = await gameService.makeGuess(guessDirection);
            
            if (result.success) {
                console.log('Guess made successfully!', {
                    guessId: result.guessId,
                    initialPrice: result.initialPrice,
                    message: result.message
                });
            }
        } catch (error: any) {
            console.error('Error making guess:', error);
            setError(error.message || 'Error making guess');
        } finally {
            setIsLoading(false);
            setGuessDirection(null);
        }
    };

    const handleUpGuess = () => {
        setGuessDirection(prev => prev === 'up' ? null : 'up');
        setError(null);
    };

    const handleDownGuess = () => {
        setGuessDirection(prev => prev === 'down' ? null : 'down');
        setError(null);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row items-center gap-4 mb-4">
                <DirectionButton 
                    direction="up" 
                    selected={guessDirection === 'up'} 
                    disabled={isLoading}
                    onClick={handleUpGuess} 
                />
                <DirectionButton 
                    direction="down" 
                    selected={guessDirection === 'down'} 
                    disabled={isLoading}
                    onClick={handleDownGuess} 
                />
            </div>
            <MakeGuessButton 
                onMakeGuess={handleMakeGuess} 
                disabled={!guessDirection || isLoading} 
            />

            {error && (
                <div className="alert-error">
                    ❌ {error}
                </div>
            )}
        </div>
    );
};