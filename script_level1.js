const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');

// Ustawienie początkowej pozycji gracza
let leftPosition = 90; // Początkowa pozycja z lewej
let bottomPosition = 90; // Początkowa pozycja od dołu

// Ustawienie pozycji gracza na początku gry
player.style.left = `${leftPosition}px`;
player.style.bottom = `${bottomPosition}px`;

// Ustawienia obrazów dla kierunków
const images = {
    default: 'images/postać/przod.png',        // Domyślny obrazek
    upDown: 'images/postać/przod.png',    // Obrazek dla strzałek w górę i w dół
    left: 'images/postać/lewo.png',           // Obrazek dla strzałki w lewo
    right: 'images/postać/prawo.png',         // Obrazek dla strzałki w prawo
};

// Ustawienie domyślnego obrazka na przód
player.style.backgroundImage = `url(${images.default})`;

function updatePlayerImage(direction) {
    player.style.backgroundImage = `url(${images[direction]})`;
}

function moveLeft() {
    if (leftPosition > 0) {
        leftPosition -= 5;
        player.style.left = `${leftPosition}px`;
        updatePlayerImage('left'); // Zmiana obrazka na lewy
        checkCollision();
    }
}

function moveRight() {
    if (leftPosition < (gameArea.clientWidth - 30)) { // Upewnij się, że nie wychodzi poza granice
        leftPosition += 5;
        player.style.left = `${leftPosition}px`;
        updatePlayerImage('right'); // Zmiana obrazka na prawy
        checkCollision();
    }
}

function moveUp() {
    if (bottomPosition < (gameArea.clientHeight - 30)) {
        bottomPosition += 5;
        player.style.bottom = `${bottomPosition}px`;
        updatePlayerImage('upDown'); // Zmiana obrazka na górny
        checkCollision();
    }
}

function moveDown() {
    if (bottomPosition > 0) {
        bottomPosition -= 5;
        player.style.bottom = `${bottomPosition}px`;
        updatePlayerImage('upDown'); // Zmiana obrazka na dolny
        checkCollision();
    }
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const itemRect = item.getBoundingClientRect();

        // Sprawdzenie kolizji
        if (
            playerRect.left < itemRect.right &&
            playerRect.right > itemRect.left &&
            playerRect.top < itemRect.bottom &&
            playerRect.bottom > itemRect.top
        ) {
            alert('Witamy w PSR, jeszcze nie wiesz na co się piszesz wchodząc tu');
            window.location.href = 'level2.html'; 
            item.remove(); // Usunięcie klocek po najechaniu
        }
    });
}

document.addEventListener('keydown', (event) => {
    switch (event.code) {
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
