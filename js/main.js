'use strict'


var gBoard

var gLevel = { SIZE: 4, MINES: 2 }

var gGame = {

    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0

}


function onInit() {

    gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE)
    console.log(gBoard)

    renderBoard(gBoard, '.container')

}

function onCellClicked(elCell, row, col) {

    if (gBoard[row][col].isMine) {

        for (var i = 0; i < gBoard.length; i++) {

            for (var j = 0; j < gBoard[i].length; j++) {

                var currCell = gBoard[i][j]

                if (currCell.isMine) {

                    const elMineCell = document.querySelector(`.cell-${i}-${j}`)

                    elMineCell.innerHTML = `<img src="mine.png" alt="mine">`

                }
            }
        }

    } else if (gBoard[row][col].minesAroundCount) elCell.innerText = gBoard[row][col].minesAroundCount

    else if (!gBoard[row][col].minesAroundCount) {

        for (var i = row - 1; i <= row + 1; i++) {

            if (i < 0 || i > gBoard.length - 1) continue

            for (var j = col - 1; j <= col + 1; j++) {

                if (j < 0 || j > gBoard[i].length - 1 || (i === row && j === col)) continue

                var cellLocation = { i, j }

                var cellContent = gBoard[i][j].minesAroundCount

                renderCell(cellLocation, cellContent)

            }
        }

    }
}



