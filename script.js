// Preload animation
setTimeout(() => {
    document.body.classList.remove("preload");
}, 500);

// DOM Elements
const btnRules = document.querySelector('.rules-btn');
const btnClose = document.querySelector('.close-btn');
const modalRules = document.querySelector('.modal');

const CHOICES = [
    { name: "paper", beats: "rock" },
    { name: "scissors", beats: "paper" },
    { name: "rock", beats: "scissors" },
];

const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.results');
const resultDivs = document.querySelectorAll('.results-result');

const resultWinner = document.querySelector('.results-winner');
const resultText = document.querySelector('.results-text');

const playAgainBtn = document.querySelector('.play-again');
const scoreNumber = document.querySelector('.score_number');
let score = 0;

// Game logic
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const userChoice = CHOICES.find(choice => choice.name === choiceName);
        choose(userChoice);
    });
});

function choose(choice) {
    const aichoice = aiChoice();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoice() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
            <div class="choice ${results[idx].name}">
            <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" /> 
            </div>`;
        }, idx * 1000);
    });

    gameDiv.classList.add('hidden');
    resultsDiv.classList.remove('hidden');
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());

        if (userWins) {
            resultText.innerHTML = "You win";
            resultDivs[0].classList.add("winner");
            keepScore(1);
        } else if (aiWins) {
            resultText.innerHTML = "You lose";
            resultDivs[1].classList.add("winner");
            keepScore(-1);
        } else {
            resultText.innerHTML = "Draw";
        }

        resultWinner.classList.remove('hidden');
        resultsDiv.classList.add('show-winner');
    }, 1000);
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function keepScore(point) {
    score += point;
    scoreNumber.innerHTML = score;
}

// Play again logic
playAgainBtn.addEventListener('click', () => {
    gameDiv.classList.remove('hidden');
    resultsDiv.classList.add('hidden');

    resultDivs.forEach(resultDiv => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove('winner');
    });

    resultText.innerText = "";
    resultWinner.classList.add('hidden');
    resultsDiv.classList.remove('show-winner');
});

// Show/Hide Rules Modal
btnRules.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal');
});
btnClose.addEventListener('click', () => {
    modalRules.classList.toggle('show-modal');
});
