import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';

// Corrigir Storage Bucket para usar formato antigo (appspot.com) para evitar problemas de CORS
const getStorageBucket = () => {
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mock-project.appspot.com';
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mock-project-id';
  
  // Se o bucket está no formato novo (firebasestorage.app), converter para formato antigo
  if (bucket.includes('firebasestorage.app')) {
    return `${projectId}.appspot.com`;
  }
  
  return bucket;
};

// Verificar se as variáveis de ambiente estão configuradas
const isProduction = process.env.NODE_ENV === 'production';
const hasFirebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (isProduction && !hasFirebaseConfig) {
  console.error('❌ Firebase não configurado em produção! Configure as variáveis de ambiente no Vercel.');
}

// Debug: Log das configurações em produção
if (isProduction && hasFirebaseConfig) {
  const originalBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const correctedBucket = getStorageBucket();
  
  console.log('🔧 Firebase configurado:', {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    originalStorageBucket: originalBucket,
    correctedStorageBucket: correctedBucket,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  });
  
  if (originalBucket !== correctedBucket) {
    console.log('✅ Storage Bucket corrigido para evitar problemas de CORS');
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'mock_api_key_for_build',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mock-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mock-project-id',
  storageBucket: getStorageBucket(),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Firebase Cloud Messaging
export const getMessagingInstance = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getMessaging(app);
  }
  return null;
};


export default app;
