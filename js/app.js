function Titulo() {
  return <h1 className="form__titulo">Login</h1>;
}

function Subtitulo() {
  return <h2 className="form__texto">Boas-vindas! Faça seu login.</h2>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Titulo />
    <Subtitulo />
  </>
);
