import React from 'react';
import { IconButton, Container } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './GuessButtons.css';

type Direction = 'up' | 'down';

interface DirectionButtonProps {
  direction: Direction;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const DirectionButton: React.FC<DirectionButtonProps> = ({ direction, selected, disabled, onClick }) => {
  const isUp = direction === 'up';
  
  const buttonClass = selected 
    ? (isUp ? 'btn-up-selected' : 'btn-down-selected')
    : (isUp ? 'btn-up' : 'btn-down');
    
  const iconClass = selected 
    ? (isUp ? 'text-green-900' : 'text-red-900')
    : (isUp ? 'text-green-600' : 'text-red-600');
    
  const ariaLabel = `${direction} guess`;
  const color = isUp ? 'success' : 'error';
  
  return (
    <Container className="direction-container">
      <IconButton 
        onClick={onClick}
        color={color}
        disabled={disabled}
        aria-label={ariaLabel}
        className={buttonClass}
      >
        {isUp ? (
          <ArrowUpwardIcon className={iconClass} />
        ) : (
          <ArrowDownwardIcon className={iconClass} />
        )}
      </IconButton>
    </Container>
  );
}; 