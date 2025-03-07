// selects all elements that have the class .box
let boxes = document.querySelectorAll('.box')

// start with player 1
let currentPlayer = 'X'

boxes.forEach((box) => {
    box.addEventListener('click', function() {
        // check if box is empty 
        if (box.innerText = '') {
           box.innerText = currentPlayer // set the symbol (X or O)
           checkWinner(); // check for a winner
           box.disabled = true // disable the box
           currentPlayer = 'O' // switch the player's turn
        }
    })
})
