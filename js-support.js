/**
 * code by Joseph Flanigen
 * js for word-game
 * edited: 1-2-24
 * 
 */

// Random word API url
var api_url_base = 'https://random-word-api.herokuapp.com/word?number=';

// generateWord(): fetch random word using random word api 
function generateWord(api_url){
    fetch(api_url)
        .then(response => {
            if(!response.ok){
                throw new Error('Response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const randomWord = data;
            console.log(randomWord);
        })
        .catch(error => {
            console.error(error);
            document.getElementById('currentRandomWord').innerText = 'Error fetching random word.';
        });
}

// numChars for accuracy calculation
var numChars = 0;
var numCharsCorrect = 0;
// generated words and traversal
var randomWords = [];
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
    api_url = api_url_base + document.getElementById('numInput')

    // display P_EXEC button 'page' and generate randomWords
    document.getElementById('P_NUMREQ').display.style = 'none';
    document.getElementById('P_EXECGAME').display.style = 'block';
    randomWords = generateWord(api_url);
}

function submitUserWord(){
    let currentWord = document.getElementById('currentRandomWord');

    // compute new numChars and numCharsCorrect
    numChars += currentWord.length;
    for(let i = 0; i < currentWord.length; i++){
        if(currentWord.charAt(i) === document.getElementById('userInput').charAt(i)){
            numCharsCorrect += 1;
        }
    }

    trav += 1;
}

// execGame(): function to run each game session
function execGame(){

    document.getElementById('P_EXECGAME').display.style = 'none';
    document.getElementById('P_RUNGAME').display.style = 'block';

    // used for WPM calculations
    let startTime = Date.now();

    while(trav < randomWords.length){
        let currentWord = randomWords[trav];
        document.getElementById('currentRandomWord') = currentWord;
    }

    

}