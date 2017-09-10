let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value == '' || attempt.value == '') {
        setHiddenFields();
    }
    if(!validateInput(input.value)) {
        return false;
    }
    else if(validateInput(input.value)) {
        attempt.value++;
    }

    var userWon = getResults(input.value);

    if(userWon){
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();        
    }
    else if(!userWon && attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    }
    else if(!userWon) {
        setMessage('Incorrect, try again.')
    }
}

//implement new functions here

function setHiddenFields() {
    let answerNum = Math.floor(Math.random() * 9999) + 1;

    let answerToString = answerNum.toString();
    while(answerToString.length < 4) {
        answerToString  = "0" + answerToString;
    }
    answer.value = answerToString;
    attempt.value = 0;
}

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}

function validateInput(inputToValidate) {
    if(inputToValidate.length === 4) {
        return true;
    }
    else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(userGuess) {
    let userGuessStr = userGuess.toString();
    let answerStr = answer.value.toString();    
    let correctGuesses = 0;
    let initialDiv = '<div class="row"><span class="col-md-6">' + userGuessStr + 
                  '</span><span class="col-md-6">';
    for (i = 0; i < answerStr.length; i++) {
        if(userGuessStr[i] == answerStr[i]) {
            initialDiv += '<span class="glyphicon glyphicon-ok"></span>';
            correctGuesses++;
        }
        else if(answerStr.indexOf(userGuessStr[i]) != -1){
            initialDiv += '<span class="glyphicon glyphicon-transfer"></span>';
        }
        else if(answerStr.indexOf(userGuessStr[i]) == -1){
            initialDiv += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }

    initialDiv += '</span></div>';

    document.getElementById('results').innerHTML += initialDiv;

    if(correctGuesses == 4) {
        return true;
    }

    else if(correctGuesses < 4) {
        return false;
    }

    
}

function showAnswer(outcome) {
    document.getElementById('code').innerHTML = answer.value;

    if(outcome) {
        document.getElementById('code').className += ' success';
    }
    else if(!outcome) {
        document.getElementById('code').className += ' failure';
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';

}


