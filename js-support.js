/**
 * code by Joseph Flanigen
 * js for word-game
 * last edit: 1-6-2024
 * 
 */

// upon loading, hide EXECGAME and RUNGAME 'pages' and focus on input
window.onload = function () {
    document.getElementById('P_EXECGAME').style.display = 'none';
    document.getElementById('P_RUNGAME').style.display = 'none';
    document.getElementById('numInput').focus();
    
}

/** 
 * numChars and numCharsCorrect (by user) will be used for accuracy calculations later
 * startTime will be used for WPM calculation later
*/
var numChars = 0;
var numCharsCorrect = 0;
var startTime = 0;

/**
 *  randomWords: will be used to store random words from api
 *  randomWordsCopy: will be used to save initial values of randomWords
 *                   as it will be shifted, is necessary for accuracy calculations
 *  userWords: will store user's inputs during the game 
 */
var randomWords = [];
var randomWordsCopy = [];
var userWords = [];


var currentRandomWord = '';
var trav = 0;

/**
 *  verifyInt(): upon user submitting numInput.value, check if it is an integer in range 1 to 25 inclusive
 *               if it is valid, continue to switchToP_EXEC() function
 *               if it is not valid, reprompt the user to submit an integer within 1 and 25 inclusive 
 */
function verifyInt(){
    let value = document.getElementById('numInput').value;
    if(isNaN(value) || value < 1 || value > 25){
        document.getElementById('numInputLabel').innerText = 'INPUT MUST BE INTEGER WITHIN 1 AND 25'
        value.value = '';
    } else {
        switchToP_EXEC();
    }
}

/**
 *  generateWord(api_url): fetch array of random words and return array.
 */
async function generateWord(api_url) {
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error('Response was not ok');
        }
        // await response, store in data
        const data = await response.json();
        console.log(data);

        // hide 'loading' text and reveal game start button
        document.getElementById('loading').style.display = 'none';
        document.getElementById('execGame').style.display = 'block';
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

// Random word API url
var api_url_base = 'https://random-word-api.herokuapp.com/word?number=';

/**
 *  switchToP_EXEC(): used to initialize EXECGAME 'page' and a loading screen
 *                    as well as generate the random words of user's input size
 */
function switchToP_EXEC(){
    // append user's requested game size to URL so it returns as many words as necessary
    let api_url = api_url_base + document.getElementById('numInput').value;

    // display EXECGAME page and loading screen
    document.getElementById('P_NUMREQ').style.display = 'none';
    document.getElementById('P_EXECGAME').style.display = 'block';
    document.getElementById('loading').style.display = 'block';
    
    // await generation of words then assign to randomWords,
    // generateWord will continue the program by prompting a button.
    generateWord(api_url).then(data => {
        randomWords = data;
    });

}

/**
 *  timer(): upon the user pressing the game's start button, timer will execute.
 *           timer will create a countdown from 3 on the screen and continue to execGame()
 */
function timer(){
    // have all 'pages' off, blank background and header for countdown.
    document.getElementById('P_EXECGAME').style.display = 'none';

    // initialize the countdown, starting at 3.
    document.getElementById('timer').style = 'display: flex; justify-content: center; align-items: center;'
    document.getElementById('timer').innerText = '3';

    // one second intervals, lowering the timer element's innerText by one
    // every second from 3
    let countdown = 2;
    const countdownTimer = setInterval(() => {
        document.getElementById('timer').innerText = countdown;

        countdown--;
        // once the countdown is over, end the interval
        // and continue to execGame().
        if(countdown < 0){
            clearInterval(countdownTimer);
            execGame();
        }
    }, 1000);
}

/**
 *  execGame(): initializes the game session page and prompts userInput
 *              calls submitUserWord() via button click event listener
 */
function execGame(){

    // turn off the timer page, turn on RUNGAME page
    document.getElementById('timer').style.display = 'none';
    document.getElementById('P_RUNGAME').style.display = 'block';
    // focus on userInput so user does not need to manually select the input box
    document.getElementById('userInput').focus();

    // used for WPM calculations, initialized earlier
    startTime = Date.now();
    // copy the set of random words, initialized earlier
    randomWordsCopy = [... randomWords];

    // set current random word to first generated, display on screen
    currentRandomWord = randomWords[0];
    document.getElementById('currentRandomWord').innerText = currentRandomWord;

    // add new Event Listener every tiem execGame is called,
    // each character input will fire the boolean below
    document.getElementById('userInput').addEventListener('input', function() {
        // if user's current word in input box is of matching length to the correct word
        // (presumably accurately entered), click button id="submitButton" which calls submitUserWord().
        if(document.getElementById('userInput').value.length == document.getElementById('currentRandomWord').innerText.length){
            document.getElementById('submitButton').click();
        }
    });
}

/**
 *  submitUserWord(): contains boolean which either continues game or brings 
 *                    user to post game screen.
 */
function submitUserWord() {
    // acquire the current correct word and user word
    let correctWord = document.getElementById('currentRandomWord').innerText;
    let submittedWord = document.getElementById('userInput').value;
    // push user's word into storage and reset the input field
    userWords.push(submittedWord);
    submittedWord = "";
    // add to total number of characters, for WPM calculation
    numChars += correctWord.length;

    if(randomWords.length > 1){
        // if it is not the last word, continue game by calling contGame()
        contGame();
    } else {
        // if it is the last word, continue to calculating postgame stats
        // and postgame page
        endGame();
    }
}

/**
 *  contGame(): used to continue on to next word in random array,
 *              correctly display current word and refresh input field
 */
function contGame(){
    // go to next random word and display on screen
    randomWords.shift();
    document.getElementById('currentRandomWord').innerText = randomWords[0];

    // empty input field for user and focus on it
    document.getElementById('userInput').value = '';
    document.getElementById('userInput').focus();

}


/**
 *  endGame(): process final stats and display on screen
 *             effectively ending the game session until
 *             user reset's the page via button click
 */
function endGame() {
    // container is a div that contains the user's input field
    // and the current random word, so this hides those
    document.getElementById('container').style.display = 'none';

    // compare each submitted word to its
    // associated word from the generated array
    // character-by-character
    for(let j = 0; j < userWords.length; j++){
        for(let i = 0; i < userWords[j].length; i++){
            if(userWords[j].charAt(i) === randomWordsCopy[j].charAt(i)){
                numCharsCorrect += 1;
            }
        }
    }


    // calculate accuracy, number of words, and wpm
    let ACC = 100 * (numCharsCorrect / numChars);
    let NUM = document.getElementById('numInput').value;
    let WPM = ((numChars - (numChars - numCharsCorrect))/5) / ((Date.now() - startTime) / 60000);
    // subtract the number of incorrect characters (incorrect = total - correct)
    // from total number of characters and divide by 5 to find
    // 'average' number of words typed by the user in a given session
    // this is necessary for an accurate WPM as opposed to using the true
    // number of words
    

    // determine plurality of 'Word'
    const ifSingular = n => (n == 1 ? 'Word: 1' : 'Words: ' + NUM);
    
    // displays each statistic within its respective div
    document.getElementById('NUM').innerText = ifSingular(NUM);
    document.getElementById('WPM').innerText += Math.round(WPM);
    document.getElementById('ACC').innerText += Math.round(ACC) + '%';

    // display the above values
    document.getElementById('stats').style = 'block'

    // display matching first user word and first random word
    document.getElementById('displayCorrectWord').innerText = 'Correct Word\n' + randomWordsCopy[0];
    document.getElementById('displayUserWord').innerText = 'Your Word\n' + userWords[0];
    // traversal function, used to rotate through matching user and random words
    let trav = 1;
    const interval = setInterval(() => {
        // set the currently displayed words via indexing array with traversal integer
        document.getElementById('displayCorrectWord').innerText = 'Correct Word\n' + randomWordsCopy[trav];
        document.getElementById('displayUserWord').innerText = 'Your Word\n' + userWords[trav];

        // increment traversal integer
        trav++;
        // if the integer goes out of bounds, return back to the beginning of the arrays
        if(trav >= randomWordsCopy.length){
            trav = 0;
        }
    }, 1500);
}