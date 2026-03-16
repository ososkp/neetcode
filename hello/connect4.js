// ═══════════════════════════════════════════════════════════════════════════
// REQUIREMENTS
//
// Example (Tic Tac Toe):
//   1. Two players alternate placing X and O on a 3x3 grid.
//   2. A player wins by completing a row, column, or diagonal.
//   Out of Scope: UI, AI opponent, networking
// ═══════════════════════════════════════════════════════════════════════════

// 1. Two players alternate placing their disc in a column by denoting the column number 0 - 6
// 2. Play goes until a player has 4 consecutive discs in the 2D array(that player wins), or there are no more moves and neither play has 4 consecutive(tie)
// 3. No UI element and no inter - game state - just back - end state management.
// 4. Error states: reject move and make player try again if they insert into a full column or attempt to go twice in a row.Don't allow any input once the game ends.


// ═══════════════════════════════════════════════════════════════════════════
// ENTITIES & RELATIONSHIPS
//
// Example (Tic Tac Toe):
//   Game, Board, Player
// ═══════════════════════════════════════════════════════════════════════════

// 1. Board - encapsulates the logic to see if, after a disc is added to the board, we now have four in a row.Also keeps track of whether the board is full.
// 2. Game - has one board.Keeps track of whose turn it is, accepts user input, and handles the interface between the board and the input.If board says a player wins, changes to a win state - prints the winner's name and stops taking input. If the board says tie, communicates that and stops taking input.
// 3. Disc - just a simple enum to keep track of whether the given slot is empty, or if not then whose piece is in it.
// 4. Player - instead of overloading the game, this can help us keep track of turn and color(and anythinf else that comes up).


// ═══════════════════════════════════════════════════════════════════════════
// CLASS DESIGN
//
// Example (Tic Tac Toe):
//   class Game:
//     - board: Board
//     - currentPlayer: Player
//     + makeMove(row, col) -> bool
// ═══════════════════════════════════════════════════════════════════════════

class Board {
    ROW_NUMBER = 6;
    COL_NUMBER = 7;
    boardGrid;
    openSlots;

    constructor() {
        this.boardGrid = Array.from({ length: COL_NUMBER }, () => new Array(ROW_NUMBER).fill(Disc.EMPTY))
        this.openSlots = ROW_NUMBER * COL_NUMBER
    }

    isValidMove(colNumber) { }

    takeTurn(colNumber) { }

    isFull() {
        return openSlots == 0;
    }

    isWinner(colIndex, rowIndex, color) { }
}

const Disc = {
    RED,
    YELLOW,
    EMPTY
}

class Player {
    name;
    color;

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

class Game {
    board
    players = new Array(2)
    turn

    constructor() {
        players.push(new Player('player1', Disc.RED))
        players.push(new Player('player2', Disc.YELLOW))
        turn = 1
    }

    takeTurn(colNumber) { }

    isWinner() { }

    isTie() { }
}


// ═══════════════════════════════════════════════════════════════════════════
// IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════
// Returns true if play continues, false if not
function takeTurn(column) {
    // Validate legal move
    this.board.checkIfValidMove(column)

    // Place disc
    const color = this.players[this.turn].color
    let row = this.board.placePiece(column, color)

    // Check for win/tie
    if (this.board.isWinner(column, row, color)) {
        console.log('Player ${this.players[this.turn].name} wins!')
        return false
    }

    if (this.board.isTie()) {
        console.log('No more available moves - Tie!')
        return false
    }

    // Update turn state
}

// New board function
function checkIfValidMove(column) {
    if (column < 0 || column >= COL_NUMBER) {
        throw new Error("This move is not allowed")
    }

    // First we ensure the column has available slots (i.e. it isn't full)
    if (this.boardGrid[column][0] !== Disc.EMPTY) {
        throw new Error("This move is not allowed")
    }
}

function placePiece(column, color) {
    let placementRow = -1
    for (let i = 0; i < ROW_NUMBER - 1; i++) {
        if (this.boardGrid[column][i + 1] !== Disc.EMPTY) {
            placementRow = i
            this.boardGrid[column][i] = color
            break
        }
    }

    // This means we reached the bottom of the board
    if (placementRow === -1) {
        this.boardGrid[column][ROW_NUMBER - 1] = color
        placementRow = ROW_NUMBER - 1
    }

    this.openSlots--

    return placementRow
}

function isWinner(colIndex, rowIndex, color) {
    let count = 1
    // Row
    // Go left
    count += dfs(colIndex, rowIndex, -1, 0, color)
    // Go right
    count += dfs(colIndex, rowIndex, 1, 0, color)

    if (count >= 4) {
        return true
    }

    count = 1
    // Column
    count += dfs(colIndex, rowIndex, 0, -1, color)
    count += dfs(colIndex, rowIndex, 0, 1, color)

    if (count >= 4) {
        return true
    }

    count = 1
    // Diagonal
    // Positive
    count += dfs(colIndex, rowIndex, 1, -1, color)
    count += dfs(colIndex, rowIndex, -1, 1, color)

    if (count >= 4) {
        return true
    }

    count = 1
    // Negative
    count += dfs(colIndex, rowIndex, 1, 1, color)
    count += dfs(colIndex, rowIndex, -1, -1, color)

    if (count >= 4) {
        return true
    }

    return false
}

function dfs(col, row, deltaCol, deltaRow, color) {
    if ((col >= 0 && col < COL_NUMBER) && (row >= 0 && row < ROW_NUMBER) && this.boardGrid[col][row] === color) {
        return 1 + dfs(col + deltaCol, row + deltaRow, deltaCol, deltaRow, color)
    }
    return 0;
}
