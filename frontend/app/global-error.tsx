'use client'

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Algo deu errado.</h1>
          <p style={{ marginTop: '1rem', color: '#9ca3af', maxWidth: 480 }}>
            Ocorreu um erro inesperado. Tente novamente em instantes.
          </p>
          <button
            onClick={() => reset()}
            style={{ marginTop: '2rem', padding: '0.75rem 1.75rem', border: '1px solid #caa75d', background: 'transparent', color: '#caa75d', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.75rem' }}
          >
            Tentar novamente
          </button>
        </main>
      </body>
    </html>
  )
}
