var score,
high_score,
colours = ['#b200b2', 'orange', '#228B22'];

window.onload = function(){
    score = 0;
    if(!!document.cookie) {
        high_score = parseInt(document.cookie.substring(11, 12));
    }
    else {
        high_score = 0;
        document.cookie = 'high_score=' + 0 + '; ';
    }

    setBodyBackgroundColor();
    setNumbers(generateEquationNumbers());

    document.getElementById('answer_correct').onclick = function(){
        checkAnswerCorrect() ? nextRound() : gameOver(false);
    };
    document.getElementById('answer_false').onclick = function(){
        checkAnswerCorrect() ? gameOver(false) : nextRound();
    };
};

function nextRound() {
    clearTimeout(timeout);
    clearInterval(elapseTimer);
    setScore();
    setNumbers(generateEquationNumbers());
    runTimer();
}

function setBodyBackgroundColor() {
    var colour = Math.floor((Math.random() * 3));
    document.body.style.backgroundColor = colours[colour];
}

var elapseTimer,
timeout,
number1,
number2,
sum,
sumTrue;

function runTimer() {
    timer_bar = document.getElementById('timer_elapsed');
    timer_bar.style.width = '100%';
    elapseTimer = window.setInterval(function(){
        switch(timer_bar.style.width) {
            case '100%':
                timer_bar.style.width = '66.6%';
                break;
            case '66.6%':
                timer_bar.style.width = '33.3%';
                break;
            case '33.3%':
              timer_bar.style.width = '0%';
              break;
            default:
                timer_bar.style.width = '100%';
                break;
        }
    }, 1000);
    timeout = window.setTimeout(function(){
        gameOver(true);
    }, 3100);
};

function generateEquationNumbers() {
    var numbers = [];
    // 1st number
    numbers.push(Math.floor((Math.random() * 5) + 1));
    // 2nd number
    numbers.push(Math.floor((Math.random() * 5) + 1));
    // sum
    var sumOrRandom = Math.floor((Math.random() * 3) + 1);
    sumOrRandom === 1 ?
        numbers.push(numbers[0] + numbers[1]) :
        numbers.push(Math.floor((Math.random() * 10) + 1));
    return numbers;
};

function setNumbers(numbersArray) {
    // set global values
    number1 = numbersArray[0];
    number2 = numbersArray[1];
    sum = numbersArray[2];
    (number1 + number2) === sum ? sumTrue = true : sumTrue = false;

    // edit page values
    document.getElementById("first_number").innerHTML = number1;
    document.getElementById("second_number").innerHTML = number2;
    document.getElementById("sum").innerHTML = sum;
}

function setScore() {
    score++;
    document.getElementById('score').innerHTML = score;
}

function checkAnswerCorrect() {
    if(sumTrue) {
        return true;
    }
    else {
        return false;
    }
}

function gameOver(ranOutOfTime) {
    clearTimeout(timeout);
    clearInterval(elapseTimer);

    //set game over text
    ranOutOfTime ?
        document.getElementById('game_over_text').innerHTML = 'Time Out' :
        document.getElementById('game_over_text').innerHTML = 'Game Over';

    // disable buttons
    document.getElementById('answer_correct').disabled = true;
    document.getElementById('answer_false').disabled = true;

    // set time out text
    document.getElementById('new_score').innerHTML = score;
    if(score > high_score) {
        document.getElementById('best_score').innerHTML = score;
        // write cookie
        document.cookie = 'high_score=' + score + '; ';
    }
    else {
      document.getElementById('best_score').innerHTML = high_score;
    }
    document.getElementById('time_out').style.display = 'inherit';
};
