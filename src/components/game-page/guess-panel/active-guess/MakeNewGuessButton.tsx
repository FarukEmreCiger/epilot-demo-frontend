import { Button } from '@mui/material';
import '../GuessButtons.css';

export const MakeNewGuessButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button 
            variant="contained"
            onClick={onClick}
            className="btn-new-guess"
        >
            Make a new guess
        </Button>
    );
};