ideas:

approach 1: "easy" choose a random box

1.  find all empty boxes: loop through the boardState and find the empty boxes

        let emptyIndexes = [];

        boardState.forEach((value, index) => {
            if (value === ''){
                emptyIndexes.push(index);
            }
        })

2.  generate a random index

        let randomIndex = Math.floor(Math.random() * emptyIndexes.length);
        return emptyIndexes[randomIndex];


approach 2: "medium" checks for winning move

1. Check if the computer can win first

            function findWinningMove(){
                for (let combo of winningCombinations) {
                    const [zero, one, two] = combo;

                // Check for a potential winning move for the computer ("O")

                    if (boardState[zero] === "O" && boardState[one] === "O" && boardState[two] === "") {
                        return two; // Computer can win here
                    }
                    if (boardState[zero] === "O" && boardState[two] === "O" && boardState[one] === "") {
                        return one; // Computer can win here
                    }
                    if (boardState[one] === "O" && boardState[two] === "O" && boardState[zero] === "") {
                        return zero; // Computer can win here
                    }

                    // Check for a potential blocking move for the player ("X")
                    if (boardState[zero] === "X" && boardState[one] === "X" && boardState[two] === "") {
                        return two; // Block player from winning here
                    }
                    if (boardState[zero] === "X" && boardState[two] === "X" && boardState[one] === "") {
                    return one; // Block player from winning here
                    }
                    if (boardState[one] === "X" && boardState[two] === "X" && boardState[zero] === "") {
                    return zero; // Block player from winning here
                    }
                }

        // If no winning or blocking move, make a random move (easy mode)
        return generateRandomMove();
        }

approach 3: "hard" minimax algorithm 