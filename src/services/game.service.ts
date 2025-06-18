import { httpsCallable } from 'firebase/functions';
import { functions, auth } from '../firebase';
import { Guess } from '../types/guess.type';

export interface MakeGuessRequest {
  prediction: 'up' | 'down';
}

export interface MakeGuessResponse {
  success: boolean;
  guessId: string;
  initialPrice: number;
  message: string;
}

export interface LeaderboardEntry {
  uid: string;
  score: number;
}

export interface LeaderboardResponse {
  success: boolean;
  leaderboard: LeaderboardEntry[];
}

export interface GuessHistoryResponse {
  success: boolean;
  guesses: Guess[];
  hasNextPage: boolean;
  nextPageKey: string | null;
}

export class GameService {
  private makeGuessFunction = httpsCallable<MakeGuessRequest, MakeGuessResponse>(functions, 'makeGuess');
  private getLeaderboardFunction = httpsCallable<{}, LeaderboardResponse>(functions, 'getLeaderboard');
  private getGuessHistoryFunction = httpsCallable<{ lastKey: string | null }, GuessHistoryResponse>(functions, 'getGuessHistory');

  async makeGuess(prediction: 'up' | 'down'): Promise<MakeGuessResponse> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not logged in!');
      }
      
      console.log('🎯 Making guess:', prediction);
      
      const result = await this.makeGuessFunction({ prediction });
      
      if (result.data.success) {
        console.log('✅ Guess created successfully:', result.data);
      } else {
        console.error('❌ Guess creation failed');
      }
      
      return result.data;
    } catch (error: any) {
      console.error('❌ Guess creation failed:', error);

      const message = this.handleFirebaseError(error);
      throw new Error(message);
    }
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const result = await this.getLeaderboardFunction({});
      
      if (result.data.success) {
        return result.data.leaderboard;
      } else {
        throw new Error('Leaderboard not found');
      }
    } catch (error: any) {
      console.error('❌ Leaderboard fetch failed:', error);
      const message = this.handleFirebaseError(error);
      throw new Error(message);
    }
  }

  async getGuessHistory(lastKey: string | null = null): Promise<{
    guesses: Guess[];
    hasNextPage: boolean;
    nextPageKey: string | null;
  }> {
    try {
      const result = await this.getGuessHistoryFunction({ lastKey });
      
      if (result.data.success) {
        return {
          guesses: result.data.guesses,
          hasNextPage: result.data.hasNextPage,
          nextPageKey: result.data.nextPageKey
        };
      } else {
        throw new Error('Guess history not found');
      }
    } catch (error: any) {
      console.error('❌ Guess history fetch failed:', error);
      const message = this.handleFirebaseError(error);
      throw new Error(message);
    }
  }

  private handleFirebaseError(error: any): string {
    if (error.code) {
      switch (error.code) {
        case 'functions/unauthenticated':
          return 'You need to be logged in';
        case 'functions/permission-denied':
          return 'You are not authorized to perform this action';
        case 'functions/failed-precondition':
          return error.message || 'There is an active guess';
        case 'functions/invalid-argument':
          return error.message || 'Invalid guess value';
        case 'functions/internal':
          return 'Server error, please try again';
        case 'functions/unavailable':
          return 'Service is currently unavailable';
        default:
          return error.message || 'Unknown error occurred';
      }
    }
    
    return error.message || 'Unknown error occurred';
  }
}

export const gameService = new GameService(); 