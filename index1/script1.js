// 1. On cible tous les boutons de la toolbar
const buttons = document.querySelectorAll('.toolbar button');

// 2. Pour chaque bouton, on ajoute un événement "click"
buttons.forEach(button => {
  button.addEventListener('click', function() {
    
    // 3. On récupère le texte sélectionné par l'utilisateur
    const userSelection = window.getSelection();
    
    // 4. On vérifie si la sélection est vide
    if (userSelection.rangeCount === 0 || userSelection.toString().trim() === '') {
      alert("Sélectionnez du texte avant de cliquer !");
      return; // On arrête la fonction
    }
    
    // 5. On récupère la balise HTML à appliquer (ex: <strong>)
    const tagName = button.getAttribute('data-tag');
    
    // 6. On crée un élément avec cette balise
    const styledElement = document.createElement(tagName);
    styledElement.textContent = userSelection.toString(); // On y met le texte sélectionné
    
    // 7. On remplace la sélection par le nouvel élément
    const selectionRange = userSelection.getRangeAt(0);
    selectionRange.deleteContents(); // On supprime l'ancien texte
    selectionRange.insertNode(styledElement); // On ajoute le nouveau texte stylisé
    
    // 8. On désélectionne pour éviter des bugs visuels
    userSelection.removeAllRanges();
  });
});