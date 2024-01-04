/**
 * code by Joseph Flanigen
 * js for word-game
 * edited: 1-2-24
 * 
 */

// Random word API url
const api_url = 'https://random-word-api.herokuapp.com/word';

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
            const currentRandomWord = document.getElementById('currentRandomWord');
            // turn every character into its own
            // element for styling/validation purposes
            currentRandomWord.innerHTML = '';
            randomWord.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                currentRandomWord.appendChild(span);
            });
            document.getElementById('userInput').value = '';   
        })
        .catch(error => {
            console.error(error);
            document.getElementById('currentRandomWord').innerText = 'Error fetching random word.';
        });
}

function checkUserInput(){
    // get userInput and characters 
    const userInput = document.getElementById('userInput');
    const characters = document.getElementById('currentRandomWord').children;

    // index through characters of generated word,
    // change to green if correct (and return true to continue game session),
    // change to red if incorrect (and return false to terminate game session)
    for(let i = 0; i < characters.length; i++){
        const currentChar = characters[i];
        if(userInput == currentChar){
            currentChar.style.color = 'green';
            return true;
        } else {
            currentChar.style.color = 'red';
            return false;
        }
    }
}

// for start button
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('startGame').click();
        document.getElementById('userInputButton').click();
    }
});



// function to run each game session
function execGame(){
    // while no mismatch in word typed, used for game status
    let lettersMatch = true;

    // will be used for WPM calculation
    let totalNumChars = 0;
    let timeElapsed = 0.0;

    while(lettersMatch == true){
        const timerStart = Date.now();
        currentWord = generateWord();
    }
}



