import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile, SignUpData, AuthError } from './types';
import { secureLog, sanitizeForLogging } from './utils';

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
export const signInAnonymouslyUser = async (): Promise<UserCredential> => {
  try {
    const result = await signInAnonymously(auth);
    return result;
  } catch (error) {
    console.error('Erro no login anônimo:', error);
    throw error;
  }
};

/**
 * Login com email e senha
 */
export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    secureLog('Tentativa de login iniciada', { email: sanitizeForLogging({ email }).email });
    
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    secureLog('Login realizado com sucesso', { uid: result.user.uid });
    
    return result;
  } catch (error: any) {
    const authError = mapFirebaseAuthError(error);
    secureLog('Erro no login', { code: authError.code, message: authError.message });
    throw authError;
  }
};

/**
 * Cadastro com email e senha
 */
export const signUpWithEmail = async (data: SignUpData): Promise<UserCredential> => {
  try {
    const { email, password } = data;
    
    // Log seguro para debugging (sem dados sensíveis)
    secureLog('Tentativa de cadastro iniciada', sanitizeForLogging(data), ['password', 'email', 'telefone']);
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Criar perfil do usuário no Firestore
    await createUserProfile(userCredential.user.uid, {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone
    });
    
    secureLog('Cadastro realizado com sucesso', { uid: userCredential.user.uid });
    
    return userCredential;
  } catch (error: any) {
    const authError = mapFirebaseAuthError(error);
    secureLog('Erro no cadastro', { code: authError.code, message: authError.message });
    throw authError;
  }
};

/**
 * Criar perfil do usuário no Firestore
 */
export const createUserProfile = async (uid: string, profileData: Partial<UserProfile>): Promise<void> => {
  try {
    const userProfile: Omit<UserProfile, 'uid'> = {
      nome: profileData.nome!,
      email: profileData.email!,
      telefone: profileData.telefone!,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };

    await setDoc(doc(db, 'users', uid), userProfile);
    secureLog('Perfil do usuário criado no Firestore', { uid });
  } catch (error) {
    secureLog('Erro ao criar perfil do usuário', { uid, error: error instanceof Error ? error.message : 'Erro desconhecido' });
    throw new Error('Falha ao criar perfil do usuário');
  }
};

/**
 * Obter perfil do usuário do Firestore
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { uid, ...userDoc.data() } as UserProfile;
    }
    return null;
  } catch (error) {
    secureLog('Erro ao obter perfil do usuário', { uid, error: error instanceof Error ? error.message : 'Erro desconhecido' });
    return null;
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

/**
 * Mapear erros do Firebase Auth para mensagens amigáveis
 */
export const mapFirebaseAuthError = (error: any): AuthError => {
  let userMessage = 'Ocorreu um erro inesperado. Tente novamente.';
  
  switch (error.code) {
    case 'auth/email-already-in-use':
      userMessage = 'Este email já está sendo usado por outra conta.';
      break;
    case 'auth/invalid-email':
      userMessage = 'Email inválido. Verifique o formato.';
      break;
    case 'auth/operation-not-allowed':
      userMessage = 'Cadastro com email e senha não está habilitado.';
      break;
    case 'auth/weak-password':
      userMessage = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
      break;
    case 'auth/network-request-failed':
      userMessage = 'Erro de conexão. Verifique sua internet.';
      break;
    case 'auth/too-many-requests':
      userMessage = 'Muitas tentativas. Tente novamente em alguns minutos.';
      break;
    case 'auth/user-disabled':
      userMessage = 'Esta conta foi desabilitada.';
      break;
    case 'auth/user-not-found':
      userMessage = 'Usuário não encontrado.';
      break;
    case 'auth/wrong-password':
      userMessage = 'Senha incorreta.';
      break;
    default:
      userMessage = 'Ocorreu um erro inesperado. Tente novamente.';
  }

  return {
    code: error.code || 'unknown',
    message: error.message || 'Erro desconhecido',
    userMessage
  };
};
