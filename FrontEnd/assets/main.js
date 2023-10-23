/*********************************************************************************
 * Ce fichier gère la logique associée à la page index.html.
 * Il comprend des fonctions pour :
 * - Afficher les projets depuis une API
 * - Filtrer ces projets
 * - Gérer le mode d'édition et les modales d'édition
 * - Valider le formulaire de contact
 *********************************************************************************/


// ---------------- AFFICHAGE DES PROJETS ---------------- //
/**
 * Fonction asynchrone pour récupérer et afficher les projets depuis l'API.
 */
async function projectShow(){

  try {
    // Connexion à l'API et récupération des données
    const gallery = document.querySelector(".gallery");
    const response = await fetch(`http://localhost:5678/api/works/`);
    
    if (!response.ok) {
      throw new Error("Erreur réseau ou côté serveur");
    }

    const data = await response.json();

    // Construction et affichage du contenu de la galerie
  let galleryContent = "";
  for (let i = 0; i < data.length; i++) {
    galleryContent +=
    `
    <figure>
    <img src="${data[i].imageUrl}" alt="${data[i].title}">
    <figcaption>${data[i].title}</figcaption>
    </figure>`;
  }
  gallery.innerHTML = galleryContent;

  } catch (error) {
    console.error("Une erreur s'est produite:", error);
  }
}


// ---------------- FILTRE DES PROJETS ---------------- //
/**
 * Fonction asynchrone pour filtrer et afficher les projets.
 * @param {Array} data Tableau des projets filtrés
 */
async function projectShowFilter(data){

  const gallery = document.querySelector(".gallery");

  let galleryContent = "";
  for (let i = 0; i < data.length; i++) {
    galleryContent +=
    `
    <figure>
    <img src="${data[i].imageUrl}" alt="${data[i].title}">
    <figcaption>${data[i].title}</figcaption>
    </figure>`;
  }
  gallery.innerHTML = galleryContent;
}



// ---------------- MODIFICATION DU DOM : MODE EDIT ---------------- //
/**
 * Cette fonction s'exécute lorsque le DOM est complètement chargé.
 * Elle gère le mode d'édition en fonction de la présence d'un token d'accès.
 */
document.addEventListener("DOMContentLoaded", function() {

  let acces = localStorage.getItem("accessToken");

  // Code éxécuté si absence du token : génération des éléments vide
  if (acces == null){
    document.querySelector('.modeEdition').innerHTML = `<div></div>`;
    document.querySelector('.titleEdit').innerHTML = `<div></div>`;
    document.querySelector('header nav ul').innerHTML =`
    <li><a href="index.html#portfolio">Projets</a></li>
		<li><a href="index.html#contact">Contact</a></li>
		<li><a href="./login.html">Login</a></li>
		<li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
    `
  }

  // Code éxécuté si présence du token : génération des éléments completés
  else if (acces = "true") {

    // Création du header édition
    document.querySelector('.modeEdition').innerHTML = 
    `
    <div class="edit-mode">
      <i class="fa-regular fa-pen-to-square"></i>
      <p>Mode édition</p>
    </div>
    `;

    // Création de la zone d'édition à la place des filtres
    document.querySelector('.titleEdit').innerHTML = 
    `
    <h2>Mes Projets</h2>
			<div class="edit">
				<div id="editPortfolio" class="modal-trigger">
					<i class="fa-regular fa-pen-to-square"></i>
					<p>modifier</p>
				</div>
			</div>
    `

    // Suppression de la zone de filtre
    document.querySelector(".filter").style.display = "none";

    // Modification de la navbar
    document.querySelector('header nav ul').innerHTML =`
    <li><a href="index.html#portfolio">Projets</a></li>
		<li><a href="index.html#contact">Contact</a></li>
		<li><a href="index.html" class="logout">Logout</a></li>
		<li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
    `
  }

  // Fonctionnalité "Logout" de la navbar
  document.querySelector(".logout").addEventListener('click', (e) =>{
    localStorage.removeItem('userToken');
    localStorage.removeItem('accessToken');
    location.reload();
  })

  // Appel de la fonction "showModal1" pour générer la première modale d'édition
  document.querySelector("#editPortfolio").addEventListener('click', (e) =>{
    showModal1()
    toggleModal()
  })  
});



// ---------------- CREATION DE LA MODALE 1 ---------------- //
/**
 * Fonction asynchrone qui gère la première modale d'édition.
 * Elle permet de supprimer des projets.
 */
async function showModal1() {
  // Récupérations des données de l'API pour l'affichage des images
  const newresponse = await fetch(`http://localhost:5678/api/works/`);
  const newdata = await newresponse.json();

  // Création du contenu de la modale
  document.querySelector('.edit-1').innerHTML = 
  `
  <img class="close-edit1 modal-trigger" src="./assets/icons/xmark-solid.svg">
  <h2>Galerie photo</h2>
  <div class="img-area">

  </div>
  <div id="btn-area1">
    <button class="modal-trigger modal-trigger2 switchTrigger1">Ajouter une photo</button>
  </div>
  `
  // Création d'une "card" par item du tableau data de l'API
  for (let i = 0; i < newdata.length; i++) {
    const img = newdata[i].imageUrl;
    document.querySelector(".img-area").innerHTML += 
    `
    <div class="img-area-display">
      <img src="${img}" alt="">
      <i id = "${i}" class="fa-solid fa-trash-can trash"></i>
    </div>
    `
    // Fonctionnalité "suppression" des cards
    const allIcons = document.querySelectorAll('.img-area-display i');
    allIcons.forEach((icon, index) => {
      icon.addEventListener("click", ()=>{
        const deleteItem = confirm("Voulez-vous vraiment supprimer ce projet ?")
        if (deleteItem === true) {
          const Token = localStorage.getItem("userToken");
          fetch(`http://localhost:5678/api/works/${newdata[index].id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${Token}`
            },
          })
          .then(data => {
            projectShow();
            toggleModal()
          })
          .catch(error => {
            console.error('Erreur:', error);
          });
        }
      })
    });
  }

  // Fermeture de la modale au click sur la croix
  document.querySelector(".close-edit1").addEventListener("click", ()=>{
    toggleModal()
  })
  // Switch modal1 / modal2
  document.querySelector(".switchTrigger1").addEventListener("click", ()=>{
    toggleModal()
    toggleModal2()
    showModal2()
  })

}



// ---------------- CREATION DE LA MODALE 2 ---------------- //
/**
 * Fonction asynchrone qui gère la deuxième modale d'édition.
 * Elle permet d'ajouter de nouveaux projets.
 */

async function showModal2() {
  // Création du contenu de la modale
  document.querySelector('.modal2').innerHTML = `
    <form class="edit-2">
      <div class="edit-2-icons">
        <i class="fa-solid fa-xmark close-edit2" id="closeEdit-2"></i>
        <i class="fa-solid fa-arrow-left modal-trigger modal-trigger2 switchTrigger2" id="returnEdit-1"></i>
      </div>
      <h2>Ajout photo</h2>
      <div class="upload-box">
        <input type="file" id="imageUpload" accept="image/*">
        <label for="imageUpload" class="upload-label">
          <div class="upload-background"></div>
        </label>
      </div>
      <label for="edit2Title">Titre</label>
      <input type="text" id="edit2Title">
      <label class="label-select" for="edit2Categorie">Catégorie</label>
      <select id="categorySelect" name="categories">
        <option value="1">Objets</option>
        <option value="2">Appartements</option>
        <option value="3">Hôtels & Restaurants</option>
      </select>
      <h3 class="errorFormModal2"></h3>
      <div id="btn-area2">
        <button>Valider</button>
      </div>
    </form>
  `;

  // Switch modal2 / modal1
  document.querySelector(".switchTrigger2").addEventListener("click", () => {
    toggleModal();
    toggleModal2();
    showModal1();
  });

  // Fermeture de la modale au click sur la croix
  document.querySelector(".close-edit2").addEventListener("click", () => {
    toggleModal2();
  });

  // Modification de l'image dans l'input file
  const imageUpload = document.getElementById('imageUpload');
  imageUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const uploadBackground = document.querySelector('.upload-background');
        uploadBackground.style.backgroundImage = `url(${e.target.result})`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Récupération des éléments du formulaire pour envoi à l'API
document.querySelector('.edit-2').addEventListener('submit', (e) => {
  e.preventDefault();

  let titleInput = document.querySelector('#edit2Title');
  let categoryInput = document.querySelector('#categorySelect').value;
  let file = imageUpload.files[0];
  const Token = localStorage.getItem("userToken");
  const formData = new FormData();
  
  // Vérification des champs du formulaire
  if (!titleInput.value || !categoryInput || !file) {
    document.querySelector(".errorFormModal2").textContent = "Erreur lors de l'envoi. Informations manquantes.";
    return;  // Sort de la fonction pour empêcher l'envoi du formulaire
  }

  formData.append('image', file);
  formData.append('title', titleInput.value);
  formData.append('category', categoryInput);

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${Token}`
    },
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.json();  // Si le statut est OK, retourne le JSON
    } else {
      throw new Error('Erreur réseau ou côté serveur');  // Sinon, génère une erreur
    }
  })
  .then(data => {
    alert('Formulaire envoyé avec succès !');
    location.reload();
  })
  .catch(error => {
    console.error('Erreur:', error);
    alert('Échec de l\'envoi du formulaire');
  });
  });

}



// ---------------- GENERATION DES PROJETS ---------------- //
/**
 * Fonction asynchrone qui récupère les projets depuis l'API et les affiche sur la page.
 */
let data; 
fetch(`http://localhost:5678/api/works/`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la connexion. Vérifiez vos identifiants.");
        }
        return response.json();
    })
    .then(dataIn => {
      data = dataIn;
    })


projectShow();
const gallery = document.querySelector(".gallery");

//Annuler les filtres de la gallerie
document.querySelector(".filterAll").addEventListener("click", () =>{
  gallery.innerHTML = "";
  projectShow();
});


//Affiche uniquement la catégorie "objet" dans la gallerie
document.querySelector(".filterObjects").addEventListener("click", async () =>{
  const newresponse = await fetch(`http://localhost:5678/api/works/`);
  const newdata = await newresponse.json();
  const filterObject = newdata.filter(elt => elt.category.name === "Objets");
  gallery.innerHTML = "";
  projectShowFilter(filterObject);
});


//Affiche uniquement la catégorie "appartements" dans la gallerie
document.querySelector(".filterAppartments").addEventListener("click", async () =>{
  const newresponse = await fetch(`http://localhost:5678/api/works/`);
  const newdata = await newresponse.json(); 
  const filterObject = newdata.filter(elt => elt.category.name === "Appartements");
  
  gallery.innerHTML = "";
  projectShowFilter(filterObject);
});


//Affiche uniquement la catégorie "hotel & restaurants" dans la gallerie
document.querySelector(".filterHotelsAndRestaurants").addEventListener("click", async () =>{
  const newresponse = await fetch(`http://localhost:5678/api/works/`);
  const newdata = await newresponse.json(); 
  const filterObject = newdata.filter(elt => elt.category.name === "Hotels & restaurants");
  gallery.innerHTML = "";
  projectShowFilter(filterObject);
});




// ---------------- REGEX CONTACT FORM ---------------- //
/**
 * Fonction qui valide le formulaire de contact en utilisant une expression régulière pour l'email.
 */

const contactMsg = document.querySelector(".contactMsg");

document.querySelector(".contactForm").addEventListener("submit", () =>{
  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
  if (!regex.test(email)) {
    contactMsg.textContent = "Veuillez entrer une adresse e-mail valide.";
    event.preventDefault(); // Empêche la soumission du formulaire
    console.log("pas ok");
    emailInput.style.border = "2px solid red";
  } else {
    // Reset le style et le message d'erreur si l'email est valide
    emailInput.style.border = "none"; // ou autre style par défaut
    contactMsg.textContent = "";
  }
});



// ---------------- Trigger modales ---------------- //
/**
 * Fonctions qui gèrent l'ouverture et la fermeture des modales.
 */

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
  modalContainer.classList.toggle("active")
}


const modalContainer2 = document.querySelector(".modal-container2");
const modalTriggers2 = document.querySelectorAll(".modal-trigger2");

modalTriggers2.forEach(trigger2 => trigger2.addEventListener("click", toggleModal2))

function toggleModal2(){
  modalContainer2.classList.toggle("active")
}