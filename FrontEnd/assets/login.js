/*********************************************************************************
 * Ce fichier gère la logique de connexion de l'utilisateur.
 * Il écoute l'événement 'submit' sur le formulaire de login,
 * récupère les données du formulaire,
 * envoie une requête POST à l'API de login,
 * et gère les réponses et les erreurs.
 *********************************************************************************/

// URL de l'API pour le login
const loginApiUrl = "http://localhost:5678/api/users/login";

// Écoute de l'événement 'submit' sur le formulaire de login
document.querySelector('#login form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Récupération des valeurs des champs du formulaire
    const email = document.querySelector('input[type=email]').value;
    const password = document.querySelector('input[type=password]').value;
    
    // Préparation des données à envoyer
    const payload = {
        email,
        password
    };
    
    // Options de la requête fetch
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };
    
    // Envoi de la requête
    fetch(loginApiUrl, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la connexion. Vérifiez vos identifiants.");
        }
        return response.json();
    })
    .then(data => {
        const { token } = data;
        console.log("Token reçu:", token);
        
        // TODO: Utiliser une méthode plus sécurisée pour stocker le token
        localStorage.setItem("userToken", token);
        localStorage.setItem("accessToken", "true");
        
        // Redirection vers la page d'accueil
        window.location.href = "./index.html";
    })
    .catch(error => {
        console.error("Une erreur s'est produite:", error.message);
        document.querySelector(".errorLogin").textContent = "Erreur lors de la connexion. Vérifiez vos identifiants.";
    });
});
