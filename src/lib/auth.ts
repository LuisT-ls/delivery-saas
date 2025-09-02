import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential
} from 'firebase/auth';
import { auth } from './firebase';

// Provider para login com Google
const googleProvider = new GoogleAuthProvider();

// Configurar escopo para acessar email e perfil
googleProvider.addScope('email');
googleProvider.addScope('profile');

/**
 * Login com Google (para admin/staff)
 */
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error('Erro no login com Google:', error);
    throw error;
  }
};

/**
 * Login anônimo (para clientes)
 */
export const signInAnonymously = async (): Promise<UserCredential> => {
  try {
    const result = await signInAnonymously(auth);
    return result;
  } catch (error) {
    console.error('Erro no login anônimo:', error);
    throw error;
  }
};

/**
 * Logout
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Erro no logout:', error);
    throw error;
  }
};

/**
 * Listener para mudanças no estado de autenticação
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Verificar se o usuário está logado
 */
export const isUserLoggedIn = (): boolean => {
  return auth.currentUser !== null;
};

/**
 * Obter usuário atual
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Verificar se o usuário é anônimo
 */
export const isAnonymousUser = (): boolean => {
  return auth.currentUser?.isAnonymous || false;
};

/**
 * Verificar se o usuário logou com Google
 */
export const isGoogleUser = (): boolean => {
  return auth.currentUser?.providerData.some(
    provider => provider.providerId === 'google.com'
  ) || false;
};
