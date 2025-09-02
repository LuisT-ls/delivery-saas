export default function Loading() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <i className="fas fa-spinner fa-spin fa-3x text-primary mb-3"></i>
          <h2>Carregando...</h2>
          <p className="text-muted">Aguarde enquanto carregamos o conteúdo.</p>
        </div>
      </div>
    </div>
  )
}
