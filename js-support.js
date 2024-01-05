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


/**
 *  submitUserWord(): Triggered when on P_RUNGAME and enter key is pressed.
 *                    compute numChars and numCharsCorrect as well as
 *                    adjust the traversal integer.
 */
function submitUserWord() {
    // acquire user's submitted word and empty input, store users word in array
    let submittedWord = document.getElementById('userInput').value;
    document.getElementById('userInput').value = '';
    userWords.push(submittedWord);

    numChars += submittedWord.length;

    for(let i = 0; i < document.getElementById('currentRandomWord').innerText.length; i++){
        if(submittedWord.charAt(i) === document.getElementById('currentRandomWord').innerText.charAt(i)){
            numCharsCorrect += 1;
        }
    }

    if(randomWords.length > 1){
        randomWords.shift();
        document.getElementById('currentRandomWord').innerText = randomWords[0];
    } else {
        let WPM = numChars / Date.now() - startTime;
        let ACC = numCharsCorrect / numChars;
        let NUM = document.getElementById('numInput').value;

        document.getElementById('WPM').innerText = WPM;
        document.getElementById('ACC').innerText = ACC;
        document.getElementById('NUM').innerText = NUM;

        // display the above values and give restart option.
        document.getElementById('stats').style.display = 'inline-block';
        document.getElementById('restartButton').style.display = 'block';
    }
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