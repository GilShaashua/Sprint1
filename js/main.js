'use strict'


var gBoard

var gLevel = { SIZE: 4, MINES: 2 }

var gGame = {

    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isFirstClick: false
}




function onInit() {

    gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE)
    gGame.isOn = true
    gGame.isFirstClick = false
    console.log(gBoard)

    renderBoard(gBoard, '.container')

}

function onCellClicked(elCell, row, col) {

    if (!gGame.isFirstClick) {

        insertMinesAndNegsCount(row, col)

    }


    if (!gGame.isOn) return

    if (gBoard[row][col].isMarked) return

    if (gBoard[row][col].isMine) {

        gGame.isOn = false

        checkGameOver()

    } else if (gBoard[row][col].minesAroundCount) {

        elCell.innerText = gBoard[row][col].minesAroundCount
        gBoard[row][col].isShown = true
        gGame.shownCount++
        elCell.classList.add('cell-clicked')

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

            var cellContent = board[i][j].minesAroundCount

            board[i][j].isShown = true

            var elCell = document.querySelector(`.cell-${i}-${j}`)

            if (elCell.classList.contains('cell-clicked')) continue

            elCell.classList.add('cell-clicked')

            elCell.innerHTML = cellContent

            gGame.shownCount++

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

                gGame.shownCount++

                const elMineCell = document.querySelector(`.cell-${i}-${j}`)

                elMineCell.classList.add('cell-clicked')

                elMineCell.innerHTML = `<img src="mine.png" alt="mine">`

            }
        }
    }

    restartGame()

}

function restartGame() {



}

function onCellMarked(elCell, event, i, j) {

    event.preventDefault()

    if (!gGame.isOn) return

    if (gBoard[i][j].isShown) return


    if (gBoard[i][j].isMarked) {

        gBoard[i][j].isMarked = false
        gGame.markedCount--
        elCell.innerText = ''

    } else {

        gBoard[i][j].isMarked = true
        gGame.markedCount++
        elCell.innerHTML = `<img src="mark.png" alt="flag mark" style="height:28px;width:auto">`

    }

}

function insertMinesAndNegsCount(row, col) {

    gGame.isFirstClick = true

    for (var i = 0; i < gLevel.MINES; i++) {

        var randIndexI = getRandomInt(0, gBoard.length)
        var randIndexJ = getRandomInt(0, gBoard[i].length)

        gBoard[randIndexI][randIndexJ].isMine = true

    }


    if (gBoard[row][col].isMine) {

        // console.log('hi');

        for (var i = 0; i < gBoard.length; i++) {

            for (var j = 0; j < gBoard[i].length; j++) {

                var currCell = gBoard[i][j]

                currCell.isMine = false
            }

        }

        insertMinesAndNegsCount(row, col)

    }


    var count = 0

    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[i].length; j++) {

            const currCell = gBoard[i][j]

            count = setMinesNegsCount(gBoard, i, j)

            currCell.minesAroundCount = count
        }

    }

}