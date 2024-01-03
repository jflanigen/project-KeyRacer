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
            randomWord.split('').forEach(char => {
                const span = document.createElement('span');
                span.textContent = char;
                currentRandomWord.appendChild(span);
            });
                
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
}

// for start button
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('startGame').click();
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



