export interface PriceData {
  symbol: string;
  price: number;
  timestamp: number;
  change24h?: number;
  changePercent24h?: number;
}

export interface PriceState {
  data: PriceData | null;
  loading: boolean;
  error: string | null;
  connected: boolean;
} 