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

1. OPTION A: Checks for ANY winning move 

            function findBestMove() {
            for (let combo of winningCombinations) {
                const [a, b, c] = combo;

                // Check if one of the spots is empty and the other two are the same (either "O" or "X")
                if (boardState[a] === "" && boardState[b] === boardState[c] && boardState[b] !== "") {
                return a; // Move here to win or block the player
                }
                if (boardState[b] === "" && boardState[a] === boardState[c] && boardState[a] !== "") {
                return b; // Move here to win or block the player
                }
                if (boardState[c] === "" && boardState[a] === boardState[b] && boardState[a] !== "") {
                return c; // Move here to win or block the player
                }
            }

            // If no winning or blocking move, make a random move (easy mode)
            return generateRandomMove();
            }

2. OPTION B: Check if the computer can win first, then tries to block player 1

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

approach 3: "hard" 
- API call to a LLM
- minimax algorithm 