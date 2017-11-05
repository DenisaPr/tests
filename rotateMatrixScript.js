var matrix  = [];

/**
 * clear all tables and matrix to start with a clean slate
 */
function clearTables () {
    var originalMatrix = document.getElementById('originalMatrix');
    var rotatedMatrix  = document.getElementById('rotatedMatrix');

    originalMatrix.innerHTML = '';
    rotatedMatrix.innerHTML  = '';

    matrix  = [];
}

/**
 * Generates matrix and shows it in view, based on size
 * @param size
 */
function generateAndShowMatrix(size){
    clearTables();

    var count = 0;

    for(var i = 0; i < size; i++) {
        var rowMatrix = [];
        for(var j = 0; j < size; j++) {
            count++;
            rowMatrix.push(count);
        }
        matrix.push(rowMatrix);
    }

    showMatrix('originalMatrix', matrix);
}

/**
 * Shows matrix in the provided tableId and the provided matrix
 * @param tableId
 * @param matrixToShow
 */
function showMatrix (tableId, matrixToShow) {
    var originalMatrix = document.getElementById(tableId);
    var size           = matrixToShow.length;

    for(var i = 0; i < size; i++) {
        var row = document.createElement('tr');
        for(var j = 0; j < size; j++) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(matrixToShow[i][j]));
            row.appendChild(cell);
        }
        originalMatrix.appendChild(row);
    }
}

/**
 * Rotates matrix with 90' clockwise/anticlockwise based on user choice
 * @param clockwise
 */
function rotateMatrix (clockwise) {
    var rotatedMatrix = [];
    var size          = matrix.length;

    for (i = 0; i < size; i++) {
        var row = [];
        for (j = 0; j < size; j++) {
            if(clockwise){
                row.push( matrix[size - j - 1][i] );
            } else {
                row.push( matrix[j][size - i - 1] );
            }
        }
        rotatedMatrix.push(row);
    }
    matrix = rotatedMatrix;
}

/**
 * Validates input and calls the function to create matrix
 */
function createMatrix () {
    var matrixSize = document.getElementById('matrixSize').value;
    if( matrixSize.length === 0
    || parseInt(matrixSize) === 0
    || parseInt(matrixSize) < 2
    || parseInt(matrixSize) > 100) {
        //why 100... It's a nice round number and the browser still responds at this number :D
        // 100 * 100 = 10000 => this number of cells we have to append in view.
        // if we would do only console logs the number could be bigger :)
        alert('Number out of limits! Please add a number between 2 and 100)!');
        return;
    }

    generateAndShowMatrix(matrixSize);
}

/**
 * Validates if we have a matrix
 * then calls functions to rotate,
 * cleans table,
 * and show the result
 * @param clockwise
 */
function rotateCreatedMatrix(clockwise) {
    if( matrix.length === 0 ) {
        alert('First please generate an array then rotate it! Thank you!');
        return;
    }

    rotateMatrix(clockwise);

    var rotatedMatrix        = document.getElementById('rotatedMatrix');
    rotatedMatrix.innerHTML  = '';

    showMatrix('rotatedMatrix', matrix);
}