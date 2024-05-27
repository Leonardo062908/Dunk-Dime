function PaginaInicial({ usuario, onLogout }) {
  return (
    <div>
      <header>
        <h1>Olá, {usuario.nome}!</h1>
        <button onClick={onLogout}>Sair</button>
      </header>
      <main>
        <p>Email: {usuario.email}</p>
        {/* Exibir outros dados do usuário */}
      </main>
    </div>
  );
}

function App() {
  const [usuario, setUsuario] = React.useState(null);

  function autenticarUsuario(email, senha) {
    // Lógica de autenticação do usuário
    const usuarioAutenticado = { nome: "João", email: "joao@example.com" };
    setUsuario(usuarioAutenticado);
  }

  function deslogarUsuario() {
    setUsuario(null);
  }

  return usuario ? (
    <PaginaInicial usuario={usuario} onLogout={deslogarUsuario} />
  ) : (
    <a href="login.html">Fazer Login</a>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
