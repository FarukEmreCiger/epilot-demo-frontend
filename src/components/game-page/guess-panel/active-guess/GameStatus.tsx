import { GameStatusBadge } from "./GameStatusBadge";

export const GameStatus = ({ result }: { result?: string }) => {
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