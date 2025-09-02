export default function CarrinhoLoading() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <i className="fas fa-shopping-cart fa-3x text-primary mb-3"></i>
          <h2>Carregando Carrinho...</h2>
          <p className="text-muted">Aguarde enquanto carregamos seus itens.</p>
        </div>
      </div>
    </div>
  )
}
