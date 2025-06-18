export interface PriceData {
  symbol: string;
  price: number;
  lastUpdated: number;
}

export interface PriceState {
  data: PriceData | null;
  loading: boolean;
  error: string | null;
  connected: boolean;
} 