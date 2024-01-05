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
    let currentWord = document.getElementById('currentRandomWord').value;
    // compute new numChars and numCharsCorrect
    numChars += currentWord.length;
    for(let i = 0; i < currentWord.length; i++){
        if(currentWord.charAt(i) === document.getElementById('userInput').value.charAt(i)){
            numCharsCorrect += 1;
        }
    }

    trav += 1;
    console.log("BPcgs");

    if(trav < randomWords.length){
        curentRandomWord = randomWords[trav];
        document.getElementById('currentRandomWord').innerText = currentRandomWord;
        document.getElementById('currentRandomWord').value = currentRandomWord;
    } else {
        console.log();
        // set WPM ACC and NUM values
        let WPM = numChars / Date.now() - startTime;
        let ACC = numCharsCorrect / numChars;
        let NUM = document.getElementById('numInput').value;


        document.getElementById('WPM').innerText = WPM;
        document.getElementById('ACC').innerText = ACC;
        document.getElementById('NUM').innerText = NUM;

        // display the above values and give restart option.
        document.getElementById('stats').style.display = 'inline-block';
        document.getElementById('restartButton').style.display = 'block';

        trav = 0;
    }

};


// execGame(): function to run each game session
function execGame(){

    document.getElementById('P_EXECGAME').style.display = 'none';
    document.getElementById('P_RUNGAME').style.display = 'block';

    // used for WPM calculations
    startTime = Date.now();

    currentRandomWord = randomWords[0];
    document.getElementById('currentRandomWord').value = currentRandomWord;
    document.getElementById('currentRandomWord').innerText = currentRandomWord;
}