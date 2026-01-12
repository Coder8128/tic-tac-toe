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

    const handleMove = (row, col) => {
        gameBoard[row][col] = 1;
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


    const getBoard = () => console.log(board.getBoard());

    const playRound = (row, col) => {
        console.log(`${activePlayer.name} marks ${row, col}`);

        board.handleMove(row, col);

    }


    return { playRound, getBoard }
}

