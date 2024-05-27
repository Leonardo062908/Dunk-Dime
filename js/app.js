function FormLogin({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (validarLogin(email, senha)) {
      onLogin(email, senha);
      exibirMensagemSucesso();
      window.location.href = "index.html";
    } else {
      setErrorMessage("Email ou senha inválidos.");
      exibirMensagemErro("Email ou senha inválidos.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
      <p className="error-message">{errorMessage}</p>
    </form>
  );
}

function PaginaDeLogin({ onLogin }) {
  return (
    <div className="container-login">
      <h1>Bem-vindo ao Dunk & Dime</h1>
      <FormLogin onLogin={onLogin} />
    </div>
  );
}

function PaginaInicial({ usuario, onLogout }) {
  function handleLogout() {
    sessionStorage.removeItem("usuario");
    onLogout();
    window.location.href = "login.html";
  }

  return (
    <div className="container-index">
      <header>
        <h1>Olá, {usuario.nome}!</h1>
        <button onClick={handleLogout}>Sair</button>
      </header>
      <main>
        <h2>Dunk & Dime</h2>
        <h3>O site mais hooper que você verá!</h3>
        <p>
          Nesta quadra você encontra as melhores jogadas de todos os tempos!
        </p>
        <img
          src="./imagens/jamorantdunk.jpg"
          alt="Imagem do Ja Morant dunkando"
        />
      </main>
    </div>
  );
}

function validarLogin(email, senha) {
  // Lógica de validação de login
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
    { nome: "João", email: "joao@example.com", senha: "123456" },
    { nome: "Leonardo", email: "leonardo@gmail.com", senha: "abcdef" },
  ];

  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

  if (usuario) {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    return true;
  } else {
    return false;
  }
}

function exibirMensagemSucesso() {
  const mensagemSucesso = document.createElement("div");
  mensagemSucesso.classList.add("success-message");
  mensagemSucesso.textContent = "Login realizado com sucesso!";
  document.body.appendChild(mensagemSucesso);

  setTimeout(() => {
    mensagemSucesso.remove();
  }, 5000);
}

function exibirMensagemErro(mensagem) {
  const mensagemErro = document.createElement("div");
  mensagemErro.classList.add("error-message");
  mensagemErro.textContent = mensagem;
  document.body.appendChild(mensagemErro);

  setTimeout(() => {
    mensagemErro.remove();
  }, 5000);
}

function App() {
  const [usuario, setUsuario] = React.useState(null);

  // Verificar se há usuário armazenado no sessionStorage
  React.useEffect(() => {
    const usuarioSessao = JSON.parse(sessionStorage.getItem("usuario"));
    if (usuarioSessao) {
      setUsuario(usuarioSessao);
    } else {
      // Verificar se há usuários armazenados no localStorage
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
        { nome: "João", email: "joao@example.com", senha: "123456" },
        { nome: "Maria", email: "maria@example.com", senha: "abcdef" },
      ];

      // Armazenar os usuários no localStorage
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  }, []);

  function autenticarUsuario(email, senha) {
    if (validarLogin(email, senha)) {
      const usuario = usuarios.find((u) => u.email === email);
      setUsuario(usuario);
      exibirMensagemSucesso();
      window.location.href = "index.html";
    } else {
      exibirMensagemErro("Email ou senha inválidos.");
    }
  }

  function deslogarUsuario() {
    sessionStorage.removeItem("usuario");
    setUsuario(null);
    window.location.href = "login.html";
  }

  return usuario ? (
    <PaginaInicial usuario={usuario} onLogout={deslogarUsuario} />
  ) : (
    <PaginaDeLogin onLogin={autenticarUsuario} />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
