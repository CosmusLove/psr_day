const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const modalQuestion = document.getElementById('modalQuestion');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit');

let leftPosition = 97; // Początkowa pozycja z lewej
let bottomPosition = 32; // Początkowa pozycja od dołu

// Ustawienie pocz. pozycji gracza
player.style.left = `${leftPosition}px`;
player.style.bottom = `${bottomPosition}px`;

const questions = {
    transparent1: "(3×4)−(2×6)+(5−4)+(2^3−7)=x",
    transparent3: "Kto dominował w romantyźmie?",
    transparent4: "Opisz, jakie procesy zachodzą w organizmach heterotrofów podczas metabolizmu substratów organicznych, które prowadzą do uwolnienia energii w formie ATP, a także zidentyfikuj końcowy produkt tych procesów, który zostaje wydalony do środowiska.",
};

const correctAnswers = {
    transparent1: "1",
    transparent3: "Mickiewicz",
    transparent4: "Dwutlenek węgla",
};

function showModal(question, item) {
    modalQuestion.textContent = question;
    modal.style.display = "block";
    overlay.style.display = "block";

    submitButton.onclick = () => {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = correctAnswers[item.classList[1]].toLowerCase();

        if (userAnswer === correctAnswer) {
            item.remove(); // Usunięcie obiektu po poprawnej odpowiedzi
            closeModal();
        } else {
            alert("Zła odpowiedź, cofanie gracza na level 1");
            window.location.href = "level1.html";
        }
    };
}

function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
    answerInput.value = ""; // Czyszczenie odpowiedzi
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();

        if (
            playerRect.left < itemRect.left + itemRect.width &&
            playerRect.left + playerRect.width > itemRect.left &&
            playerRect.top < itemRect.top + itemRect.height &&
            playerRect.top + playerRect.height > itemRect.top
        ) {
            const itemClass = item.classList[1];

            if (questions[itemClass]) {
                showModal(questions[itemClass], item);
            }
        }
    });
}

// Nasłuchiwanie klawiszy
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    }
});

function moveLeft() {
    if (leftPosition > 0) {
        leftPosition -= 5;
        player.style.left = `${leftPosition}px`;
        checkCollision();
    }
}

function moveRight() {
    if (leftPosition < (gameArea.clientWidth - 30)) {
        leftPosition += 5;
        player.style.left = `${leftPosition}px`;
        checkCollision();
    }
}

function moveUp() {
    if (bottomPosition < (gameArea.clientHeight - 30)) {
        bottomPosition += 5;
        player.style.bottom = `${bottomPosition}px`;
        checkCollision();
    }
}

function moveDown() {
    if (bottomPosition > 0) {
        bottomPosition -= 5;
        player.style.bottom = `${bottomPosition}px`;
        checkCollision();
    }
}

function showEndScreen() {
    // Tworzenie i stylizacja ciemnego tła
    const darkOverlay = document.createElement('div');
    darkOverlay.style.position = 'fixed';
    darkOverlay.style.top = 0;
    darkOverlay.style.left = 0;
    darkOverlay.style.width = '100%';
    darkOverlay.style.height = '100%';
    darkOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    darkOverlay.style.display = 'flex';
    darkOverlay.style.alignItems = 'center';
    darkOverlay.style.justifyContent = 'center';
    darkOverlay.style.zIndex = 1000;

    // Tworzenie i ustawienie GIF-a na środku ekranu
    const gif = document.createElement('img');
    gif.src = 'images/end.gif'; // Ustaw poprawną ścieżkę do GIF-a
    gif.style.width = '90vw';
    gif.style.height = '90wh';

    // Dodanie GIF-a do ciemnego tła
    darkOverlay.appendChild(gif);
    document.body.appendChild(darkOverlay);

    // Przekierowanie na stronę `koniec.html` po 2 sekundach
    setTimeout(() => {
        window.location.href = 'koniec.html';
    }, 2000);
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemClass = item.classList[1];

        if (
            playerRect.left < itemRect.left + itemRect.width &&
            playerRect.left + playerRect.width > itemRect.left &&
            playerRect.top < itemRect.top + itemRect.height &&
            playerRect.top + playerRect.height > itemRect.top
        ) {
            if (questions[itemClass]) {
                showModal(questions[itemClass], item); // Wywołanie okna modalnego dla pytań
            } else if (itemClass === 'transparent5') {
                showEndScreen(); // Wywołanie ekranu końcowego dla `transparent5`
            }
        }
    });
}

function moveToNewLocation() {
    // Ustal nową pozycję gracza (przykładowo na środek obszaru gry)
    leftPosition = 345; // Pozycja od lewej
    bottomPosition = 0; // Pozycja od dołu

    // Aktualizacja pozycji gracza
    player.style.left = `${leftPosition}px`;
    player.style.bottom = `${bottomPosition}px`;
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemClass = item.classList[1];

        if (
            playerRect.left < itemRect.left + itemRect.width &&
            playerRect.left + playerRect.width > itemRect.left &&
            playerRect.top < itemRect.top + itemRect.height &&
            playerRect.top + playerRect.height > itemRect.top
        ) {
            if (questions[itemClass]) {
                showModal(questions[itemClass], item); // Wywołanie okna modalnego dla pytań
            } else if (itemClass === 'transparent5') {
                showEndScreen(); // Wywołanie ekranu końcowego dla `transparent5`
            } else if (itemClass === 'transparent2') {
                moveToNewLocation(); // Przeniesienie gracza dla `transparent2`
            }
        }
    });
}
