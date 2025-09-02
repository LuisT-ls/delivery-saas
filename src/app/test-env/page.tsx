'use client'

export default function TestEnvPage() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-header">
              <h3>Teste de Variáveis de Ambiente</h3>
            </div>
            <div className="card-body">
              <h5>Configurações do Firebase:</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>API Key:</strong>
                  <span className="text-muted ms-2">
                    {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?
                      `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY.substring(0, 10)}...` :
                      '❌ Não configurada'
                    }
                  </span>
                </li>
                <li className="list-group-item">
                  <strong>Auth Domain:</strong>
                  <span className="text-muted ms-2">
                    {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '❌ Não configurada'}
                  </span>
                </li>
                <li className="list-group-item">
                  <strong>Project ID:</strong>
                  <span className="text-muted ms-2">
                    {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '❌ Não configurada'}
                  </span>
                </li>
                <li className="list-group-item">
                  <strong>VAPID Key:</strong>
                  <span className="text-muted ms-2">
                    {process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ?
                      `${process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY.substring(0, 10)}...` :
                      '❌ Não configurada'
                    }
                  </span>
                </li>
              </ul>

              <div className="mt-4">
                <h5>Status:</h5>
                <div className="alert alert-info">
                  {process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ?
                    '✅ VAPID Key configurada corretamente!' :
                    '❌ VAPID Key não encontrada. Configure no Vercel.'
                  }
                </div>
              </div>

              <div className="mt-3">
                <small className="text-muted">
                  <strong>Nota:</strong> Esta página mostra apenas o início das chaves por segurança.
                  <br />
                  Acesse: <code>https://seu-dominio.vercel.app/test-env</code>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
