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










