// 🎯 Récupération des éléments HTML du jeu
const bins = {
    recycling: document.getElementById('recycling-bin'), // Poubelle pour le recyclage
    compost: document.getElementById('compost-bin'),     // Poubelle pour le compost
    trash: document.getElementById('trash-bin')          // Poubelle pour les déchets
};

// 🔠 Autres éléments de l’interface utilisateur
const itemDisplay = document.getElementById('item-to-sort');      // Affiche l’emoji à trier
const scoreDisplay = document.getElementById('score');            // Affiche le score
const livesDisplay = document.getElementById('lives');            // Affiche les vies restantes
const timerDisplay = document.getElementById('timer');            // Affiche le temps restant
const messageDisplay = document.getElementById('message');        // Message "Correct !" ou "Faux !"
const winScreen = document.getElementById('win-screen');          // Écran de victoire
const gameOverDisplay = document.getElementById('game-over');     // Écran de défaite
const restartBtn = document.getElementById('restart-btn');        // Bouton pour recommencer le jeu

// 🗑️ Liste des objets à trier, avec leur bonne catégorie
const items = [
    { emoji: '🍎', category: 'compost' },     // Pomme → compost
    { emoji: '🥫', category: 'recycling' },   // Boîte → recyclage
    { emoji: '📰', category: 'recycling' },   // Journal → recyclage
    { emoji: '🍌', category: 'compost' },     // Banane → compost
    { emoji: '🧃', category: 'recycling' },   // Brique → recyclage
    { emoji: '🚬', category: 'trash' },       // Cigarette → poubelle
    { emoji: '💡', category: 'trash' },       // Ampoule → poubelle
    { emoji: '🥡', category: 'trash' }        // Boîte repas → poubelle
];

// 🔁 Variables du jeu
let currentItem;        // Objet actuel à trier
let score = 0;          // Score du joueur
let lives = 3;          // Nombre de vies
let timeLeft = 60;      // Temps total en secondes
let timer;              // Intervalle de temps
let gameActive = true;  // État du jeu (actif ou non)

// ▶️ Démarrer ou redémarrer une partie
function startGame() {
    score = 0;                          // Réinitialise le score
    lives = 3;                          // Réinitialise les vies
    timeLeft = 60;                      // Réinitialise le temps
    gameActive = true;                 

    // Met à jour les éléments visuels
    scoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Vies: ${'❤️'.repeat(lives)}`;
    timerDisplay.textContent = `Temps restant: ${timeLeft}`;
    messageDisplay.textContent = "";                  
    winScreen.style.display = "none";              
    gameOverDisplay.style.display = "none";        

    nextItem(); // Choisir le premier objet à trier
    timer = setInterval(updateTimer, 1000); // Lancer le compte à rebours (1 sec)
}

// 🎲 Sélectionner un objet aléatoire à trier
function nextItem() {
    const randomIndex = Math.floor(Math.random() * items.length); // Nombre aléatoire
    currentItem = items[randomIndex];                             // Objet choisi
    itemDisplay.textContent = currentItem.emoji;                  // Affiche l’emoji
}

// ⏱️ Mise à jour du minuteur
function updateTimer() {
    if (!gameActive) return; // Si le jeu est fini, ne rien faire

    timeLeft--; // Réduit le temps de 1 seconde
    timerDisplay.textContent = `Temps restant: ${timeLeft}`;

    if (timeLeft <= 0) {
        endGame(false); // Fin du jeu si le temps est écoulé
    }
}

// ✅ Vérifie si l’objet est trié correctement
function checkSort(binCategory) {
    if (!gameActive) return; // Ne rien faire si le jeu est terminé

    if (binCategory === currentItem.category) {
        // Bonne réponse
        score++; 
        scoreDisplay.textContent = `Score: ${score}`;
        messageDisplay.textContent = "Correct ! +1 point";
        messageDisplay.className = "correct";

        // Animation rapide
        itemDisplay.style.transform = "scale(1.2)";
        setTimeout(() => itemDisplay.style.transform = "scale(1)", 300);

        // Vérifie si le joueur a gagné
        if (score >= 15) {
            endGame(true); // Victoire
        }
    } else {
        // Mauvaise réponse
        score = Math.max(0, score - 1); // Empêche un score négatif
        lives--;
        scoreDisplay.textContent = `Score: ${score}`;
        livesDisplay.textContent = `Vies: ${'❤️'.repeat(lives)}`;
        messageDisplay.textContent = "Faux ! -1 point et -1 vie";
        messageDisplay.className = "wrong";

        // Animation sur la mauvaise poubelle
        bins[binCategory].style.transform = "scale(0.9)";
        setTimeout(() => bins[binCategory].style.transform = "scale(1)", 300);

        // Vérifie si le joueur a perdu
        if (lives <= 0) {
            endGame(false); // Défaite
        }
    }

    nextItem(); // Nouveau tour
}

// 🛑 Fonction qui termine le jeu
function endGame(isWin) {
    gameActive = false;      // Le jeu n'est plus actif
    clearInterval(timer);    // Arrête le minuteur

    if (isWin) {
        winScreen.style.display = "block"; // Affiche "vous avez gagné"
    } else {
        gameOverDisplay.style.display = "block"; // Affiche "Game Over"
    }
}

// 🖱️ Ajouter les clics pour chaque poubelle
Object.entries(bins).forEach(([category, element]) => {
    element.addEventListener('click', () => checkSort(category)); // Clique → vérifie le tri
});

// 🔁 Redémarrer quand on clique sur "Rejouer"
restartBtn.addEventListener('click', startGame);

// 🚀 Lancer une partie automatiquement au début
startGame();
