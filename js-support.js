/**
 * code by Joseph Flanigen
 * js for word-game
 * edited: 1-2-24
 * 
 */


window.onload = function () {
    document.getElementById('P_EXECGAME').style.display = 'none';
    document.getElementById('P_RUNGAME').style.display = 'none';
    document.getElementById('numInput').focus();
    
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
        document.getElementById('execGame').style.display = "block";
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
var randomWordsCopy = [];
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

// used to perform countdown after pressing start button
// to give user a buffer between pressing start and needing to type,
// execGame() will be executed after 'start' button is pressed and timer reaches 0.
function timer(){
    document.getElementById('P_EXECGAME').style.display = 'none';
    document.getElementById('timer').style.display = 'block'
    document.getElementById('timer').innerText = '3';
    let countdown = 2;
    const countdownTimer = setInterval(() => {
        document.getElementById('timer').innerText = countdown;

        countdown--;
        if(countdown < 0){
            clearInterval(countdownTimer);
            execGame();
        }
    }, 1000);
}

// execGame(): function to run each game session
function execGame(){

    document.getElementById('timer').style.display = 'none';
    document.getElementById('P_RUNGAME').style.display = 'block';
    document.getElementById('userInput').focus();

    // used for WPM calculations
    startTime = Date.now();
    // copy
    randomWordsCopy = [... randomWords];

    currentRandomWord = randomWords[0];
    document.getElementById('currentRandomWord').innerText = currentRandomWord;

    document.getElementById('userInput').addEventListener('input', function() {
        if(document.getElementById('userInput').value.length == document.getElementById('currentRandomWord').innerText.length){
            document.getElementById('submitButton').click();
        }
    });
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
    userWords.push(submittedWord);
    submittedWord = "";
    numChars += correctWord.length;

    if(randomWords.length > 1){
        contGame();
    } else {
        endGame();
    }
    console.log(userWords)
}



function endGame() {
    document.getElementById('container').style.display = 'none';
    console.log('user words: ', userWords);
    console.log('rw: ', randomWordsCopy);
    for(let j = 0; j < userWords.length; j++){
        for(let i = 0; i < userWords[j].length; i++){
            if(userWords[j].charAt(i) === randomWordsCopy[j].charAt(i)){
                numCharsCorrect += 1;
            }
        }
    }


    let ACC = numCharsCorrect / numChars;
    let NUM = document.getElementById('numInput').value;
    let WPM = ((numChars - (numChars - numCharsCorrect))/5) / ((Date.now() - startTime) / 60000);

    const ifSingular = n => (n == 1 ? ' word' : ' words');
    document.getElementById('NUM').innerText += NUM + ifSingular(NUM);
    document.getElementById('WPM').innerText += Math.round(WPM);
    document.getElementById('ACC').innerText += Math.round((ACC * 100)) + '%';

    // display the above values and give restart option.
    document.getElementById('stats').style.display = 'inline-block';
    document.getElementById('restartButton').style.display = 'block';

    // rotate through correct and user submitted words after the game below
    document.getElementById('displayCorrectWord').innerText = 'Correct Word\n' + randomWordsCopy[0];
    document.getElementById('displayUserWord').innerText = 'Your Word\n' + userWords[0];
    let trav = 1;
    const interval = setInterval(() => {
        document.getElementById('displayCorrectWord').innerText = 'Correct Word\n' + randomWordsCopy[trav];
        document.getElementById('displayUserWord').innerText = 'Your Word\n' + userWords[trav];

        trav++;
        if(trav >= randomWordsCopy.length){
            trav = 0;
        }
    }, 1500);

    
}

function contGame(){
    randomWords.shift();
    document.getElementById('currentRandomWord').innerText = randomWords[0];
    document.getElementById('userInput').value = '';
    document.getElementById('userInput').focus();

}