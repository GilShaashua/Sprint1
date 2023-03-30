'use strict'


var gBoard

var gLevel = { SIZE: 4, MINES: 2 }

var gGame = {

    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    livesCount: 3,
    isFirstClick: false
}

var gStopWatchInterval


function onInit() {

    gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE)

    gGame.isOn = true

    console.log(gBoard)

    renderBoard(gBoard, '.board')

}

function onCellClicked(elCell, row, col) {

    if (!gGame.isFirstClick) {

        insertMinesAndNegsCount(row, col)

    }


    if (!gGame.isOn) return

    if (gBoard[row][col].isMarked) return


    if (gBoard[row][col].isMine) {

        if (elCell.classList.contains('cell-clicked')) return

        if (gGame.livesCount > 0) updateLivesCount()

        elCell.classList.add('cell-clicked')

        elCell.innerHTML = `<img src="img/mine.png" alt="mine">`

        if (!gGame.livesCount) {

            gameOver()
            showAllMines()

        }

    } else if (gBoard[row][col].minesAroundCount) {

        if (elCell.classList.contains('cell-clicked')) return

        elCell.innerText = gBoard[row][col].minesAroundCount
        gBoard[row][col].isShown = true
        gGame.shownCount++
        elCell.classList.add('cell-clicked')

    } else if (!gBoard[row][col].minesAroundCount) {

        if (elCell.classList.contains('cell-clicked')) return

        expandShown(gBoard, row, col)

    }

    if (gGame.shownCount === (gLevel.SIZE ** 2 - gLevel.MINES)) victory()

}

function expandShown(board, row, col) {

    for (var i = row - 1; i <= row + 1; i++) {

        if (i < 0 || i > board.length - 1) continue

        for (var j = col - 1; j <= col + 1; j++) {

            if (j < 0 || j > board[i].length - 1) continue

            if (board[i][j].isMine) continue

            var elCell = document.querySelector(`.cell-${i}-${j}`)

            if (elCell.classList.contains('cell-clicked')) continue

            if (!elCell.classList.contains('cell-clicked')) gGame.shownCount++
            else continue

            var cellContent = board[i][j].minesAroundCount

            board[i][j].isShown = true

            elCell.classList.add('cell-clicked')

            elCell.innerHTML = cellContent

        }
    }

}

function showAllMines() {

    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[i].length; j++) {

            var currCell = gBoard[i][j]

            if (currCell.isMine) {

                // gBoard[i][j].isShown = true

                const elMineCell = document.querySelector(`.cell-${i}-${j}`)

                elMineCell.classList.add('cell-clicked')

                elMineCell.innerHTML = `<img src="img/mine.png" alt="mine">`

            }
        }
    }

}

function updateLivesCount() {

    gGame.livesCount--
    const elLivesSpan = document.querySelector('.lives span')
    elLivesSpan.innerText = gGame.livesCount

}

function gameOver() {

    gGame.isOn = false
    stopWatch()

    const elSmiley = document.querySelector('.smiley')
    elSmiley.innerHTML = `<img src="img/unhappy.png" alt="mine">`

}

function victory() {

    gGame.isOn = false

    const elSmiley = document.querySelector('.smiley')
    elSmiley.innerHTML = `<img src="img/in-love.png" alt="mine">`

    showAllMines()
    stopWatch()

}

function onRestartGame() {

    gGame.livesCount = 3
    gGame.isFirstClick = false
    gGame.shownCount = 0
    gGame.markedCount = 0

    stopWatch()
    restartWatch()
    onInit()
    const elLivesSpan = document.querySelector('.lives span')
    elLivesSpan.innerText = 3
    const elSimley = document.querySelector('.smiley')
    elSimley.innerHTML = `<img src="img/happy.png" alt="mine">`

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
        elCell.innerHTML = `<img src="img/mark.png" alt="flag mark" style="height:28px;width:auto">`

    }

}

function insertMinesAndNegsCount(row, col) {

    gGame.isFirstClick = true

    var emptyCells = getEmptyCells()

    for (var i = 0; i < gLevel.MINES; i++) {

        var randIdx = getRandomInt(0, emptyCells.length)

        var randCell = emptyCells.splice(randIdx, 1)[0]

        console.log(randCell);

        randCell.isMine = true

    }

    // no mine at first click
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

function getEmptyCells() {

    var emptyMinesCells = []

    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[i].length; j++) {

            var currCell = gBoard[i][j]

            if (!currCell.isMine) emptyMinesCells.push(currCell)

        }

    }

    return emptyMinesCells

}

function onChangeLevel(size, mines) {

    gLevel.SIZE = size
    gLevel.MINES = mines

    onRestartGame()

}


function onStartWatch() {

    if (gStopWatchInterval) return

    gStopWatchInterval = setInterval(watch, 1000)

}

function stopWatch() {

    clearInterval(gStopWatchInterval)

}

function restartWatch() {

    gStopWatchInterval = null
    gGame.secsPassed = 0
    const elStopWatch = document.querySelector('.stop-watch h3')
    elStopWatch.innerText = 0

}


function watch() {

    gGame.secsPassed++

    const elStopWatch = document.querySelector('.stop-watch h3')
    elStopWatch.innerText = gGame.secsPassed

}