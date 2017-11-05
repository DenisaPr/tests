var originalArray = [];

/**
 * to prevent to refresh the page
 */
document.getElementById("arrayForm").addEventListener("submit", function(event){
    event.preventDefault();
});

/**
 * Clean all dom elements to have a clean slate
 */
function cleanAll() {
    document.getElementById('originalArray').innerHTML  = '';
    document.getElementById('rotatedArray').innerHTML   = '';
    document.getElementById('resultOfSearch').innerHTML = '';
    originalArray = [];
}

/**
 * Show in given id given text
 * @param pId
 * @param text - not added ? will do an iteration on originalArray
 */
function showArray(pId, text){
    var pElem = document.getElementById(pId);

    if(!text) {
        text = '';
        for(var i=0;i<originalArray.length;i++){
            text = text + originalArray[i] + ', ';
        }
    }

    pElem.innerHTML = text;
}

/**
 * Rotate array, puts the fist to the end and deletes the first element
 */
function rotateArray() {
    originalArray.push(originalArray[0]);
    originalArray.splice(0,1);
}

/**
 * Rotates the originalArray random times if originalArray available and shows
 * @param random - if not provided random number will generate one between 0 to half of the array length
 */
function rotateRandomNr(random) {
    if (originalArray.length === 0) {
        alert('Please first generate an array! Thank you!');
        return;
    }
    if (!random) {
        random = Math.floor((Math.random() * Math.floor(originalArray.length / 2)) + 1);
    }

    for (var i = 0; i <= random; i++) {
        rotateArray();
    }
    showArray('rotatedArray');
}

/**
 * Validates form then generates array
 * @param form
 * @returns {boolean}
 */
function validateForm(form) {
    if (form.arrayStep.value === '' || form.arrayStart.value === '' || form.arrayEnd.value === ''
    || form.arrayStep.value < 1 || form.arrayStart.value < 0 || form.arrayEnd.value < 1 ) {
        alert("Inputs must be filled out and to be greater then 0.(Only start can be 0)");
        return false;
    }

    generateArray(form);
}

/**
 * generates array based on form data
 * @param form
 */
function generateArray(form) {
    cleanAll();

    var arrayStart = parseInt(form.arrayStart.value);
    var arrayStep  = parseInt(form.arrayStep.value);
    var arrayEnd   = parseInt(form.arrayEnd.value);
    var string     = '';

    for (var i = arrayStart; i <= arrayEnd; i = i + arrayStep) {
        string = string + i + ', ';
        originalArray.push(i);
    }

    showArray('originalArray', string);
}

/**
 * if nr provided tries to  find it in originalArray
 * @param nr
 */
function findElement(nr) {
    if(nr === '' || nr === null) {
        alert('No element added!');
        return;
    }
    var result = originalArray.indexOf(parseInt(nr));

    if(result<0) {
        showArray('resultOfSearch', 'Element ' + nr + ' not found!');
    } else {
        showArray(
            'resultOfSearch',
            'Element ' + nr + ' found on position ' + (result+1) + '. ' +
            '(If you start counting from 1, total count '+ originalArray.length +')' );
    }
}

/**
 * opens a prompt to interact with user to get the number to search in array
 */
function openFindElement() {
    if(originalArray.length === 0) {
        alert('Please first generate an array then try to find the element! Thank you!');
        return;
    }
    var element = prompt('What element do you want to find in the generated array ? ');

    findElement(element);
}