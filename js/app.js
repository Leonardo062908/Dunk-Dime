let listaUsuarios = [
  {
    nomeCompleto: "João das Couves",
    emailUsuario: "jo@com",
    senhaUsuario: "123",
  },
  {
    nomeCompleto: "Mário Willians",
    emailUsuario: "mo@com",
    senhaUsuario: "123",
  },
  { nomeCompleto: "Maria Linha", emailUsuario: "ma@com", senhaUsuario: "123" },
  { nomeCompleto: "Rei Luizinho", emailUsuario: "re@com", senhaUsuario: "123" },
  { nomeCompleto: "Duley Fred", emailUsuario: "du@com", senhaUsuario: "123" },
];

function validarLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const errorMessage = document.querySelector(".error-message");

  for (let x = 0; x < listaUsuarios.length; x++) {
    if (
      listaUsuarios[x].emailUsuario === emailInput.value &&
      listaUsuarios[x].senhaUsuario === senhaInput.value
    ) {
      localStorage.setItem("usuario-logado", JSON.stringify(listaUsuarios[x]));
      console.log("Usuário logado:", listaUsuarios[x]);
      window.location.href = "index.html";
      return false;
    }
  }

  errorMessage.classList.add("erro");
  errorMessage.textContent = "Usuário ou senha incorretos.";

  setTimeout(() => {
    errorMessage.classList.remove("erro");
    errorMessage.textContent = "";
  }, 5000);

  return false;
}

function App() {
  const usuario = JSON.parse(localStorage.getItem("usuario-logado"));

  if (usuario) {
    return (
      <div className="container-index">
        <header>
          <h1>Olá, {usuario.nomeCompleto}!</h1>
          <a href="login.html">Sair</a>
        </header>
        <main>
          <h2>Dunk & Dime</h2>
          <h3>O site mais hooper que você verá!</h3>
          <p>
            Nesta quadra você encontra as melhores jogadas de todos os tempos!
          </p>
          <img
            src="imagens/jamorantdunk.jpg"
            alt="Imagem do Ja Morant dunkando"
          />
        </main>
      </div>
    );
  } else {
    return (
      <div className="container-login">
        <h1>Bem-vindo ao Dunk & Dime</h1>
        <form id="login-form" onsubmit="return validarLogin(event)">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Entrar</button>
          </div>
          <p className="error-message"></p>
        </form>
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
