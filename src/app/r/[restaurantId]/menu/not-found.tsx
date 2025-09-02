import Link from 'next/link';

export default function MenuNotFound() {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="mb-4">
          <i className="fas fa-store fa-4x text-muted"></i>
        </div>
        <h2 className="h4 mb-3">Restaurante não encontrado</h2>
        <p className="text-muted mb-4">
          O restaurante que você está procurando não existe ou não está disponível.
        </p>
        <Link href="/" className="btn btn-primary">
          <i className="fas fa-home me-2"></i>
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
