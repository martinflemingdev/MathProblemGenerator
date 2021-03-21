let add = document.getElementById('add');
let subtract = document.getElementById('subtract');
let multiply = document.getElementById('multiply');
let divide = document.getElementById('divide');
let arrayOfOperators = [];

let answers = document.querySelectorAll('li');
let scoreElement = document.querySelector('.currentScore');
let problemNumber = document.querySelector('.currentProblem');
let startButton = document.getElementById('btnStart');
let expressionDiv = document.querySelector('.expression');
let counter = 0;
let problemAnswer = 0;

/**
 * Utility function to generate a random number based on max
 * @param {number} max
 */
function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
/**
* Utility function to shuffle the items in an array
* @param {object} arr
*/
function shuffleArray(arr) {
    return arr.sort(function (a, b) { return Math.random() - 0.5 })
}

function returnNewProblem() {
    let number = getRandomNumber(arrayOfOperators.length)
    return `${getRandomNumber(10)} ${arrayOfOperators[number]} ${getRandomNumber(10)}`;
}
// displays current problem and solutions
function seeCurrentProblem() {
    let currentProblem = returnNewProblem();

    // sets problem on page
    expressionDiv.innerText = currentProblem;

    // creates answer to problem
    problemAnswer = eval(currentProblem);

    // generate array with correct answer and 3 wrong answers
    let answerArray = [problemAnswer];
    let answerArrayLength = 1;
    while (answerArrayLength < 4) {
        let x = getRandomNumber(82);
        if (x != problemAnswer) {
            answerArray.push(x);
            answerArrayLength++;
        }
    }
    shuffleArray(answerArray);

    let index = 0;
    //sets answers on page
    answers.forEach((li) => {
        li.innerText = answerArray[index];
        index++;
    });
}

function hideMathProblems() {
    document.getElementById('firstP').classList.add('hidden');
    document.getElementById('problem').classList.add('hidden');
    document.getElementById('answers').classList.add('hidden');
    document.getElementById('btnStartOver').classList.add('hidden');
    document.getElementById('btnPickNewOperands').classList.add('hidden');
}

function showMathProblems() {
    document.getElementById('options').classList.add('hidden');
    document.getElementById('start').classList.add('hidden');
    document.getElementById('firstP').classList.remove('hidden');
    document.getElementById('problem').classList.remove('hidden');
    document.getElementById('answers').classList.remove('hidden');
    document.getElementById('btnStartOver').classList.remove('hidden');
    document.getElementById('btnPickNewOperands').classList.remove('hidden');
}

function addOperators() {
    if (add.checked) {
        arrayOfOperators.push('+');
    }
    if (subtract.checked) {
        arrayOfOperators.push('-');
    }
    if (multiply.checked) {
        arrayOfOperators.push('*');
    }
    if (divide.checked) {
        arrayOfOperators.push('/');
    }
    if (arrayOfOperators.length == 0) {
        alert("Please Check Something");
        location.reload();
    }
}

function takeQuiz() {

    seeCurrentProblem();

    answers.forEach((answer) => {

        answer.addEventListener('click', (event) => {

            if (event.target.innerText == problemAnswer) {
                scoreElement.innerText = parseInt(scoreElement.innerText) + 1;
                problemNumber.innerText = parseInt(problemNumber.innerText) + 1;
                counter++;

                if (counter < 10) {
                    seeCurrentProblem();
                }
                else if (counter == 10) {
                    problemNumber.innerText = 10;
                    document.querySelector('.expression').classList.add('hidden');
                    document.getElementById('answers').classList.add('hidden');
                }
            } else {
                problemNumber.innerText = parseInt(problemNumber.innerText) + 1;
                counter++;

                if (counter < 10) {
                    seeCurrentProblem();
                }
                else if (counter == 10) {
                    problemNumber.innerText = 10;
                    document.querySelector('.expression').classList.add('hidden');
                    document.getElementById('answers').classList.add('hidden');
                }
            }
        })
    })
}

function startOver() {
    btnStartOver.addEventListener('click', () => {
        document.querySelector('.expression').classList.remove('hidden');
        document.getElementById('answers').classList.remove('hidden');

        scoreElement.innerText = 0;
        problemNumber.innerText = 1;

        counter = 0;
        seeCurrentProblem();
    })

    document.getElementById('btnPickNewOperands').addEventListener('click', () => {
        location.reload();
    })
}

document.addEventListener('DOMContentLoaded', () => {

    hideMathProblems();

    startButton.addEventListener('click', () => {

            addOperators();
            showMathProblems();
            takeQuiz();
            startOver();
    })
})
