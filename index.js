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
    let winner;
    console.log(board.getBoard());

    //Create the two players
    const players = [
        {
            name: "Player One",
            token: 1
        },
        {
            name: "Player Two",
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

        if (rowLine[row][0] == rowLine[row][1] && rowLine[row][0] == rowLine[row][2]) {
            return {
                name: activePlayer.name,
                line: "row",
                inf: row
            }
        } else if (rowLine[0][col] == rowLine[1][col] && rowLine[0][col] == rowLine[2][col]) {
            return {
                name: activePlayer.name,
                line: "col",
                inf: col
            }
        } else if (rowLine[0][0] == rowLine[1][1] && rowLine[0][0] == rowLine[2][2]) {
            return {
                name: activePlayer.name,
                line: "left",
                inf: null
            }
        } else if (rowLine[0][2] == rowLine[1][1] && rowLine[0][2] == rowLine[2][0]) {
            return {
                name: activePlayer.name,
                line: "right",
                inf: null
            }
        }
    }
    let counter = 0;

    const playRound = (row, col) => {
        if (winner || row > 2 || col > 2) {
            return;
        }

        if (!board.getBoard()[row][col]) {
            console.log(`${activePlayer.name} marks ${row} ${col}`);

            counter++;

            board.handleMove(row, col, activePlayer.token);

            if (counter > 4 && checkWin(row, col)) {
                winner = checkWin(row, col);
                //The winner is decared here
                console.log("The winner is: " + winner.name);
                board = boardCreate();
                return winner;
            }

            swtich();
            console.log(`Player ${activePlayer.name}'s turn:`);
        } else {
            console.log("Error! Already taken!");
            console.log(`Player ${activePlayer.name}'s turn:`);
        }

    }

    let getWinner = () => winner;

    let getPlayer = () => activePlayer.token;

    return { playRound, getBoard, getPlayer, getWinner }
}

function startBtn() {

    let game = startGame();
    if (game.getWinner == undefined) {
        console.log("wahh");
        return;
    }

    let counter = 0;

    let cellList = document.querySelectorAll(".cell");
    cellList.forEach(x => x.style.borderColor = "white");

    cellList.forEach(x => x.addEventListener("click", clicked));

    const btn = document.querySelector("button");
    btn.disabled = true;

    const resetGame = () => {
        cellList.forEach(x => x.style.borderColor = "gray");
        cellList.forEach(x => x.innerText = "");
        cellList.forEach(x => x.removeEventListener("click", clicked));
        btn.innerText = "Start a Game";
        btn.onclick = startBtn;
        return;
    }

    function clicked(event) {

        let token = game.getPlayer();

        let id = event.target.id;
        event.target.removeEventListener("click", clicked);

        if (token == 1) {
            event.target.innerText = "X";
        } else {
            event.target.innerText = "O";
        }



        game.playRound(id.slice(0, 1), id.slice(1));
        counter++;

        if (game.getWinner() || counter > 8) {
            btn.disabled = false;
            btn.innerText = "Reset Game";
            cellList.forEach(x => x.style.borderColor = "gray");

            btn.onclick = resetGame;
            cellList.forEach(x => x.removeEventListener("click", clicked));

            let obj = game.getWinner();
            if (obj.line == "row") {
                let rowGlow = document.querySelectorAll(`div[id^="${obj.inf}"]`);
                rowGlow.forEach(x => x.style.borderColor = "white");
            } else if (obj.line == "col") {
                let colGlow = document.querySelectorAll(`div[id$="${obj.inf}"]`);
                colGlow.forEach(x => x.style.borderColor = "white");
            } else if (obj.line == `left`) {
                let colGlow = document.querySelectorAll(`div[id$="00"],div[id$="11"],div[id$="22"] `);
                colGlow.forEach(x => x.style.borderColor = "white");
            } else {
                let colGlow = document.querySelectorAll(`div[id$="02"],div[id$="11"],div[id$="20"] `);
                colGlow.forEach(x => x.style.borderColor = "white");
            }


        }

    }

}




