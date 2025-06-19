import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { BitcoinPriceDisplay } from "./bitcoin-price-display/BitcoinPriceDisplay";
import "../../styles/Common.css";
import { GuessPanel } from "./guess-panel/GuessPanel";
import { Score } from "./score/Score";

export const GamePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-dark-bg text-white flex flex-col justify-center items-center p-5 pt-[90px] dashboard-main">
        <div className="text-center max-w-[600px] w-full">
          

          <>
            <Score />
            <BitcoinPriceDisplay />
            <GuessPanel />
          </>
        </div>
      </div>
    </>
  );
};
