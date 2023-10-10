//***************************************
//********** Connexion à l'API **********
//***************************************
const response = await fetch(`http://localhost:5678/api/works/`);
const data = await response.json();

const gallery = document.querySelector(".gallery");

//***************************************
//Fonction "projectShow" qui permet d'afficher les projets sur la homepage.
function projectShow(tab){
  for (let i = 0; i < tab.length; i++) {
    console.log(data[i]);
    gallery.innerHTML +=
    `
    <figure>
    <img src="${tab[i].imageUrl}" alt="${tab[i].title}">
    <figcaption>${tab[i].title}</figcaption>
    </figure>`
  }
}

projectShow(data)
//---------------------------------------


const filterAll = document.querySelector(".filterAll");
const filterObjects = document.querySelector(".filterObjects");
const filterAppartments = document.querySelector(".filterAppartments");
const filterHotelsAndRestaurants = document.querySelector(".filterHotelsAndRestaurants");

//Annuler les filtres de la gallerie
filterAll.addEventListener("click", () =>{
  gallery.innerHTML = "";
  projectShow(data)
})
//Affiche uniquement la catégorie "objet" dans la gallerie
filterObjects.addEventListener("click", () =>{
  const filterObject = data.filter(elt => elt.category.name === "Objets");
  gallery.innerHTML = "";
  projectShow(filterObject);
})
//Affiche uniquement la catégorie "appartements" dans la gallerie
filterAppartments.addEventListener("click", () =>{
  const filterObject = data.filter(elt => elt.category.name === "Appartements");
  gallery.innerHTML = "";
  projectShow(filterObject);
})
//Affiche uniquement la catégorie "hotel & restaurants" dans la gallerie
filterHotelsAndRestaurants.addEventListener("click", () =>{
  const filterObject = data.filter(elt => elt.category.name === "Hotels & restaurants");
  gallery.innerHTML = "";
  projectShow(filterObject);
})










