const player = document.getElementById('player');
const gameArea = document.getElementById('gameArea');

// Ustawienie początkowej pozycji gracza
let leftPosition = 109; // Początkowa pozycja z lewej
let bottomPosition = 350; // Początkowa pozycja od dołu

// Ustawienie pocz. pozycji gracza na początku gry
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

let chaser = null; // Zmienna do przechowywania goniącego bloku
let chaseInterval = null; // Zmienna do przechowywania interwału

// Funkcja do ruchu gracza
function moveLeft() {
    if (leftPosition > 0) {
        leftPosition -= 5;
        player.style.left = `${leftPosition}px`;
        player.style.backgroundImage = `url(${images.left})`; // Zmiana obrazka na lewy
        checkCollision();
    }
}

function moveRight() {
    if (leftPosition < (gameArea.clientWidth - 30)) {
        leftPosition += 5;
        player.style.left = `${leftPosition}px`;
        player.style.backgroundImage = `url(${images.right})`; // Zmiana obrazka na prawy
        checkCollision();
    }
}

function moveUp() {
    if (bottomPosition < (gameArea.clientHeight - 30)) {
        bottomPosition += 5;
        player.style.bottom = `${bottomPosition}px`;
        player.style.backgroundImage = `url(${images.upDown})`; // Zmiana obrazka na górny
        checkCollision();
    }
}

function moveDown() {
    if (bottomPosition > 0) {
        bottomPosition -= 5;
        player.style.bottom = `${bottomPosition}px`;
        player.style.backgroundImage = `url(${images.upDown})`; // Zmiana obrazka na dolny
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
            playerRect.left < itemRect.left + itemRect.width &&
            playerRect.left + playerRect.width > itemRect.left &&
            playerRect.top < itemRect.top + itemRect.height &&
            playerRect.top + playerRect.height > itemRect.top
        ) {
            // Sprawdzenie klasy klocka
            if (item.classList.contains('transparent')) {
                alert('Czego?! Beatko, kolejny świerzak. Złap go zanim ucieknie wyjście ewakuacyjnym.');
                spawnChaser();
            }
            item.remove(); // Usunięcie przedmiotu po najechaniu
        }
    });
}

// Funkcja do spawnowania goniącego bloku
function spawnChaser() {
    if (chaser) return; // Zapobiega spawnowaniu więcej niż jednego goniącego bloku

    chaser = document.createElement('div');
    chaser.classList.add('chaser');
    chaser.style.left = `${Math.random() * (gameArea.clientWidth - 30)}px`;
    chaser.style.top = `${Math.random() * (gameArea.clientHeight - 30)}px`;
    
    // Ustaw grafikę różowego klocka
    chaser.style.backgroundImage = `url(images/postać/wierzba.png)`; // Ustaw różowy klocek jako obrazek goniącego bloku
    chaser.style.backgroundSize = 'cover'; // Ustaw rozmiar tła na pokrycie

    gameArea.appendChild(chaser);
    chasePlayer();
}
function chasePlayer() {
    chaseInterval = setInterval(() => {
        if (!chaser) return; // Sprawdzenie, czy goniący blok nadal istnieje

        const chaserRect = chaser.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        // Obliczenie różnicy pozycji
        const dx = playerRect.left - chaserRect.left;
        const dy = playerRect.top - chaserRect.top;

        // Obliczenie kierunku
        const distance = Math.sqrt(dx * dx + dy * dy);
        const step = 10; // Zwiększona prędkość goniącego bloku

        // Normalizacja kierunku
        if (distance > 0) {
            const newLeft = chaserRect.left + (dx / distance) * step;
            const newTop = chaserRect.top + (dy / distance) * step;

            // Ograniczenie ruchu goniącego bloku do obszaru gameArea
            if (newLeft >= gameArea.offsetLeft && newLeft <= gameArea.offsetLeft + gameArea.clientWidth - chaserRect.width) {
                chaser.style.left = `${newLeft - gameArea.offsetLeft}px`;
            }
            if (newTop >= gameArea.offsetTop && newTop <= gameArea.offsetTop + gameArea.clientHeight - chaserRect.height) {
                chaser.style.top = `${newTop - gameArea.offsetTop}px`;
            }
        }

        // Sprawdzenie kolizji z graczem
        if (
            playerRect.left < chaserRect.left + chaserRect.width &&
            playerRect.left + playerRect.width > chaserRect.left &&
            playerRect.top < chaserRect.top + chaserRect.height &&
            playerRect.top + playerRect.height > chaserRect.top
        ) {

            // Przełączenie na index3.html
            window.location.href = 'level3.html';

            clearInterval(chaseInterval);
            chaser.remove(); // Usunięcie goniącego bloku po złapaniu
            chaser = null; // Resetowanie odniesienia do goniącego bloku
        }
    }, 100); // Interwał co 100 ms
}

// Funkcja do poruszania gracza
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        moveLeft();
    } else if (event.code === 'ArrowRight') {
        moveRight();
    } else if (event.code === 'ArrowUp') {
        moveUp();
    } else if (event.code === 'ArrowDown') {
        moveDown();
    }
});
