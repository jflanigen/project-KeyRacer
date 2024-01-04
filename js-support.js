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
            const randomWord = data[0];
            console.log(randomWord);
        })
        .catch(error => {
            console.error(error);
            document.getElementById('currentRandomWord').innerText = 'Error fetching random word.';
        });
}

// assembles array wordArray for random words
function fillArray(array){
    for(let i = 0; i < array.length; i++){
        array[i] = generateWord();
    }
}

function checkInput(userInput, randomWord){
}

// for start button
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('execGame').click();
        document.getElementbyId('execGame').disabled = true;
        document.getElementById('userInput').focus();
    }
});



// execGame(): function to run each game session
function execGame(){

    // initialize randomWords from api
    randomWords = new Array(20);
    fillArray(randomWords);
    // while no mismatch in word typed, used for game status
    let lettersMatch = true;

    // will be used for WPM calculation
    let totalNumChars = 0;
    const startTime = Date.now();

    while(lettersMatch == true){

    }
}