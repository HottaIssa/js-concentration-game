// Initialize the variables
const container = document.querySelector('.container-card')
const nextNumber = document.getElementById('next-number')
const stopwatchDisplay = document.getElementById('timer')
const containerInicial = document.getElementById('container-inicial')
const btnCancelar = document.getElementById('btn-cancelar')
const floatingWindow = document.getElementById('floating-window');
const closeWindowBtn = document.getElementById('close-window-btn');

let counter = 0

let startTime = 0
let endTime = 0
let running = false
let intervalId = 0

// Return to the principal page
btnCancelar.addEventListener('click', () => {
  window.location.href = 'index.html'
})

// Generate the divs
let initGame = () => {
  let value = sortValue()
  for (let i = 0; i < 100; i++) {
    if (value[i] < 10) {
      value[i] = '0' + value[i]
    }
    container.innerHTML += `<div class='card'>${value[i]}</div>`
  }
  nextNumber.innerHTML += `EL SIGUIENTE NÚMERO ES: ${counter}`
  stopwatchDisplay.innerHTML += `Timer: 00:00`
  startStopwatch()
}

initGame()

// Generate the random numbers
function sortValue() {
  let numbers = []
  for (let i = 0; i < 100; i++) {
    numbers.push(i)
  }
  numbers.sort(() => Math.random() - 0.5)
  return numbers
}

// Find out the value selected
let findOutValue = (elementClicked) => {
  let valueElement = parseInt(elementClicked.textContent)
  if (valueElement < counter) {
  } else if (valueElement === counter) {
    correctOption(elementClicked)
    if (counter === 99) {
      setTimeout(() => {
        stopStopwatch()
        finishGame()
      }, 800)
      return
    }
    nextNum()
  } else {
    wrongOption(elementClicked)
  }
}

// Give the next number
let nextNum = () => {
  counter++
  nextNumber.innerHTML = `EL SIGUIENTE NÚMERO ES: ${counter}`
}

// Event click for find out value
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('card')) {
    findOutValue(event.target)
  }
})

// Tick the correct option
let correctOption = (elementClicked) => {
  elementClicked.style.backgroundColor = 'green'
  setTimeout(() => {
    elementClicked.style.backgroundColor = 'gray'
  }, 500)
}

// Match the wrong option
let wrongOption = (elementClicked) => {
  elementClicked.style.backgroundColor = 'red'
  setTimeout(() => {
    elementClicked.style.backgroundColor = 'white'
  }, 500)
}

// Finish Game
let finishGame = () => {
  floatingWindow.innerHTML += `<h2>Terminaste el juego</h2><br><p>Demoraste un total de ${stopwatchDisplay.textContent}</p>`
  floatingWindow.style.display = 'block';
}

// Close the floating window
closeWindowBtn.addEventListener('click', () => {
  floatingWindow.style.display = 'none';
  location.href = 'index.html'
});

//TIMER
// Start stopwatch
function startStopwatch() {
  if (!running) {
    startTime = new Date().getTime()
    running = true
    intervalId = setInterval(updateStopwatch, 1000)
  }
}

// Update stopwatch
function updateStopwatch() {
  const currentTime = new Date().getTime()
  const elapsedTime = currentTime - startTime
  const minutes = Math.floor(elapsedTime / 60000)
  const seconds = Math.floor((elapsedTime % 60000) / 1000)

  stopwatchDisplay.textContent = `Timer: ${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// Stop watch
function stopStopwatch() {
  if (running) {
    endTime = new Date().getTime()
    running = false
    clearInterval(intervalId)
  }
}
