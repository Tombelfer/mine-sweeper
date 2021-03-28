'use strict'
var MINE = '💥'
var FLAG = '🚩'
var EMPTY =''
var gBoard
var gCurrLevelIdx
var gMines

var gLevels = [{
    SIZE: 4,
    MINES: 2
}, {
    SIZE: 8,
    MINES: 12
}, {
    SIZE: 12,
    MINES: 30
}]
// console.log(gLevels)
function init(level) {
    gCurrLevelIdx = level

    gBoard = buildBoard()
    // console.table(gBoard)
    
    // console.table(gBoard)
    getRandMines()

    renderBoard()
    
}
function renderBoard() {
    var strHtml = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < gBoard.length; j++) {
            gBoard[i][j];
            var className = `cell cell${i}-${j}`
            strHtml += `<td class= "${className}" onmousedown="cellClicked(this,${i},${j}, event)"></td>`;
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function cellClicked(elCell, i, j,event){
    elCell.isShown=true
    var cellClicked= gBoard[i][j]
    
    if (cellClicked.isMine) {// if the cell is mined
        elCell.innerText=MINE
    }
    if (!cellClicked.isMine&& !cellClicked.isShown){//if the cell isn't mined
        setMinesNugsCount(i,j)
        elCell.innerText=cellClicked.minesAroundCount
        elCell.style.backgroundColor = 'lightblue'
        if (!cellClicked.minesAroundCount) {//if the cell has not mines around
            
                elCell.style.backgroundColor = 'lightblue'
                elCell.innerText=''
            
            
        }
        console.table(gBoard)
        
    } 
    if (!cellClicked.isShown) {
        cellClicked.isShown=true
        
    }
        
    
}

function getRandMines() {//find cell to place mines
    for (var i = 0; i < gLevels[gCurrLevelIdx].MINES; i++) {
        var row = (getRandomInt(0, gBoard.length))
        var coll = (getRandomInt(0, gBoard[0].length))

        
        gBoard[row][coll].isMine =true
    }
    console.table(gBoard)

}

function buildBoard(num) {// build gBoard with object to each cell
    var board = []
    for (var i = 0; i < gLevels[gCurrLevelIdx].SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevels[gCurrLevelIdx].SIZE; j++) {

            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false

            }

        }
    } return board
}

function setMinesNugsCount(cellI, cellJ) {// check if there is mine near the cell, and add to minesAroundCount the sum of mines around him
    var minesAroundCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (gBoard[i][j].isMine) gBoard[cellI][cellJ].minesAroundCount++;
        }
    }
    
    return minesAroundCount;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}