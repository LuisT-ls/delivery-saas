'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  signInWithGoogle, 
  signInAnonymouslyUser, 
  signOutUser, 
  onAuthStateChange,
  getCurrentUser,
  signUpWithEmail
} from './auth';
import { SignUpData, AuthError } from './types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Erro no login com Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginAnonymously = async () => {
    try {
      setLoading(true);
      await signInAnonymouslyUser();
    } catch (error) {
      console.error('Erro no login anônimo:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData): Promise<void> => {
    try {
      setLoading(true);
      await signUpWithEmail(data);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOutUser();
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    loginWithGoogle,
    loginAnonymously,
    signUp,
    logout,
    isAuthenticated: !!user
  };
}
