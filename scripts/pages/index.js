import { recettesTemplate } from "../templates/recettes.js";
let searchFilter = {};
async function getRecettes() {
  const recipes = await fetch("data/recipes.json");
  if (recipes.ok === true) {
    return recipes.json();
  }
  throw new error("erreur serveur");
}
const { recipes } = await getRecettes();
async function init() {
  //réinitialisation de la bar de recherche
  const inputSearch = document.getElementById("search");
  inputSearch.value = "";
  // Récupère les datas
  const listIngredient = await getListeIngredient();
  const listAppareil = await getListAppareil();
  const listUstensile = await getListUstensile();
  //resultat function affichage des menu
  displayData(recipes);
  // affichageFilter(selectedIngredient);
  //resultat de filtre dans la bar de recherche principale
  getTriRecette(recipes);
  // filterElements(recipes);
  //les functions filtre ingredient
  createIngredient(listIngredient);
  filterIngredient(listIngredient);
  selectIngredient(recipes);
  //filtre appareils
  createAppareil(listAppareil);
  filterAppareil(listAppareil);
  selectAppareil(recipes);
  //filtre ustensile
  createUtensile(listUstensile);
  filterUstensile(listUstensile);
  selectUstensile(recipes);
}
init();

//DOM élements
const main = document.getElementById("main");
const menuSection = document.querySelector(".restaurant-section");
const blockSection = document.querySelector(".section-page");
const contentSelect = document.querySelector(".content-select");
//function d'affichage des recettes
async function displayData(recipes) {
  blockSection.innerHTML = "";
  recipes.forEach((recettes) => {
    const recetteArticle = recettesTemplate(recettes);
    const userCard = recetteArticle.getCardDOM();
    blockSection.appendChild(userCard);
    menuSection.appendChild(blockSection);
    main.appendChild(menuSection);
  });
}

// function de filtre dans la bar de recherche

async function getTriRecette(recipes) {
  //DOM bar de recherche
  const form = document.getElementById("myForm");
  const inputSearch = document.getElementById("search");
  //ecouter l'evenement dans l'input
  inputSearch.addEventListener("keyup", (event) => {
    //filtré les recettes et contenir les résultats dans une variable
    const newRecipes = recipes.filter((recipe) => {
      return (
        //filtrer dans les name
        recipe.name.toLowerCase().includes(event.target.value) ||
        // filtrer dans les description
        recipe.description.toLowerCase().includes(event.target.value) ||
        // filtrer dans les ingredients
        recipe.ingredients
          .map((ingredient) => {
            return ingredient.ingredient
              .toLowerCase()
              .includes(event.target.value);
          })
          .includes(true)
      );
    });
    //affichage des resultats
    displayData(newRecipes);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
}

//affichage et filtre des ingrédients
//DOM ingredient
const resultIngredient = document.querySelector(".dropdown-menuListe");
const inputIngredient = document.getElementById("search1");

//function pour afficher les ingrédient
function createIngredient(ingredients) {
  resultIngredient.innerHTML = "";

  ingredients.forEach((ingredient) => {
    const listIngredient = document.createElement("li");
    listIngredient.setAttribute("class", "dropdown-item");
    listIngredient.innerHTML = `<li class="dropdown-item" >${ingredient}</li> `;

    resultIngredient.appendChild(listIngredient);
  });
}

const selectResult = document.querySelector(".resultat-filtre-wrapper");

async function affichageFilter(selectedIngredients) {
  selectResult.innerHTML = "";

  selectedIngredients.forEach((ingredient) => {
    const spanIngredient = document.createElement("div");
    spanIngredient.setAttribute("class", "resultat-filtre");
    spanIngredient.innerHTML = `<div>${ingredient}</div>`;
    selectResult.appendChild(spanIngredient);
  });
}

// cette function selectionne un ingredient dans la liste
// et revoie que les menus qui comporte cette dernière
function addIngredientsToFilter(ingredient) {
  if (!searchFilter.ingredients) searchFilter.ingredients = [ingredient];
  else searchFilter.ingredients.push(ingredient);
}

function searchRecipes() {
  return recipes.filter((recipe) => {
    return searchFilter.ingredients.forEach((searchIngredient, index) => {
      let ingredientExist = false;
      recipe.ingredients.forEach((ingredient) => {
        if (searchIngredient == ingredient.ingredient) {
          ingredientExist = true;
        }
      });
      if (!ingredientExist) {
        return false;
      }
      if (searchFilter.ingredients.length - 1 == index) {
        return true;
      }
    });
  });
}

function selectIngredient(recipes) {
  resultIngredient.addEventListener("click", (event) => {
    // console.log(ingredient);.push(event.target.textContent);
    addIngredientsToFilter(event.target.textContent);
    const newrecipes = recipes.filter((recipe) => {
      return (
        // filtrer dans les ingredients
        recipe.ingredients
          .map((ingredient) => {
            return searchFilter.ingredients
              .map((el) => {
                return ingredient.ingredient.includes(el);
              })
              .includes(true);
          })
          .includes(true)
      );
    });
    displayData(newrecipes);
    affichageFilter(searchFilter.ingredients);
    console.log(searchRecipes());
  });
}
//function qui renvoie la liste des ingredients
//sans doublons
async function getListeIngredient() {
  const { recipes } = await getRecettes();
  const liste = [];
  recipes.map((el) => {
    el.ingredients.forEach((ingredient) => {
      if (!liste.includes(ingredient.ingredient)) {
        liste.push(ingredient.ingredient);
      }
    });
  });
  return liste;
}

// function qui filtre les valeurs taper dans l'input
function filterIngredient(ingredients) {
  inputIngredient.addEventListener("input", (event) => {
    const resulFilteredMenu = ingredients.filter((ingredient) => {
      return ingredient
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    createIngredient(resulFilteredMenu);
  });
}

//affichage et filtre les appareils
//DOM appareil
const resultAppareil = document.querySelector(".dropdown-menuListe2");
const inputAppareil = document.getElementById("search2");

//function pour afficher les appareils
function createAppareil(appliance) {
  resultAppareil.innerHTML = "";

  appliance.forEach((appareil) => {
    const listAppareil = document.createElement("li");
    listAppareil.setAttribute("class", "dropdown-item");
    listAppareil.innerHTML = `<li class="dropdown-item" >${appareil}</li> `;

    resultAppareil.appendChild(listAppareil);
  });
}

// cette function selectionne un appareil dans la liste
// et revoie que les menus qui comporte cette dernière

function addAppareilToFilter(appareil) {
  if (!searchFilter.appliance) searchFilter.appliance = [appareil];
  else searchFilter.appliance.push(appareil);
}

const selcSection = document.querySelector("resultat-filtre");
function selectAppareil(recipes) {
  resultAppareil.addEventListener("click", (event) => {
    addAppareilToFilter(event.target.textContent);
    const newrecipes = recipes.filter((recipe) => {
      return recipe.appliance.includes(event.target.textContent);
    });

    displayData(newrecipes);
  });
}
//function qui renvoie la liste des appareils
//sans doublons
async function getListAppareil() {
  const { recipes } = await getRecettes();
  const allAppareils = [];

  for (let i = 0; i < recipes.length; i++) {
    let appareils = recipes[i].appliance;
    allAppareils.push(appareils);
  }
  return allAppareils;
}

// function qui filtre les valeurs taper dans l'input
function filterAppareil(appliance) {
  inputAppareil.addEventListener("input", (event) => {
    const resulFilteredMenu = appliance.filter((appareil) => {
      return appareil.toLowerCase().includes(event.target.value.toLowerCase());
    });

    createAppareil(resulFilteredMenu);
  });
}

//affichage et filtre des ingrédients
//DOM ingredient
const resultUstensile = document.querySelector(".dropdown-menuListe3");
const inputUstensile = document.getElementById("search3");

//function pour afficher les ingrédient
function createUtensile(ustensils) {
  resultUstensile.innerHTML = "";

  ustensils.forEach((ustensil) => {
    ustensil.forEach((ustensile) => {
      const listUstensile = document.createElement("li");
      listUstensile.setAttribute("class", "dropdown-item");
      listUstensile.innerHTML = `<li class="dropdown-item" >${ustensile}</li> `;

      resultUstensile.appendChild(listUstensile);
    });
  });
}

// cette function selectionne un ingredient dans la liste
// et revoie que les menus qui comporte cette dernière
function selectUstensile(recipes) {
  resultUstensile.addEventListener("click", (event) => {
    const newrecipes = recipes.filter((recipe) => {
      return recipe.ustensils.includes(event.target.textContent);
    });
    displayData(newrecipes);
  });
}
//function qui renvoie la liste des ustensils
//sans doublons
async function getListUstensile() {
  const { recipes } = await getRecettes();
  const liste = [];
  recipes.map((el) => {
    el.ustensils;

    if (!liste.includes(el.ustensils)) {
      liste.push(el.ustensils);
    }
  });
  return liste;
}

// function qui filtre les valeurs taper dans l'input
function filterUstensile(ustensils) {
  inputUstensile.addEventListener("input", (event) => {
    const resulFilteredMenu = ustensils.filter((ustensil) => {
      return ustensil.includes(event.target.value);
    });

    createUtensile(resulFilteredMenu);
  });
}

// function orderIngredient() {
//   //tri dans le tableau des ingredient
//   const orderedIngredient = el.ingredient.sort((a, b) => {
//     if (a.el.ingredient.tolowerCase() < b.el.ingredient.toLowerCase()) {
//       return -1;
//     }
//     if (a.el.ingredient.tolowerCase() == b.el.ingredient.toLowerCase()) {
//       return 1;
//     }
//     return 0;
//   });
//   return orderedIngredient;
// }

// function de filtre dans la bar de recherche solution (02)
// const form = document.getElementById("myForm");
// const inputSearch = document.getElementById("search");

// function filterElements(recipes) {
//   inputSearch.addEventListener("input", (e) => {
//     const searchedLetters = e.target.value;
//     const resultR = recipes.filter((recettes) => {
//       if (recettes.name.length > 3) {
//         for (let i = 0; i < recettes.name.length; i++) {
//           if (recettes.name.toLowerCase().includes(searchedLetters)) {
//             return recettes.name;
//           } else {
//             return (recettes.name = "");
//           }
//         }
//       }

//       if (recettes.description.length > 3) {
//         for (let i = 0; i < recettes.description.length; i++) {
//           if (recettes.description.toLowerCase().includes(searchedLetters)) {
//             return recettes.description;
//           } else {
//             return (recettes.description = "");
//           }
//         }
//       }
//     });
//     displayData(resultR);
//   });
// }
