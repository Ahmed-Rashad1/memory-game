
  let duration = 500;
  let gameContainer = document.querySelector(".game-box");
  let peogressbar = document.querySelector(".liner-progress");
  let timeSpan = document.querySelector(".timer-container p span");
  let triescount = document.querySelector(".tries span") 

  gameContainer.classList.add("no-click")
  let win = false;

document.querySelector(".control-overlay span").onclick = function () {
  yourName = prompt("Whats your name?")
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown"
  } else {
    document.querySelector(".name span").innerHTML = yourName
    
  }
  document.querySelector(".control-overlay").remove()
}

document.querySelector(".start-button").addEventListener('click', () => {
  gameContainer.classList.remove("no-click")

  document.querySelector(".start-button").classList.add("clicked")
  let interval = 60;

  let countDown = setInterval(() => {
    interval--;

    let progressWidth = interval / 60 * 100;

    if (interval > 0) {
      peogressbar.style.width = progressWidth + "%";

      timeSpan.innerHTML = interval + "s"
        if (win === true) {

          clearInterval(countDown)
        }

    } else {
      clearInterval(countDown) 
      peogressbar.style.width = "0%"
      gameOver()
      document.getElementById("game-over").play()
    }
  }, duration + 250)
})


cards = Array.from(gameContainer.children)

let orderRange = [...Array(cards.length).keys()]

let randomOrderRange = Math.floor(Math.random() * orderRange.length)

cards.forEach(card => {
  let randomOrderRange = Math.floor(Math.random() * orderRange.length)
  card.style.order = randomOrderRange
  card.addEventListener("click",function () {
    flippCards(card)
    allmachedcards()
  })
})

function flippCards (selectedCard) {
  selectedCard.classList.add("is-flipped");
  
  let filppedCards = cards.filter(flippedcard => flippedcard.classList.contains("is-flipped"))
  
  
  if (filppedCards.length === 2) {
    stopClicking()
    machedCards(filppedCards[0], filppedCards[1])
  }

}
function allmachedcards() {
  let allmachedCards = cards.filter(machedcard => machedcard.classList.contains("mached"))
  if (allmachedCards.length === 18) {
      win = true
      youWin()
      document.getElementById("win").play()
  }
}

function stopClicking(){
  gameContainer.classList.add("no-click")
  
  setTimeout(() => {
    
    gameContainer.classList.remove("no-click")
    
  }, duration)
}

function machedCards(cardOne, cardTwo) {
  
  if (cardOne.dataset.person === cardTwo.dataset.person) {
    cardOne.classList.remove("is-flipped")
    cardTwo.classList.remove("is-flipped")
    
    cardOne.classList.add("mached")
    cardTwo.classList.add("mached")
    document.getElementById("success").play()
  } else {
    triescount.innerHTML = parseInt(triescount.innerHTML) + 1
    
    setTimeout(() => {
      cardOne.classList.remove("is-flipped")
      cardTwo.classList.remove("is-flipped")
      
    }, duration)
  }
}

function gameOver() {
  let overlay = document.createElement("div")
  let gameOver = document.createElement("p")
  gameOver.className = "game-over"
  gameOver.appendChild(document.createTextNode("Game Over"))
  let br = document.createElement("br")
  gameOver.appendChild(br)
  gameOver.appendChild(document.createTextNode(`Your tries is : ${triescount.innerHTML}`))
  overlay.className = "control-overlay"
  let btn = document.createElement("span")
  btn.classList = "again"
  btn.appendChild(document.createTextNode("Again")) 
  overlay.appendChild(gameOver)
  overlay.appendChild(btn)
  document.querySelector(".memory").appendChild(overlay)
  btn.onclick = function () {
    location.reload()
  }
}

function youWin() {
  let overlay = document.createElement("div")
  let gameOver = document.createElement("p")
  gameOver.className = "game-over"
  gameOver.appendChild(document.createTextNode("You Win"))
  gameOver.appendChild(document.createElement("br"))
  gameOver.appendChild(document.createTextNode("Congratulations"))
  gameOver.appendChild(document.createElement("br"))
  gameOver.appendChild(document.createTextNode(`Your tries is : ${triescount.innerHTML}`))
  overlay.className = "control-overlay"
  let btn = document.createElement("span")
  btn.classList = "again"
  btn.appendChild(document.createTextNode("Again")) 
  overlay.appendChild(gameOver)
  overlay.appendChild(btn)
  document.querySelector(".memory").appendChild(overlay)
  btn.onclick = function () {
    location.reload()
    
  }
}

