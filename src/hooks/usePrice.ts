import { useState, useEffect } from 'react';
import { priceService } from '../services/price.service';
import { PriceState } from '../types/price.types';

export const usePrice = () => {
  const [priceState, setPriceState] = useState<PriceState>({
    data: null,
    loading: true,
    error: null,
    connected: false
  });

  useEffect(() => {
    setPriceState(prev => ({ ...prev, loading: true }));

    const unsubscribe = priceService.subscribeToPrice((priceData, error) => {
      if (error) {
        setPriceState(prev => ({
          ...prev,
          loading: false,
          error,
          connected: false
        }));
      } else {
        setPriceState(prev => ({
          ...prev,
          data: priceData,
          loading: false,
          error: null,
          connected: true
        }));
      }
    });

    return unsubscribe;
  }, []);

  const formatPrice = (price: number): string => {
    return priceService.formatPrice(price);
  };

  const formatPercentChange = (percent: number): string => {
    return priceService.formatPercentChange(percent);
  };

  const getPriceChangeColor = (change: number): string => {
    return priceService.getPriceChangeColor(change);
  };

  const clearError = () => {
    setPriceState(prev => ({ ...prev, error: null }));
  };

  return {
    ...priceState,
    formatPrice,
    formatPercentChange,
    getPriceChangeColor,
    clearError
  };
}; 