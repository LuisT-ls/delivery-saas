'use client';

import Link from 'next/link';

export default function MenuError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="mb-4">
          <i className="fas fa-exclamation-triangle fa-4x text-warning"></i>
        </div>
        <h2 className="h4 mb-3">Erro ao carregar o menu</h2>
        <p className="text-muted mb-4">
          Ocorreu um erro inesperado ao carregar o menu do restaurante.
        </p>
        <div className="d-flex gap-2 justify-content-center">
          <button
            onClick={reset}
            className="btn btn-primary"
          >
            <i className="fas fa-redo me-2"></i>
            Tentar Novamente
          </button>
          <Link href="/" className="btn btn-outline-secondary">
            <i className="fas fa-home me-2"></i>
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
