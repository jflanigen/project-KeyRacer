/**
 * code by Joseph Flanigen
 * js for word-game
 * edited: 1-2-24
 * 
 */

// Random word API url
const api_url = 'https://random-word-api.herokuapp.com/word';

// generateWord(): fetch random word using random word api 
function generateWord(){
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

// checkInput(): used to manipulate boolean lettersMatch in execGame()
function checkInput(userInput, randomWord){
    if(userInput == randomWord){
        return true;
    }
    else {
        return false;
    }
}

// for start button
var enterPressed = false;
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if(!enterPressed){
            // click execGame() button to start session
            document.getElementById('execGame').click();
            enterPressed = true;
        } else {
            // focus on userInput box.
            document.getElementById('userInput').click();
        }
        document.getElementById('userInput').focus()
    }
});

/*

    BELOW: execGame() and other game logic implementation, 
           no more support functions 

*/


var randomWords = new Array(20);
function fillArray(){
    for(let i = 0; i < randomWords.length; i++){
        randomWords[i] = generateWord();
    }
}


// execGame(): function to run each game session
function execGame(){

    // while no mismatch in word typed, used for game status
    let lettersMatch = true;

    // will be used for WPM calculation
    let totalNumChars = 0;
    const startTime = Date.now();

    // will be used for accuracy calculation
    let totalNumCharsCorrect = 0;

    // travRWs used to traverse through randomWords
    let travRWs = 0;

    while(lettersMatch == true && travRWs < 20){

        if(checkInput == true){
            totalNumCharsCorrect += randomWords[travRWs].length;
            travRWs++;
        } else {
            // for loop for finding out which characters were correct and which were not from incorrect word
            for(let i = 0; i < randomWords[travRWs].length; i++){
                if(randomWords[travRWs].charAt(i) == document.getElementById('userInput').value.charAt(i)){
                    totalNumCharsCorrect += 1;
                }
            }
            lettersMatch = false();
        }
        totalNumChars += randomWords[travRWs].length;
    }

    // Words per minute calculation
    let WPM = totalNumChars / (Date.now() - startTime);
    // Accuracy calculation (% of characters correct)
    let accuracy = totalNumCharsCorrect / totalNumChars;
}

generateWord();