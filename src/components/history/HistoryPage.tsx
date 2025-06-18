import { UserHistory } from "./UserHistory";
import "./History.css";

export const HistoryPage = () => {
  return (
    <div className="history-page">
      <div className="history-header">
        <h1 className="history-title">Guess History</h1>
        <p className="history-subtitle">Track your Bitcoin price predictions</p>
      </div>
      <UserHistory />
    </div>
  );
};
