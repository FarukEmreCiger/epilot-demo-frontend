import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { usePrice } from "../../hooks/use-price";
import { BitcoinPriceDisplay } from "./bitcoin-price-display/BitcoinPriceDisplay";
import "../../styles/Common.css";
import { GuessPanel } from "./guess-panel/GuessPanel";
import { Score } from "./score/Score";

export const GamePage: React.FC = () => {
  const { user } = useAuth();
  const { data, loading, error, formatPrice } = usePrice();

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-dark-bg text-white flex flex-col justify-center items-center p-5 pt-[90px] dashboard-main">
        <div className="text-center max-w-[600px] w-full">
          {loading && !data && (
            <div className="text-lg text-gray-500">
              Bitcoin price is loading...
            </div>
          )}

          {error && (
            <div className="text-lg text-error-red mb-5">❌ {error}</div>
          )}

          {data && (
            <>
              <div className="pb-2">
                <Score />
              </div>
              <BitcoinPriceDisplay
                price={data.price}
                timestamp={data.lastUpdated}
                formatPrice={formatPrice}
              />
              <GuessPanel />
            </>
          )}
        </div>
      </div>
    </>
  );
};
