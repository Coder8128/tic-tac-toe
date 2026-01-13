function boardCreate() {
    let gameBoard = [];
    let x = 0;

    for (let i = 0; i < 3; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < 3; j++) {
            gameBoard[i][j] = x;
        }
    }

    const getBoard = () => gameBoard;

    const handleMove = (row, col, player) => {
        gameBoard[row][col] = player;
        console.log(gameBoard);
    }


    return { getBoard, handleMove };
}


//Function to start the game which also controls the game
function startGame() {
    //Create an isntance of a boardCreate(), meaning new board creation
    let board = boardCreate();
    console.log(board.getBoard());

    //Create the two players
    const players = [
        {
            name: "One",
            token: 1
        },
        {
            name: "Two",
            token: 2
        }
    ];

    let activePlayer = players[0];

    const swtich = () => {
        activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0];
    };

    console.log(`Player ${activePlayer.name}'s turn`);

    const getBoard = () => console.log(board.getBoard());

    const checkWin = (row, col) => {
        let rowLine = board.getBoard();

        if (rowLine[row][0] == rowLine[row][1] || rowLine[row][0] == rowLine[row][2]) {
            return activePlayer;
        } else if (rowLine[0][col] == rowLine[1][col] || rowLine[0][col] == rowLine[2][col]) {
            return activePlayer;
        } else if (rowLine[0][0] == rowLine[1][1] || rowLine[0][0] == rowLine[2][2]) {
            return activePlayer;
        } else if (rowLine[0][2] == rowLine[1][1] || rowLine[0][2] == rowLine[2][0]) {
            return activePlayer;
        }
    }

    const playRound = (row, col) => {

        if (!board.getBoard()[row][col]) {
            console.log(`${activePlayer.name} marks ${row} ${col}`);

            board.handleMove(row, col, activePlayer.token);

            if (counter > 4 && checkWin()) {
                let winner = checkWin();
                //TBD winner is determined here
            }

            swtich();
            console.log(`Player ${activePlayer.name}'s turn:`);
        } else {
            console.log("Error! Already taken!");
            console.log(`Player ${activePlayer.name}'s turn:`);
        }

    }


    return { playRound, getBoard }
}

let a = startGame();


