import { useEffect, useMemo, useRef, useState } from "react";
import { ref, onValue } from "firebase/database";
import "./ScoreBadge.css";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { Box, Typography, Avatar } from "@mui/material";
import {
  EmojiEvents,
  Star,
  LocalFireDepartment,
  Start,
} from "@mui/icons-material";

const scoreLevels = [
  {
    minScore: 12,
    level: "Legend",
    icon: <EmojiEvents sx={{ fontSize: 40 }} />,
  },
  {
    minScore: 9,
    level: "Master",
    icon: <LocalFireDepartment sx={{ fontSize: 40 }} />,
  },
  {
    minScore: 6,
    level: "Experienced",
    icon: <Star sx={{ fontSize: 40 }} />,
  },
  {
    minScore: 3,
    level: "Beginner",
    icon: <Start sx={{ fontSize: 40 }} />,
  },
];
export const Score = () => {
  const { user } = useAuth();
  const [score, setScore] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<"stable" | "up" | "down">("stable");
  const previousScoreRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!user) return;

    const scoreDbRef = ref(database, `users/${user.uid}/score`);

    const unsubscribe = onValue(scoreDbRef, (snapshot) => {
      const newScore = snapshot.val() || 0;
      if (!previousScoreRef.current) {
        previousScoreRef.current = newScore;
      }

      if (previousScoreRef.current && newScore > previousScoreRef.current) {
        setStatus("up");
      } else if (previousScoreRef.current && newScore < previousScoreRef.current) {
        setStatus("down");
      }

      setTimeout(() => {
        setStatus("stable");
      }, 3000);

      setScore(newScore);
      previousScoreRef.current = newScore;
    });

    return () => unsubscribe();
  }, [user]);

  const currentScoreData = useMemo(() => {
    if (!score) return scoreLevels[scoreLevels.length - 1];
    return (
      scoreLevels.find((levelData) => score >= levelData.minScore) ||
      scoreLevels[scoreLevels.length - 1]
    );
  }, [score]);

  const handleAnimationEnd = () => {
    setStatus("stable");
  };

  if (score === undefined) {
    return <div></div>;
  }

  const getAvatarClassName = () => {
    let className = `score-avatar`;
    if (status === "up") className += " score-avatar-green";
    else if (status === "down") className += " score-avatar-red";
    return className;
  };

  const getScoreNumberClassName = () => {
    let className = "score-number";
    if (status === "up") className += " score-number-green";
    else if (status === "down") className += " score-number-red";
    return className;
  };

  return (
    <Box className={`score-container`}>
      <Avatar
        className={getAvatarClassName()}
        onAnimationEnd={handleAnimationEnd}
      >
        {currentScoreData.icon}
      </Avatar>

      <Typography variant="h6" className="score-level-text">
        Level: {currentScoreData.level}
      </Typography>

      <Typography
        variant="h2"
        component="div"
        className={getScoreNumberClassName()}
      >
        {score?.toLocaleString()}
      </Typography>

      <Typography variant="body1" className="score-label">
        SCORE
      </Typography>

      <Box className="score-star-top">
        <Star sx={{ fontSize: 16, color: "#FFD700" }} />
      </Box>
      <Box className="score-star-bottom">
        <Star sx={{ fontSize: 12, color: "#FFD700" }} />
      </Box>
    </Box>
  );
};
