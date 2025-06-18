import React, { useState, useEffect, useRef } from "react";
import "./BitcoinPriceDisplay.css";

interface BitcoinPriceDisplayProps {
  price: number;
  timestamp: number;
  formatPrice: (price: number) => string;
}

export const BitcoinPriceDisplay: React.FC<BitcoinPriceDisplayProps> = ({
  price,
  timestamp,
  formatPrice,
}) => {
  const [priceColorClass, setPriceColorClass] = useState("bitcoin-price-white");
  const previousPriceRef = useRef<number | null>(null);

  useEffect(() => {
    if (
      previousPriceRef.current !== null &&
      price !== previousPriceRef.current
    ) {
      console.log(`price from: ${previousPriceRef.current} -> to: ${price}`);

      if (price > previousPriceRef.current) {
        setPriceColorClass("bitcoin-price-animate-increase");
      } else if (price < previousPriceRef.current) {
        setPriceColorClass("bitcoin-price-animate-decrease");
      }
    }
    
    previousPriceRef.current = price;
  }, [price]);

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <>
      <div className={`bitcoin-price ${priceColorClass}`}>
        {formatPrice(price)}
      </div>

      <div className="bitcoin-pair-label">BTC/USDT</div>

      <div className="bitcoin-timestamp">
        Last Update: {formatTimestamp(timestamp)}
      </div>
    </>
  );
};
