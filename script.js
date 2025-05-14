const emojis = ["🕹️", "🚗", "🎰", "🎈", "⚽", "🍔", "🎮", "🎵"];
const gameBoard = document.getElementById("gameBoard");
let flippedCards = [];
let lockBoard = false;

function shuffle(array) {
    const copy = [...array, ...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function createCard(emoji) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class="front">?</div>
    <div class="back">${emoji}</div>
  `;

    card.addEventListener("click", () => {
        if (lockBoard || card.classList.contains("flipped")) return;

        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    });

    return card;
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector(".back").textContent;
    const emoji2 = card2.querySelector(".back").textContent;

    if (emoji1 === emoji2) {
        flippedCards = [];
    } else {
        lockBoard = true;
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

function setupGame() {
    const shuffled = shuffle(emojis);
    shuffled.forEach((emoji) => {
        const card = createCard(emoji);
        gameBoard.appendChild(card);
    });
}

setupGame();

document.getElementById("resetBtn").addEventListener("click", () => {
    gameBoard.innerHTML = "";
    setupGame();
});
