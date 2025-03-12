// design
let xDisplay = document.querySelector("#x-display");
let oDisplay = document.querySelector("#o-display");
const container = document.querySelector(".fireworks");
const fireworks = new Fireworks.default(container);

// game play
let boxes = document.querySelectorAll(".box"); // selects all elements that have the class .box
let winMessage = document.querySelector("#winner-message");
let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", resetGame);

//
// CHANGES TO MENTION!
//

// let user select a difficulty level
let difficulty = "easy";
const difficultySelect = document.getElementById("difficulty");

// add event listener so user can change the computer difficulty
difficultySelect.addEventListener("change", function () {
  difficulty = this.value;
  console.log("Difficulty set to:", difficulty);
});

// make winningCombinations into a global variable
const winningCombinations = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6], // Diagonal 2
];

// start with player 1
let currentPlayer = "X";

// create a board state to track moves
let boardState = ["", "", "", "", "", "", "", "", ""];

boxes.forEach((box, index) => {
  box.addEventListener("click", function () {
    if (box.innerText === "") {
      // check if box is empty
      boardState[index] = currentPlayer; // update board state
      box.innerText = currentPlayer; // set the symbol (X or O)
      checkWinner(); // check for a winner
      checkTie(); // check for a tie
      box.disabled = true; // disable the box

      // set color for selected symbol
      if (currentPlayer === "X") {
        box.classList.remove("o-turn");
        box.classList.add("x-turn");
      } else {
        box.classList.remove("x-turn");
        box.classList.add("o-turn");
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X"; // switch the player's turn dynamically
      updateTurnDisplay(); // update the UI

      // TODO: set computer to be Player 2
      if (currentPlayer === "O" && !winMessage.innerText) {
        setTimeout(computerTurn, 500);
      }
    }
  });
});

//
// CHANGES TO MENTION!
//
// Thought it would be nice if we could return "move" from the functions we make
// then we could execute the computer's turn here instead of in each function

// TODO: set it up for computer to play
function computerTurn() {
  let move;

  if (difficulty === "easy") {
    move = generateRandomMove();
  } else if (difficulty === "medium") {
    move = findWinningMove();
  } else if (difficulty === "impossible") {
    move = findBestMove();
  }

  if (move !== null) {
    // for the design - specifically the O color
    boxes[move].classList.remove("x-turn");
    boxes[move].classList.add("o-turn");

    // execute the computer's turn
    boardState[move] = "O";
    boxes[move].innerText = "O";
    boxes[move].disabled = true;
    checkWinner();
    checkTie();
    currentPlayer = "X";
    updateTurnDisplay();
  }
}

function generateRandomMove() {
  let emptyIndexes = [];
  // loop through board state & add empty indexes to the array
  boardState.forEach((value, index) => {
    if (value === "") {
      emptyIndexes.push(index);
    }
  });

  // generate random index
  let randomIndex = Math.floor(Math.random() * emptyIndexes.length);

  return emptyIndexes[randomIndex];
}

function findWinningMove() {
  for (let combo of winningCombinations) {
    const [zero, one, two] = combo;

    // Check for a potential winning move for the computer ("O")

    if (
      boardState[zero] === "O" &&
      boardState[one] === "O" &&
      boardState[two] === ""
    ) {
      return two; // Computer can win here
    }
    if (
      boardState[zero] === "O" &&
      boardState[two] === "O" &&
      boardState[one] === ""
    ) {
      return one; // Computer can win here
    }
    if (
      boardState[one] === "O" &&
      boardState[two] === "O" &&
      boardState[zero] === ""
    ) {
      return zero; // Computer can win here
    }

    // Check for a potential blocking move for the player ("X")
    if (
      boardState[zero] === "X" &&
      boardState[one] === "X" &&
      boardState[two] === ""
    ) {
      return two; // Block player from winning here
    }
    if (
      boardState[zero] === "X" &&
      boardState[two] === "X" &&
      boardState[one] === ""
    ) {
      return one; // Block player from winning here
    }
    if (
      boardState[one] === "X" &&
      boardState[two] === "X" &&
      boardState[zero] === ""
    ) {
      return zero; // Block player from winning here
    }
  }

  // If no winning or blocking move, make a random move (easy mode)
  return generateRandomMove();
}

function findBestMove() {
  // Initialize best score to negative infinity
  let bestScore = -Infinity;
  // store the index of the best move found
  let bestMove = null;

  // Try each available move
  // loop through all 9 positions on the board
  for (let i = 0; i < boardState.length; i++) {
    // make sure the box is empty
    if (boardState[i] === "") {
      // Make the move
      boardState[i] = "O";
      // Calculate score for this move using minimax
      let score = minimax(boardState, 0, false);
      // Undo the move
      boardState[i] = "";

      // If this move results in a better score, update bestScore and bestMove
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

// Minimax algorithm implementation
function minimax(board, depth, isMaximizing) {
  // Check for terminal states (win, lose, tie)
  let result = checkGameState(board);
  if (result !== null) {
    return result;
  }

  if (isMaximizing) {
    // Computer's turn (O) - trying to maximize score
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    // Player's turn (X) - trying to minimize score
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Helper function to check game state for minimax
function checkGameState(board) {
  // Check for a winner
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      if (board[a] === "O") return 10; // Computer wins
      if (board[a] === "X") return -10; // Player wins
    }
  }

  // Check for a tie
  if (!board.includes("")) return 0; // Tie game

  // Game is still ongoing
  return null;
}

function checkWinner() {
  // check all winning combinations
  for (let combo of winningCombinations) {
    // destructure the array
    const [zero, one, two] = combo;
    // make sure the first box we are checking is not empty
    if (
      boardState[zero] !== "" &&
      // see if there are three in a row of any symbol
      boardState[zero] === boardState[one] &&
      boardState[one] === boardState[two]
    ) {
      fireworks.start();
      winMessage.innerText = `${currentPlayer} wins!`;
      resetBtn.classList.remove("hide");
      // disable boxes to stop further moves
      boxes.forEach((box) => (box.disabled = true));
    }
  }
}

function checkTie() {
  // if board if full
  if (!boardState.includes("")) {
    winMessage.innerText = `Tie game!`;
    resetBtn.classList.remove("hide");
  }
}

function resetGame() {
  resetBtn.classList.add("hide");
  winMessage.innerText = "";
  // reset the board state
  boardState = ["", "", "", "", "", "", "", "", ""];
  // reset board ui
  boxes.forEach((box) => {
    // re-enable the buttons
    box.disabled = false;
    box.innerText = "";
  });
  fireworks.stop();
  // TODO: comment out if we want the computer to have a chance at going first
  currentPlayer = "X";
}

//design
function updateTurnDisplay() {
  if (currentPlayer === "X") {
    oDisplay.classList.add("dim");
    xDisplay.classList.remove("dim");
    xDisplay.classList.add("x-glow");
    oDisplay.classList.remove("o-glow");
  } else {
    xDisplay.classList.add("dim");
    oDisplay.classList.remove("dim");
    oDisplay.classList.add("o-glow");
    xDisplay.classList.remove("x-glow");
  }
}

// call this function at the start to apply initial styles
updateTurnDisplay();
