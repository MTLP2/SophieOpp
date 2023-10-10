//***************************************
//********** Connexion à l'API **********
//***************************************
const response = await fetch(`http://localhost:5678/api/works/`);
const data = await response.json();

const gallery = document.querySelector(".gallery");

//***************************************
//Fonction "projectShow" qui permet d'afficher les projets sur la homepage.
function projectShow(){
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    gallery.innerHTML +=
    `
    <figure>
      <img src="${data[i].imageUrl}" alt="${data[i].title}">
      <figcaption>${data[i].title}</figcaption>
    </figure>`
  }
}
projectShow()
//***************************************

