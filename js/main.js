'use strict'


var gBoard

var gLevel = { SIZE: 4, MINES: 3 }

var gGame = {

    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0

}


function onInit() {

    gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE, gLevel.MINES)
    gGame.isOn = true
    console.log(gBoard)

    renderBoard(gBoard, '.container')

}

function onCellClicked(elCell, row, col) {

    if (gBoard[row][col].isMine) {

        checkGameOver()

    } else if (gBoard[row][col].minesAroundCount) {

        elCell.innerText = gBoard[row][col].minesAroundCount
        gBoard[row][col].isShown = true

    } else if (!gBoard[row][col].minesAroundCount) {

        expandShown(gBoard, row, col)

    }
}

function expandShown(board, row, col) {

    for (var i = row - 1; i <= row + 1; i++) {

        if (i < 0 || i > board.length - 1) continue

        for (var j = col - 1; j <= col + 1; j++) {

            if (j < 0 || j > board[i].length - 1) continue

            if (board[i][j].isMine) continue

            var cellLocation = { i, j }

            var cellContent = board[i][j].minesAroundCount

            board[i][j].isShown = true

            renderCell(cellLocation, cellContent)

        }
    }

}

// need to implement sad face to restart the game
function checkGameOver() {

    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[i].length; j++) {

            var currCell = gBoard[i][j]

            if (currCell.isMine) {

                gBoard[i][j].isShown = true

                const elMineCell = document.querySelector(`.cell-${i}-${j}`)

                elMineCell.innerHTML = `<img src="mine.png" alt="mine">`

            }
        }
    }

    restartGame()

}

function restartGame() {



}

function onCellMarked(elCell) {



}