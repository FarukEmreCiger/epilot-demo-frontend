import { Avatar, Box, Typography } from "@mui/material";

export const GameCardField = ({ 
    label, 
    value, 
    icon, 
    colorClass 
}: { 
    label: string; 
    value: any; 
    icon: React.ReactNode; 
    colorClass?: string; 
}) => {
    return (
        <Box className="game-card-field-box">
            <Avatar 
                className={`game-card-field-avatar ${colorClass}`}
            >
                {icon}
            </Avatar>
            <Box className="game-card-field-content-box">
                <Typography variant="body1" className="game-card-field-label">
                    {label}
                </Typography>
                <Typography variant="body1" className="game-card-field-value">
                    {value}
                </Typography>
            </Box>
        </Box>
    );
};