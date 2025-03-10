
let boxes = document.querySelectorAll('.box') // selects all elements that have the class .box
let winMessage = document.querySelector('#winner-message')
let resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', resetGame)


// start with player 1
let currentPlayer = 'X'

let playersTurn = document.querySelector('#players-turn')
playersTurn.innerText = `X goes first`


// TODO: add who's turn it is, X or O


// TODO : add effect for human winning 
// TODO : add effect for computer winning 


// TODO: set it up for computer to play 
// computerTurn(){

// }


// create a board state to track moves
let boardState = ['', '', '', '', '', '', '', '', '']

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
           // update turn message 
           playersTurn.innerText = `${currentPlayer === 'X' ? 'Your' : 'Computer'}'s turn`; 
           if (currentPlayer === 'X'){
            box.classList.add('x-turn');
           } else {
            box.classList.add('o-turn')
           }

        // TODO: set computer to be Player 2
        //    if (currentPlayer === 'O'){
        //      setTimeout(computerTurn, 500) 
        //    } 
        }
    })
})

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
        // destructure the array 
        const [zero, one, two] = combo;
        // make sure the first box we are checking is not empty
        if (boardState[zero] !== '' && 
            // see if there are three in a row of any symbol 
            boardState [zero] === boardState[one] &&
            boardState[one] === boardState[two]) {
            winMessage.innerText=`${currentPlayer} wins!`;
            resetBtn.classList.remove('hide');
            // disable boxes to stop further moves
            boxes.forEach(box => box.disabled = true);
        }
    }
}

function checkTie(){
    // if board if full 
    if (!boardState.includes('')){
        winMessage.innerText=`Tie game!`
        resetBtn.classList.remove('hide');
    }
}

function resetGame(){
    resetBtn.classList.add('hide')
    winMessage.innerText = ''
    // reset the board state 
    boardState = ['', '', '', '', '', '', '', '', '']
    // reset board ui 
    boxes.forEach((box) => {
        // re-enable the buttons
        box.disabled = false;
        box.innerText= '';
    })
    // TODO: comment out if we want the computer to have a chance at going first
    currentPlayer = 'X';
}

