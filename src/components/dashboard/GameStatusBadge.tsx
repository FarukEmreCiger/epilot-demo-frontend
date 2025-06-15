import { Box, Typography } from "@mui/material";

interface GameStatusBadgeProps {
  emoji: string;
  text: string;
  color: string;
  animate?: boolean;
}

export const GameStatusBadge = ({ emoji, text, color, animate = false }: GameStatusBadgeProps) => {
  return (
    <Box className="game-status-container">
      <Typography 
        variant="h4" 
        className={`game-status-emoji ${animate ? 'game-status-emoji-animated' : ''}`}
      >
        {emoji}
      </Typography>
      <Typography
        variant="h6"
        className={`game-status-text ${animate ? 'game-status-text-animated' : ''}`}
        sx={{ color: color }}
      >
        {text}
      </Typography>
    </Box>
  );
}; 