import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth } from '../firebase';
import { LoginForm, RegisterForm, AuthUser } from '../types/auth.types';

export class AuthService {

  async register(formData: RegisterForm): Promise<AuthUser> {
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      const result = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      return this.mapFirebaseUserToAuthUser(result.user);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw this.handleAuthError(error);
    }
  }

  async login(formData: LoginForm): Promise<AuthUser> {
    try {
      const result = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      return this.mapFirebaseUserToAuthUser(result.user);
    } catch (error: any) {
      console.error('Login error:', error);
      throw this.handleAuthError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error('Logout error');
    }
  }

  async getCurrentUserToken(): Promise<string> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User is not logged in');
    }
    
    try {
      return await currentUser.getIdToken();
    } catch (error: any) {
      console.error('Token error:', error);
      throw new Error('Token error');
    }
  }

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser) => {
      const user = firebaseUser ? this.mapFirebaseUserToAuthUser(firebaseUser) : null;
      callback(user);
    });
  }

  private mapFirebaseUserToAuthUser(firebaseUser: User): AuthUser {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      creationTime: firebaseUser.metadata.creationTime
    };
  }

  private handleAuthError(error: any): Error {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return new Error('This email address is already in use');
      case 'auth/weak-password':
        return new Error('Password is too weak');
      case 'auth/invalid-email':
        return new Error('Invalid email address');
      case 'auth/user-not-found':
        return new Error('User not found');
      case 'auth/wrong-password':
        return new Error('Wrong password');
      case 'auth/too-many-requests':
        return new Error('Too many requests. Please try again later');
      default:
        return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export const authService = new AuthService(); 