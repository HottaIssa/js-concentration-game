const btnIniciar = document.getElementById('btn-iniciar')

// Event click for go to the game
btnIniciar.addEventListener('click', () => cambiarPagina())

let cambiarPagina = () => {
  location.href = '../game.html'
}
