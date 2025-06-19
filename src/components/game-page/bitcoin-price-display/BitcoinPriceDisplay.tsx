import React, { useState, useEffect, useRef } from "react";
import "./BitcoinPriceDisplay.css";
import { usePrice } from "../../../hooks/use-price";




export const BitcoinPriceDisplay: React.FC = () => {
  const [priceColorClass, setPriceColorClass] = useState("bitcoin-price-white");
  const previousPriceRef = useRef<number | null>(null);
  const { data, loading, error, formatPrice } = usePrice();

  useEffect(() => {
    if(!data) return;
    if (
      previousPriceRef.current !== null &&
      data.price !== previousPriceRef.current
    ) {
      console.log(`price from: ${previousPriceRef.current} -> to: ${data.price}`);

      if (data.price > previousPriceRef.current) {
        setPriceColorClass("bitcoin-price-animate-increase");
      } else if (data.price < previousPriceRef.current) {
        setPriceColorClass("bitcoin-price-animate-decrease");
      }
    }

    previousPriceRef.current = data.price;
  }, [data]);

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  onanimationend = () => {
    setPriceColorClass("bitcoin-price-white");
  };

  if(loading && !data) {
    return (
      <div className="text-lg text-gray-500">
        Bitcoin price is loading...
      </div>
    )
  }

  if(error || !data) {
    return (
      <div className="text-lg text-error-red mb-5">❌ {error}</div>
    )
  }

  return (
    <>
      <div className={`bitcoin-price ${priceColorClass}`}>
        {formatPrice(data.price)}
      </div>

      <div className="bitcoin-pair-label">BTC/USDT</div>

      <div className="bitcoin-timestamp">
        Last Update: {formatTimestamp(data.lastUpdated)}
      </div>
    </>
  );
};
