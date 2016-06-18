/**
 * Created by Yuval on 6/18/2016.
 */

var rows = 6;
var columns = 7;
var valArr = create2DArray(rows, columns);
var currPlayerIndex = 0;

function Player(name, color) {
    this.name = name;
    this.color = color;
};

var players = [new Player('Player One', 'red'), new Player('Player Two', 'black')];


function create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
        for (var j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }

    return arr;
};

var drawTable = function drawTable(n, m) {
    var t = $(".board");
    for (var i = 0; i < n; i++) {
        var row = $("<tr></tr>");
        $(t).append(row);
        for (var j = 0; j < m; j++) {
            var cell = $("<td class='cell'>$</td>");
            $(cell).attr('id', i + ',' + j);
            $(cell).data('val', valArr[i][j]);
            // console.log($(cell).attr('id'), ' : ', valArr[i][j]);
            $(row).append(cell);
        }
    }
};

var advanceTurn = function () {
    currPlayerIndex++;
    currPlayerIndex = currPlayerIndex % 2;
    $(".player").html(players[currPlayerIndex].name);
};

var findBottomFreeCell = function (row) {
    var cell = 0;
    for (var j = 0; j < rows; j++) {
        if (valArr[j][row] > 0) {
            cell = j - 1;
            break;
        }
        if (j === rows - 1) {
            cell = j;
            break;
        }
    }
    return cell;
};

var getBottomCellId = function (cell) {
    var ID = $(cell).attr('id');
    var coords = ID.split(',');
    coords[1] = parseInt(coords[1]);
    coords[0] = findBottomFreeCell(coords[1]);
    var idStr = coords[0] + ',' + coords[1];
    return idStr;
};

var checkRow = function () {
    var isRow = false;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns - 3; j++) {
            if (valArr[i][j] !== 0) {
                if (valArr[i][j] === valArr[i][j + 1]
                    && valArr[i][j + 1] === valArr[i][j + 2]
                    && valArr[i][j + 2] === valArr[i][j + 3]) {
                    isRow = true;
                    console.log('Row: ', valArr[i][j], valArr[i][j + 1], valArr[i][j + 2], valArr[i][j + 3]);
                }
            }
        }
    }
    return isRow;
};

var checkColumn = function () {
    var isColumn = false;
    for (var i = 0; i < rows - 3; i++) {
        for (var j = 0; j < columns; j++) {
            if (valArr[i][j] !== 0) {
                if (valArr[i][j] === valArr[i + 1][j]
                    && valArr[i + 1][j] === valArr[i + 2][j]
                    && valArr[i + 2][j] === valArr[i + 3][j]) {
                    isColumn = true;
                    console.log('Columns: ', valArr[i][j], valArr[i + 1][j], valArr[i + 2][j], valArr[i + 3][j]);
                }
            }
        }
    }
    return isColumn;
};

var checkDiagonal = function () {
    var isDiag = false;
    for (var i = 0; i < rows - 3; i++) {
        for (var j = 0; j < columns - 3; j++) {
            if (valArr[i][j] !== 0) {
                if (valArr[i][j] === valArr[i + 1][j + 1]
                    && valArr[i + 1][j + 1] === valArr[i + 2][j + 2]
                    && valArr[i + 2][j + 2] === valArr[i + 3][j + 3]) {
                    isDiag = true;
                    console.log('Diag: ', valArr[i][j], valArr[i + 1][j + 1], valArr[i + 2][j + 2], valArr[i + 3][j + 3]);
                }
            }
        }
    }
    return isDiag;
};

var checkBoard = function (coords) {
    return checkRow() || checkColumn() || checkDiagonal();
};

var announceWin = function () {
    $('.cell').prop('disabled', true);
    $('.announcement').html(players[currPlayerIndex].name + ' Wins!');

};

var clickCell = function () {
    // console.log('current player: ', currPlayerIndex, ' ', players[currPlayerIndex].name);
    var cellId = getBottomCellId(this);
    var cell = document.getElementById(cellId);
    var coords = cellId.split(',');
    if (coords[0] >= 0) {
        $(cell).css('backgroundColor', players[currPlayerIndex].color);
        valArr[coords[0]][coords[1]] = currPlayerIndex + 1;
        // console.log('"' + cellId + '"', valArr[coords[0]][coords[1]]);
        if (checkBoard(coords)) {
            announceWin();
        }
        else {
            advanceTurn();
        }
    }
};

var resetPage = function () {
    location.reload();
};

var init = function () {
    $(".player").html(players[currPlayerIndex].name);
    drawTable(rows, columns);

    $('.board').on('click', 'td', clickCell);
    $('#btn-reset').on('click', resetPage);
};


init();