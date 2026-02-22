// Selecting DOM Elements
const difficultyButtons = document.querySelectorAll(".diff-btn");
const difficultySection = document.getElementById("difficultySection");
const gameArea = document.getElementById("gameArea");
const maxNumberSpan = document.getElementById("maxNumber");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const attemptsSpan = document.getElementById("attempts");
const bestScoreSpan = document.getElementById("bestScore");
const playAgainBtn = document.getElementById("playAgainBtn");
const homeBtn = document.getElementById("homeBtn");

let randomNumber, maxNumber, attempts, bestScore;

// Start Game after selecting difficulty
difficultyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        maxNumber = parseInt(btn.dataset.max);                  // Set max number from button
        randomNumber = Math.floor(Math.random() * maxNumber) + 1; // Generate random number
        attempts = 0;
        attemptsSpan.textContent = attempts;                   // Reset attempts
        maxNumberSpan.textContent = maxNumber;                // Update UI
        message.textContent = "";
        guessInput.value = "";
        difficultySection.style.display = "none";             // Hide difficulty section
        gameArea.style.display = "block";                     // Show game area
        guessInput.focus();
    });
});

// Submit Guess
submitBtn.addEventListener("click", () => {
    const guess = parseInt(guessInput.value);                // Get user guess
    if (!guess || guess < 1 || guess > maxNumber) {
        message.textContent = `Enter a number between 1 and ${maxNumber}!`;
        return;
    }

    attempts++;
    attemptsSpan.textContent = attempts;

    if (guess === randomNumber) {
        message.textContent = ` Correct! The number was ${randomNumber}`;
        if (!bestScore || attempts < bestScore) bestScore = attempts;
        bestScoreSpan.textContent = bestScore;
    } else if (guess < randomNumber) {
        message.textContent = "⬆ Too low! Try again.";
    } else {
        message.textContent = "⬇ Too high! Try again.";
    }

    guessInput.value = "";
    guessInput.focus();
});

// Play Again Button
playAgainBtn.addEventListener("click", () => {
    randomNumber = Math.floor(Math.random() * maxNumber) + 1; // New number
    attempts = 0;
    attemptsSpan.textContent = attempts;
    message.textContent = "";
    guessInput.value = "";
    guessInput.focus();
});

// Change Difficulty Button
homeBtn.addEventListener("click", () => {
    gameArea.style.display = "none";
    difficultySection.style.display = "block";
});