/**
 * code by Joseph Flanigen
 * js for word-game
 * edited: 1-2-24
 * 
 */


window.onload = function () {
    document.getElementById('P_EXECGAME').style.display = 'none';
    document.getElementById('P_RUNGAME').style.display = 'none';
}

// Random word API url
var api_url_base = 'https://random-word-api.herokuapp.com/word?number=';

// generateWord(): fetch random word using random word api 
async function generateWord(api_url) {
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error('Response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

// numChars for accuracy calculation
var numChars = 0;
var userCharsTyped = 0;
var numCharsCorrect = 0;
var startTime = 0;

// generated words and traversal
var randomWords = [];
var userWords = [];
var currentRandomWord = '';
var trav = 0;

/**
 *  switchToP_EXEC(): Triggered when on P_NUMREQ and after user has
 *                    has inputted their desired number of words.
 * 
 *                    should 'change the page' and generate words using
 *                    adjusted url for the input integer by the user
 */
function switchToP_EXEC(){
    // after finding out how many words the user wants,
    // add it to the end of the API url as necessary.
    let api_url = api_url_base + document.getElementById('numInput').value;

    // display P_EXEC button 'page' and generate randomWords
    document.getElementById('P_NUMREQ').style.display = 'none';
    document.getElementById('P_EXECGAME').style.display = 'block';
    
    // await generation of words then assign to randomWords
    generateWord(api_url).then(data => {
        randomWords = data;
    });

}

// execGame(): function to run each game session
function execGame(){

    document.getElementById('P_EXECGAME').style.display = 'none';
    document.getElementById('P_RUNGAME').style.display = 'block';

    // used for WPM calculations
    startTime = Date.now();

    currentRandomWord = randomWords[0];
    document.getElementById('currentRandomWord').innerText = currentRandomWord;
}


/**
 *  submitUserWord(): Triggered when on P_RUNGAME and enter key is pressed.
 *                    compute numChars and numCharsCorrect as well as
 *                    adjust the traversal integer.
 * 
 *  > endGame() and contGame() below, used for submitUserWord() game flow.
 */
function submitUserWord() {
    let correctWord = document.getElementById('currentRandomWord').innerText;
    // acquire user's submitted word and empty input, store users word in array
    let submittedWord = document.getElementById('userInput').value;
    document.getElementById('userInput').value = '';
    userWords.push(submittedWord);
    
    for(let i = 0; i < correctWord.length; i++){
        if(submittedWord.charAt(i) == correctWord.charAt(i)){
            numCharsCorrect += 1;
        }
    }
    if(submittedWord.length < correctWord.length){
        numChars += correctWord.length;
    } else {
        numChars += submittedWord.length;
    }
    userCharsTyped = submittedWord.length;

    if(randomWords.length > 1){
        contGame();
    } else {
        endGame();
    }
}

const plurality = n => (n <= 1 ? ' word' : ' words');

function endGame() {
    document.getElementById('currentRandomWord').innerText = '';

    let WPM = (userCharsTyped / 5) / ((Date.now() - startTime) / 60000);
    let ACC = numCharsCorrect / numChars;
    let NUM = document.getElementById('numInput').value;
    document.getElementById('WPM').innerText += WPM;
    document.getElementById('ACC').innerText += Math.round((ACC * 100)) + '%';
    document.getElementById('NUM').innerText += NUM + plurality(userWords.length);

    // display the above values and give restart option.
    document.getElementById('stats').style.display = 'inline-block';
    document.getElementById('restartButton').style.display = 'block';
}

function contGame(){
    randomWords.shift();
    document.getElementById('currentRandomWord').innerText = randomWords[0];
}