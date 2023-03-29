'use strict'


/*********************/
/*Create*/
/*********************/
function buildBoard(rows, cols, mines) {

    const mat = []

    for (var i = 0; i < rows; i++) {

        const row = []

        for (var j = 0; j < cols; j++) {

            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }

            row.push(cell)

        }

        mat.push(row)
    }

    for (var i = 0; i < mines; i++) {

        var randIndexI = getRandomInt(0, mat.length)
        var randIndexJ = getRandomInt(0, mat[i].length)

        mat[randIndexI][randIndexJ].isMine = true

    }

    var count = 0

    for (var i = 0; i < mat.length; i++) {

        for (var j = 0; j < mat[i].length; j++) {

            const currCell = mat[i][j]

            count = setMinesNegsCount(mat, i, j)

            currCell.minesAroundCount = count
        }

    }

    return mat
}

/*********************/
/*Find*/
/*********************/

function setMinesNegsCount(board, row, col) {

    var amount = 0

    for (var i = row - 1; i <= row + 1; i++) {

        if (i < 0 || i > board.length - 1) continue

        for (var j = col - 1; j <= col + 1; j++) {

            if (j < 0 || j > board[i].length - 1 || (i === row && j === col)) continue

            if (board[i][j].isMine) amount++

        }
    }

    if (!amount) amount = ''

    return amount

}

/*******************************/
/*Random*/
/*******************************/

function getRandomInt(min, max) {

    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)

}

function getRandomIntInclusive(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive

}

function getRandomColor() {

    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color

}

/*******************************/
/*Render*/
/*******************************/

function renderBoard(mat, selector) {

    var strHTML = '<table class="board"><tbody>'

    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'

        for (var j = 0; j < mat[0].length; j++) {

            const className = `cell cell-${i}-${j}`

            strHTML += `<td onclick="onCellClicked(this,${i},${j})" 
                        oncontextmenu="onCellMarked(this, event, ${i},${j})" 
                        class="${className}"> </td>`
        }

        strHTML += '</tr>'
    }

    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML

}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, cellContent) {

    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = cellContent

}