// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const restartButton = document.getElementById('restart');
    const scoreDisplay = document.getElementById('score');
    const triesDisplay = document.getElementById('tries');
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let score = 0;
    let tries = 0;

    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const duplicatedCardValues = [...cardValues, ...cardValues];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(value) {
        const card = document.createElement('div');
        card.classList.add('card');
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        const front = document.createElement('div');
        front.classList.add('front');
        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = value;

        cardInner.appendChild(front);
        cardInner.appendChild(back);
        card.appendChild(cardInner);
        card.dataset.value = value;

        card.addEventListener('click', flipCard);
        return card;
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                tries++;
                triesDisplay.textContent = tries;
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];

        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
            score++;
            scoreDisplay.textContent = score;
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];

        if (matchedCards.length === cards.length) {
            alert(`You won! Your score: ${score} with ${tries} tries.`);
        }
    }

    function restartGame() {
        gameBoard.innerHTML = '';
        cards = [];
        flippedCards = [];
        matchedCards = [];
        score = 0;
        tries = 0;
        scoreDisplay.textContent = score;
        triesDisplay.textContent = tries;

        shuffle(duplicatedCardValues);

        duplicatedCardValues.forEach(value => {
            const card = createCard(value);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    restartButton.addEventListener('click', restartGame);

    restartGame();
});