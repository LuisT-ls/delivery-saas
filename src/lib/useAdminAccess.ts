import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useAuthContext } from '@/components/AuthProvider';
import { secureLog } from './utils';

export interface AdminAccess {
  hasAccess: boolean;
  restaurantId: string | null;
  restaurant: any | null;
  loading: boolean;
  error: string | null;
}

export function useAdminAccess(): AdminAccess {
  const { user, isAuthenticated } = useAuthContext();
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurant, setRestaurant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!isAuthenticated || !user?.uid) {
        setLoading(false);
        setRestaurantId(null);
        setRestaurant(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Verificar se o usuário tem um restaurante vinculado
        const restaurantRef = doc(db, 'restaurants', user.uid);
        const restaurantDoc = await getDoc(restaurantRef);

        if (restaurantDoc.exists()) {
          const restaurantData = restaurantDoc.data();
          
          // Verificar se o usuário é o proprietário do restaurante
          if (restaurantData.ownerId === user.uid) {
            setRestaurantId(user.uid);
            setRestaurant({ id: user.uid, ...restaurantData });
            secureLog('Acesso administrativo concedido', { 
              userId: user.uid, 
              restaurantId: user.uid,
              restaurantName: restaurantData.name 
            });
          } else {
            setError('Usuário não é proprietário do restaurante');
            setRestaurantId(null);
            setRestaurant(null);
          }
        } else {
          setError('Usuário não possui restaurante cadastrado');
          setRestaurantId(null);
          setRestaurant(null);
        }
      } catch (err: any) {
        console.error('Erro ao verificar acesso administrativo:', err);
        setError('Erro ao verificar permissões administrativas');
        setRestaurantId(null);
        setRestaurant(null);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [isAuthenticated, user?.uid]);

  const hasAccess = isAuthenticated && !!restaurantId && !!restaurant;

  return {
    hasAccess,
    restaurantId,
    restaurant,
    loading,
    error
  };
}
