
document.addEventListener("DOMContentLoaded", function() {
  // Votre code ici sera exécuté après que le DOM soit complètement chargé
  let acces = localStorage.getItem("coolacces");
  console.log(acces);

  
  if (acces == null){
    console.log('ok');
    document.querySelector('.modeEdition').innerHTML = `<div></div>`;
    document.querySelector('.titleEdit').innerHTML = `<div></div>`;
  }

  else if (acces = "true") {
    document.querySelector('.modeEdition').innerHTML = 
    `
    <div class="edit-mode">
      <i class="fa-regular fa-pen-to-square"></i>
      <p>Mode édition</p>
    </div>
    `;
    document.querySelector('.titleEdit').innerHTML = 
    `
    <h2>Mes Projets</h2>
			<div class="edit">
				<div id="editPortfolio">
					<i class="fa-regular fa-pen-to-square"></i>
					<p>modifier</p>
				</div>
			</div>
    `
  }
  document.querySelector("#editPortfolio").addEventListener('click', (e) =>{
    showModal1(data)
  })

  
  
});

async function showModal1(data) {
  


  document.querySelector('.edit-1').innerHTML = 
  `
  <i class="fa-solid fa-xmark" id="closeEdit-1"></i>
  <h2>Galerie photo</h2>
  <div class="img-area">
    
  </div>
  <div class="btn-area">
    <p>Ajouter une photo</p>
  </div>
  `
  for (let i = 0; i < data.length; i++) {
    const img = data[i].imageUrl;
    document.querySelector(".img-area").innerHTML += 
    `
    <div class="img-area-display">
      <img src="${img}" alt="">
      <i id = trash-${i} class="fa-solid fa-trash-can trash"></i>
    </div>
    `
    
    console.log(img);
    
  }

  document.querySelector('.edit-1').style.display = "block"
}

//***************************************
//********** Connexion à l'API **********
//***************************************
const response = await fetch(`http://localhost:5678/api/works/`);
const data = await response.json();

const gallery = document.querySelector(".gallery");

//***************************************

/**
 * Fonction "projectShow" qui permet d'afficher les projets sur la homepage.
 * @param {Array} tab Tableau des projets
 */
function projectShow(tab){
  let galleryContent = "";
  for (let i = 0; i < tab.length; i++) {
    // console.log(data[i]);
    galleryContent +=
    `
    <figure>
    <img src="${tab[i].imageUrl}" alt="${tab[i].title}">
    <figcaption>${tab[i].title}</figcaption>
    </figure>`;
  }
  gallery.innerHTML = galleryContent;
}

projectShow(data);
//---------------------------------------


//Annuler les filtres de la gallerie
document.querySelector(".filterAll").addEventListener("click", () =>{
  gallery.innerHTML = "";
  projectShow(data);
});
//Affiche uniquement la catégorie "objet" dans la gallerie
document.querySelector(".filterObjects").addEventListener("click", () =>{
  const filterObject = data.filter(elt => elt.category.name === "Objets");
  gallery.innerHTML = "";
  projectShow(filterObject);
});
//Affiche uniquement la catégorie "appartements" dans la gallerie
document.querySelector(".filterAppartments").addEventListener("click", () =>{
  const filterObject = data.filter(elt => elt.category.name === "Appartements");
  gallery.innerHTML = "";
  projectShow(filterObject);
});
//Affiche uniquement la catégorie "hotel & restaurants" dans la gallerie
document.querySelector(".filterHotelsAndRestaurants").addEventListener("click", () =>{
  const filterObject = data.filter(elt => elt.category.name === "Hotels & restaurants");
  gallery.innerHTML = "";
  projectShow(filterObject);
});


