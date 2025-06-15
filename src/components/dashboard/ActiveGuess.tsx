import { useEffect, useState } from "react";
import { Guess } from "../../types/guess";
import { priceService } from "../../services/price.service";
import {
    Card,
    CardContent,
    Typography,
    List,
    Box,
    Avatar,
    Fade,
    SvgIcon
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CasinoIcon from '@mui/icons-material/Casino';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TimerIcon from '@mui/icons-material/Timer';
import { ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";
import { GuessTimer } from './GuessTimer';
import { GameStatusBadge } from './GameStatusBadge';

const GameStatus = ({ result }: { result?: string }) => {
    const getStatus = () => {
        if (result === "correct") return { emoji: "🏆", text: "Congratulations! You won!", color: "#00ff88" };
        if (result === "incorrect") return { emoji: "💥", text: "You lost! Maybe next time.", color: "#ff4757" };
        return { emoji: "🎯", text: "ACTIVE PREDICTION", color: "#00d4ff" };
    };

    const status = getStatus();

    return (
        <GameStatusBadge 
            emoji={status.emoji} 
            text={status.text} 
            color={status.color} 
            animate={status.text !== "ACTIVE PREDICTION"}
        />
    );
};

const GameField = ({ 
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
        <Box className="game-field-box">
            <Avatar 
                className={`game-field-avatar ${colorClass}`}
            >
                {icon}
            </Avatar>
            <Box className="game-field-content-box">
                <Typography variant="body1" className="game-field-label">
                    {label}
                </Typography>
                <Typography variant="body1" className="game-field-value">
                    {value}
                </Typography>
            </Box>
        </Box>
    );
};

export const ActiveGuess = ({ activeGuess }: { activeGuess: Guess }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, [activeGuess]);

    if (!activeGuess) return null;

    const getStatusBorderClass = () => {
        if (activeGuess.result === "correct") return "border-primary-green";
        if (activeGuess.result === "incorrect") return "border-error-red";
        return "border-info-blue";
    };

    const borderClass = getStatusBorderClass();

    return (
        <Fade in={show} timeout={600}>
            <div
                className={`game-paper overflow-hidden `}
            >
                <Card className="game-card">
                    <CardContent className="game-card-content">
                        <GameStatus result={activeGuess.result} />  
                        <GuessTimer guess={activeGuess} />
                      
                        <List disablePadding>
                            <GameField
                                label="Prediction Time"
                                value={new Date(activeGuess.createdAt).toLocaleString("en-US")}
                                icon={<TimerIcon />}
                                colorClass={borderClass} 
                            />
                            <GameField
                                label="Initial Price"
                                value={priceService.formatPrice(activeGuess.initialPrice)}
                                icon={<FlashOnIcon />}
                                colorClass={borderClass}
                            />
                            <GameField
                                label="Prediction"
                                value={activeGuess.prediction === 'up' ? <SvgIcon>
                                    <ArrowCircleUp />
                                </SvgIcon> : <SvgIcon>
                                    <ArrowCircleDown />
                                </SvgIcon>}
                                icon={activeGuess.prediction === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                                colorClass={borderClass}
                            />
                            <GameField
                                label="Result Price"
                                value={activeGuess.resolvedPrice ? 
                                    priceService.formatPrice(activeGuess.resolvedPrice) : 
                                    "⏳ Waiting..."
                                }
                                icon={<CasinoIcon />}
                                colorClass={borderClass}
                            />
                        </List>

                    </CardContent>
                </Card>
            </div>
        </Fade>
    );
};