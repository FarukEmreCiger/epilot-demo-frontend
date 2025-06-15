export interface Guess {
  id: string;
  initialPrice: number;
  prediction: "up" | "down";
  status: "pending" | "resolved";
  result: "correct" | "incorrect";
  resolvedPrice: number;
  resolvedAt: number;
  createdAt: number;
  userId: string;
  guessResolveDelay: number;
} 