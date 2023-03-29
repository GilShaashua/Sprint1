'use strict'


/*********************/
/*Create*/
/*********************/
function buildBoard(rows, cols) {

    const mat = []

    for (var i = 0; i < rows; i++) {

        const row = []

        for (var j = 0; j < cols; j++) {

            const cell = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true
            }

            if (i === 1 && j === 1 || i === 3 && j === 2) cell.isMine = true

            row.push(cell)
        }

        mat.push(row)
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

// function getAmountOfCellsContaining(BOARD, ITEM) {
//     var amount = 0
//     for (var i = 0; i < BOARD.length; i++) {
//         for (var j = 0; j < BOARD[i].length; j++) {
//             if (BOARD[i][j] === ITEM) amount++
//         }
//     }
//     if (!amount) amount = ''
//     return amount
// }

/*******************************/
/*Random*/
/*******************************/

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

// function getRandomOrderNumbersArray(MAX) {
//     const nums = getArrayWithAscNums(MAX)
//     var res = []
//     for (var i = 0; i < MAX; i++) {
//         res[i] = drawNum(nums)
//     }
//     return res
// }

// function getArrayWithAscNums(MAX) {
//     var numbers = []
//     for (var i = 0; i < MAX; i++) {
//         numbers[i] = i + 1
//     }
//     return numbers
// }

/*******************************/
/*Render*/
/*******************************/

function renderBoard(mat, selector) {

    var strHTML = '<table class="board"><tbody>'

    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'

        for (var j = 0; j < mat[0].length; j++) {

            // const mineImg = `<img src="mine.png" alt="mine">`

            // var cell
            // if (mat[i][j].isMine) cell = mineImg
            // else cell = mat[i][j].minesAroundCount

            const className = `cell cell-${i}-${j}`

            strHTML += `<td onclick="onCellClicked(this,${i},${j})" class="${className}"> </td>`
        }

        strHTML += '</tr>'
    }

    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML

}

// function renderBoardByObjProperty(mat, selector, property) {
//     var strHTML = '<table><tbody>'
//     for (var i = 0; i < mat.length; i++) {
//         strHTML += '<tr>'
//         for (var j = 0; j < mat[0].length; j++) {
//             const cell = mat[i][j][property]
//             const className = `cell cell-${i}-${j}`

//             strHTML += `<td class="${className}">${cell}</td>`
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'

//     const elContainer = document.querySelector(selector)
//     elContainer.innerHTML = strHTML
// }

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, cellContent) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = cellContent

}
/*******************************/
/*Misc*/
/*******************************/

// function drawNum(NUMS) {
//     return NUMS.splice(getRandomInt(0, NUMS.length), 1)[0]
// }