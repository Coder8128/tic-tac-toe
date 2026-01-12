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

//boardCreate();

function startGame() {
    let board = boardCreate();
    console.log(board.getBoard());

    const getBoard = () => console.log(board.getBoard());

    const playRound = (row, col) => {
        board.handleMove(row, col);
    }


    return { playRound, getBoard }
}

