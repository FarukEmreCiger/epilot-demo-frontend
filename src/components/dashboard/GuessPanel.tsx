import { useEffect, useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase";
import { Guess } from "../../types/guess";
import { MakeGuessPanel } from "./MakeGuessPanel";
import { ActiveGuess } from "./ActiveGuess";
import { MakeNewGuessButton } from "./MakeNewGuessButton";

export const GuessPanel = () => {
    const { user } = useAuth();
    const [activeGuess, setActiveGuess] = useState<Guess | null>(null);
    const [loading, setLoading] = useState(true);
    const [isGuessCompleted, setIsGuessCompleted] = useState(false);

    const handleContinue = () => {
        setActiveGuess(null);
        setIsGuessCompleted(false);
        setLoading(false);
    };

    useEffect(() => {
        if (!user) {
            console.log('No user found');
            return;
        }

        console.log('User:', user);

        const activeGuessRef = ref(database, `users/${user.uid}/activeGuessId`);
        const unsubscribeActiveGuessId = onValue(activeGuessRef, (snapshot) => {
            const activeGuessId = snapshot.val();

            console.log('Active Guess ID:', activeGuessId);

            const guessRef = ref(database, `guesses/${user.uid}/${activeGuessId}`);
            const unsubscribeGuess = onValue(guessRef, (guessSnapshot) => {
                const guessData = guessSnapshot.val();
                console.log('Guess Data:', guessData);
                if (guessData) {
                    setActiveGuess(guessData);
                    if (guessData.result) {
                        setIsGuessCompleted(true);
                        unsubscribeGuess();
                    }
                }
                setLoading(false);
            });

            return () => unsubscribeGuess();
        });

        return () => unsubscribeActiveGuessId();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (activeGuess || (activeGuess && isGuessCompleted)) {
        return <div>
            <ActiveGuess activeGuess={activeGuess} />
            {isGuessCompleted && (
                <MakeNewGuessButton onClick={handleContinue} />
            )}
        </div>;
    }

    return <MakeGuessPanel />;
};