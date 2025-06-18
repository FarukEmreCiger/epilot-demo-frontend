import { useEffect, useState } from "react";
import { Guess } from "../../types/guess.type";
import { gameService } from "../../services/game.service";
import "./History.css";

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

  const getRowClass = (result: string | null) => {
    if (result === "correct") return "guess-row correct";
    if (result === "incorrect") return "guess-row incorrect";
    return "guess-row";
  };

  const loadMore = () => {
    if (hasNextPage && nextPageKey) {
      loadGuesses(nextPageKey);
    }
  };

  if(loading && guesses.length === 0) {
    return <div className="w-full flex items-center justify-center"><div className="loading-spinner"></div></div>;
  }

  if(!loading && guesses.length === 0) {
    return <div className="w-full flex items-center justify-center"><div className="text-white text-2xl">No guesses yet</div></div>;
  }

  return (
    <div className="history-container">
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Guess</th>
            <th>Initial Price</th>
            <th>Resolved Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess) => (
            <tr key={guess.id} className={getRowClass(guess.result)}>
              <td>{formatDate(guess.createdAt)}</td>
              <td>{guess.prediction === "up" ? "UP" : "DOWN"}</td>
              <td>${guess.initialPrice.toFixed(2)}</td>
              <td>
                {guess.resolvedPrice ? `$${guess.resolvedPrice.toFixed(2)}` : "-"}
              </td>
              <td>
                {guess.result === "correct" ? "Correct" : 
                 guess.result === "incorrect" ? "Incorrect" : 
                 "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {hasNextPage && (
        <div className="load-more-container">
          <button 
            className="load-more-btn" 
            onClick={loadMore} 
            disabled={loading}
          >
            {loading ? <div className="loading"></div> : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};