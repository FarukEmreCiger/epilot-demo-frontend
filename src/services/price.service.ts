import { ref, onValue, off, DatabaseReference } from 'firebase/database';
import { database } from '../firebase';
import { PriceData } from '../types/price.types';

export class PriceService {
  private priceRef: DatabaseReference;

  constructor() {
    this.priceRef = ref(database, 'exchange/btcusdt/current/price');
  }

  subscribeToPrice(callback: (priceData: PriceData | null, error?: string) => void): () => void {
    const unsubscribe = onValue(
      this.priceRef,
      (snapshot) => {
        try {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const priceData: PriceData = {
              symbol: 'BTC/USDT',
              price: data.price || data,
              lastUpdated: data.lastUpdated || Date.now(),
            };
            callback(priceData);
          } else {
            callback(null);
          }
        } catch (error) {
          console.error('Price data reading error:', error);
          callback(null, 'Price data reading error');
        }
      },
      (error) => {
        console.error('Server connection error:', error);
        callback(null, 'Server connection error');
      }
    );

    return () => {
      off(this.priceRef, 'value', unsubscribe);
    };
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  }

  formatPercentChange(percent: number): string {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  }

  getPriceChangeColor(change: number): string {
    if (change > 0) return '#4CAF50';
    if (change < 0) return '#f44336';
    return '#757575';
  }
}

export const priceService = new PriceService(); 