import { useEffect, useState } from "react";
import { Guess } from "../../types/guess";
import { gameService } from "../../services/game.service";
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const UserHistory = () => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextPageKey, setNextPageKey] = useState<string | null>(null);

  const loadGuesses = async (lastKey: string | null = null) => {
    try {
      setLoading(true);
      const result = await gameService.getGuessHistory(lastKey);
      
      if (lastKey) {
        setGuesses(prev => [...prev, ...result.guesses]);
      } else {
        setGuesses(result.guesses);
      }
      
      setHasNextPage(result.hasNextPage);
      setNextPageKey(result.nextPageKey);
    } catch (error) {
      console.error("Tahmin geçmişi yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuesses();
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("tr-TR");
  };

  const getResultColor = (result: string | null) => {
    if (result === "correct") return "#4caf50";
    if (result === "incorrect") return "#f44336";
    return "text.primary";
  };

  const loadMore = () => {
    if (hasNextPage && nextPageKey) {
      loadGuesses(nextPageKey);
    }
  };

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mt: 2,
        backgroundColor: '#1e1e1e',
        '& .MuiTable-root': {
          backgroundColor: '#1e1e1e',
        },
        '& .MuiTableCell-root': {
          color: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.12)'
        },
        '& .MuiTableRow-root:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)'
        }
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Guess</TableCell>
            <TableCell>Initial Price</TableCell>
            <TableCell>Resolved Price</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guesses.map((guess) => (
            <TableRow 
              key={guess.id}
              sx={{
                backgroundColor: guess.result === "correct" ? 'rgba(76, 175, 80, 0.1)' :
                               guess.result === "incorrect" ? 'rgba(244, 67, 54, 0.1)' :
                               'inherit'
              }}
            >
              <TableCell>{formatDate(guess.createdAt)}</TableCell>
              <TableCell>{guess.prediction === "up" ? "UP" : "DOWN"}</TableCell>
              <TableCell>${guess.initialPrice.toFixed(2)}</TableCell>
              <TableCell>
                {guess.resolvedPrice ? `$${guess.resolvedPrice.toFixed(2)}` : "-"}
              </TableCell>
              <TableCell sx={{ color: getResultColor(guess.result) }}>
                {guess.result === "correct" ? "Correct" : 
                 guess.result === "incorrect" ? "Incorrect" : 
                 "Pending"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {hasNextPage && (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <Button 
            variant="contained" 
            onClick={loadMore} 
            disabled={loading}
            sx={{
              backgroundColor: '#2196f3',
              '&:hover': {
                backgroundColor: '#1976d2'
              }
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Load More"}
          </Button>
        </div>
      )}
    </TableContainer>
  );
};