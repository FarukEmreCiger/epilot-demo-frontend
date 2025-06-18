import { useEffect, useState } from "react";
import { Guess } from "../../../../types/guess.type";
import "./ActiveGuess.css";
import { priceService } from "../../../../services/price.service";
import {
    Card,
    CardContent,
    List,
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
import { GameCardField } from "./GameCardField";
import { GameStatus } from "./GameStatus";



export const ActiveGuess = ({ activeGuess }: { activeGuess: Guess }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, [activeGuess]);

    if (!activeGuess) return null;

    const getStatusBorderClass = () => {
        if (activeGuess.result === "correct") return "!border-primary-green !bg-primary-green";
        if (activeGuess.result === "incorrect") return "!border-error-red !bg-error-red";
        return "!border-info-blue !bg-cyan-bright";
    };

    const borderClass = getStatusBorderClass();

    return (
        <Fade in={show} timeout={600}>
            <div
                className={`active-guess-paper overflow-hidden `}
            >
                <Card className="active-game-card">
                    <CardContent className="active-game-card-content">
                        <GameStatus result={activeGuess.result} />  
                        <GuessTimer guess={activeGuess} />
                      
                        <List disablePadding>
                            <GameCardField
                                label="Prediction Time"
                                value={new Date(activeGuess.createdAt).toLocaleString("en-US")}
                                icon={<TimerIcon />}
                                colorClass={borderClass} 
                            />
                            <GameCardField
                                label="Initial Price"
                                value={priceService.formatPrice(activeGuess.initialPrice)}
                                icon={<FlashOnIcon />}
                                colorClass={borderClass}
                            />
                            <GameCardField
                                label="Prediction"
                                value={activeGuess.prediction === 'up' ? <SvgIcon>
                                    <ArrowCircleUp />
                                </SvgIcon> : <SvgIcon>
                                    <ArrowCircleDown />
                                </SvgIcon>}
                                icon={activeGuess.prediction === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                                colorClass={borderClass}
                            />
                            <GameCardField
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