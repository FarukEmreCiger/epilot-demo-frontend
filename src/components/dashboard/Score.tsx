import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import { Box, Typography, Avatar } from '@mui/material';
import { EmojiEvents, Star, LocalFireDepartment, Start } from '@mui/icons-material';

export const Score = () => {
    const { user } = useAuth();
    const [score, setScore] = useState<number | undefined>(undefined);
    const [color, setColor] = useState<string>('#FFD700');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!user) return;

        const scoreRef = ref(database, `users/${user.uid}/score`);
        
        const unsubscribe = onValue(scoreRef, (snapshot) => {
            const newScore = snapshot.val() || 0;
            if(score === undefined) {
                setScore(newScore);
            }
            
            if (newScore !== score) {
                setIsAnimating(true);
                
                if (score && newScore > score) {
                    setColor('#4CAF50'); // Yeşil
                } else if (score && newScore < score) {
                    setColor('#F44336'); // Kırmızı
                }
                setScore(newScore);

                setTimeout(() => {
                    setColor('#FFD700');
                    setIsAnimating(false);
                }, 3000);
            }
        });

        return () => unsubscribe();
    }, [user, score]);

    if(score === undefined) {
        return <div></div>;
    }

    const scoreLevels = [
        { minScore: 12, level: "Legend", icon: <EmojiEvents sx={{ fontSize: 40 }} /> },
        { minScore: 9, level: "Master", icon: <LocalFireDepartment sx={{ fontSize: 40 }} /> },
        { minScore: 6, level: "Experienced", icon: <Star sx={{ fontSize: 40 }} /> },
        { minScore: 3, level: "Beginner", icon: <Start sx={{ fontSize: 40 }} /> }
    ];

    const getCurrentScoreData = () => {
        return scoreLevels.find(levelData => score >= levelData.minScore) || scoreLevels[scoreLevels.length - 1];
    };

    const currentScoreData = getCurrentScoreData();

    const getAvatarClassName = () => {
        let className = `score-avatar ${isAnimating ? 'score-avatar-animated' : ''}`;
        if (color === '#4CAF50') className += ' score-avatar-green';
        else if (color === '#F44336') className += ' score-avatar-red';
        return className;
    };

    const getScoreNumberClassName = () => {
        let className = 'score-number';
        if (color === '#4CAF50') className += ' score-number-green';
        else if (color === '#F44336') className += ' score-number-red';
        return className;
    };

    return (
        <Box
            className={`score-container ${isAnimating ? 'score-container-animated score-container-shimmer' : ''}`}
        >
            <Avatar className={getAvatarClassName()}>
                {currentScoreData.icon}
            </Avatar>
            
            <Typography
                variant="h6"
                className="score-level-text"
            >
                Level: {currentScoreData.level}
            </Typography>
            
            <Typography
                variant="h2"
                component="div"
                className={getScoreNumberClassName()}
            >
                {score?.toLocaleString()}
            </Typography>
            
            <Typography
                variant="body1"
                className="score-label"
            >
                SCORE
            </Typography>
            
            <Box className="score-star-top">
                <Star sx={{ fontSize: 16, color: '#FFD700' }} />
            </Box>
            <Box className="score-star-bottom">
                <Star sx={{ fontSize: 12, color: '#FFD700' }} />
            </Box>
        </Box>
    );
};