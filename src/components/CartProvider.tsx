'use client';

import { useCartInitialization } from '@/lib/cart-hooks';

interface CartProviderProps {
  children: React.ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  useCartInitialization();

  return <>{children}</>;
}
