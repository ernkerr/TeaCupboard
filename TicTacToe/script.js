// selects all elements that have the class .box
let boxes = document.querySelectorAll('.box')

// start with player 1
let currentPlayer = 'X'

// create a board state to track moves
let boardState = ['', '', '', '', '', '', '', '', '']

function checkWinner(){
    // check all winning combinations
    const winningCombinations = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    for (let combo of winningCombinations){
        const [zero, one, two] = combo;
        if (boardState[zero] !== '' && 
            boardState [zero] === boardState[one] &&
            boardState[one] === boardState[two])
            document.getElementById('winner-message').innerText=`${currentPlayer} wins!`
    }
}

function checkTie(){
    if (!boardState.includes('')){
        document.getElementById('winner-message').innerText=`Tie game!`
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', function() {
        // check if box is empty 
        if (box.innerText === '') {
            boardState[index] = currentPlayer // update board state
            console.log(boardState[0])
           box.innerText = currentPlayer // set the symbol (X or O)
           checkWinner(); // check for a winner
           checkTie(); // check for a tie
           box.disabled = true // disable the box
           currentPlayer = currentPlayer === 'X' ? 'O' : 'X' // switch the player's turn dynamically
        }
    })
})