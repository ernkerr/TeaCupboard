// TODO : add effect for human winning 
// TODO : add effect for computer winning 

// design 
let xDisplay = document.querySelector('#x-display')
let oDisplay = document.querySelector('#o-display')

let boxes = document.querySelectorAll('.box') // selects all elements that have the class .box
let winMessage = document.querySelector('#winner-message')
let resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', resetGame)

// start with player 1
let currentPlayer = 'X'



// let playersTurn = document.querySelector('#players-turn')



// TODO: set it up for computer to play 
// computerTurn(){

// }


// create a board state to track moves
let boardState = ['', '', '', '', '', '', '', '', '']


boxes.forEach((box, index) => {
    box.addEventListener('click', function() {
        if (box.innerText === '') {  // check if box is empty 
            boardState[index] = currentPlayer // update board state
           box.innerText = currentPlayer // set the symbol (X or O)
           checkWinner(); // check for a winner
           checkTie(); // check for a tie
           box.disabled = true // disable the box
           
        if (currentPlayer === 'X') {
            box.classList.remove('o-turn');
            box.classList.add('x-turn');
        } else {
            box.classList.remove('x-turn');
            box.classList.add('o-turn');
        }

           currentPlayer = currentPlayer === 'X' ? 'O' : 'X' // switch the player's turn dynamically
           updateTurnDisplay(); // update the UI

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


//design 
function updateTurnDisplay() {
    if (currentPlayer === 'X') {
        oDisplay.classList.add('dim');
        xDisplay.classList.remove('dim');
        xDisplay.classList.add('x-glow');
        oDisplay.classList.remove('o-glow');
    } else {
        xDisplay.classList.add('dim');
        oDisplay.classList.remove('dim');
        oDisplay.classList.add('o-glow');
        xDisplay.classList.remove('x-glow');
    }
}

// call this function at the start to apply initial styles
updateTurnDisplay();