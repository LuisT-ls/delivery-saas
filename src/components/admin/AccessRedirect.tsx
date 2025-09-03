'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/components/AuthProvider';
import { useAdminAccess } from '@/lib/useAdminAccess';
import LoadingSpinner from '@/components/LoadingSpinner';

interface AccessRedirectProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AccessRedirect({ children, redirectTo = '/onboarding' }: AccessRedirectProps) {
  const { isAuthenticated, loading: authLoading } = useAuthContext();
  const { hasAccess, loading: adminLoading } = useAdminAccess();
  const router = useRouter();

  useEffect(() => {
    // Aguardar carregamento da autenticação e verificação de acesso
    if (authLoading || adminLoading) return;

    // Se não está autenticado, redirecionar para login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Se está autenticado mas não tem acesso administrativo, redirecionar
    if (!hasAccess) {
      router.push(redirectTo);
      return;
    }
  }, [isAuthenticated, hasAccess, authLoading, adminLoading, router, redirectTo]);

  // Mostrar loading enquanto verifica acesso
  if (authLoading || adminLoading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <LoadingSpinner />
            <p className="mt-3">Verificando permissões de acesso...</p>
          </div>
        </div>
      </div>
    );
  }

  // Se não tem acesso, não renderizar nada (será redirecionado)
  if (!isAuthenticated || !hasAccess) {
    return null;
  }

  // Se tem acesso, renderizar o conteúdo
  return <>{children}</>;
}
