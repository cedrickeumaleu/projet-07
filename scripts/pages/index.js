import { recettesTemplate } from "../templates/recettes.js";
// objet dans le quel est stocké les élements sous forme de tableau filtré
let searchFilter = {
  ingredients: [],
  appliances: [],
  ustensils: [],
  keyword: "",
};
//récupération des données vial methode fetch
async function getRecettes() {
  const recipes = await fetch("data/recipes.json");
  if (recipes.ok === true) {
    return recipes.json();
  }
  throw new error("erreur serveur");
}
//stockage des données
const { recipes } = await getRecettes();
async function init() {
  const listIngredient = await getListeIngredient();
  const listAppareil = await getListAppareil();
  const listUstensile = await getListUstensile();
  //resultat function affichage des menu
  displayData(recipes);

  // filtre ingredient
  createIngredient(listIngredient);
  filterIngredient(listIngredient);
  resultIngredient.addEventListener("click", function (e) {
    addIngredientsToFilter(e.target.textContent);
    searchRecipes();
  });
  //filtre appareils
  createAppareil(listAppareil);
  filterAppareil(listAppareil);
  resultAppareil.addEventListener("click", function (e) {
    addAppareilToFilter(e.target.textContent);
    searchRecipes();
  });
  //filtre ustensile
  createUtensile(listUstensile);
  filterUstensile(listUstensile);
  resultUstensile.addEventListener("click", function (e) {
    addUstensilToFilter(e.target.textContent);
    searchRecipes();
  });
  // recherche dans la bar principale
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", function (e) {
    if (e.target.value.length >= 3) {
      searchFilter.keyword = e.target.value;
    } else {
      searchFilter.keyword = "";
    }
    searchRecipes();
  });
  //réinitialisation de la bar de recherche
  searchInput.value = "";
}
init();

//DOM élements
const main = document.getElementById("main");
const menuSection = document.querySelector(".restaurant-section");
const blockSection = document.querySelector(".section-page");
//affichage des recettes
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

//affichages nombres de recettes
const totalRecettes = document.querySelector(".nombre-plats");
let sommeRecettes = 0;
recipes.forEach((recipe) => {
  let dataId = [];
  for (let i = 0; i < dataId.length; i++) {
    dataId[i];
  }
  sommeRecettes = dataId.length + recipe.id;
});
totalRecettes.innerHTML = `${sommeRecettes} RECETTES`;

// creation des listes d'ustensils pour effectué le trie
const resultIngredient = document.querySelector(".dropdown-menuListe");
function createIngredient(ingredients) {
  resultIngredient.innerHTML = "";
  ingredients.forEach((ingredient) => {
    const listIngredient = document.createElement("li");
    listIngredient.setAttribute("class", "dropdown-item");
    listIngredient.innerHTML = `${ingredient}`;
    resultIngredient.appendChild(listIngredient);
  });
}

// creation des listes d'appareils pour effectué le trie
const resultAppareil = document.querySelector(".dropdown-menuListe2");
function createAppareil(appliance) {
  resultAppareil.innerHTML = "";
  appliance.forEach((appareil) => {
    const listAppareil = document.createElement("li");
    listAppareil.setAttribute("class", "dropdown-item");
    listAppareil.innerHTML = `${appareil}`;
    resultAppareil.appendChild(listAppareil);
  });
}

//creation des listes d'ustensils pour effectué le trie
const resultUstensile = document.querySelector(".dropdown-menuListe3");
function createUtensile(ustensils) {
  resultUstensile.innerHTML = "";
  ustensils.forEach((ustensil) => {
    ustensil.forEach((ustensile) => {
      const listUstensile = document.createElement("li");
      listUstensile.setAttribute("class", "dropdown-item");
      listUstensile.innerHTML = `${ustensile}`;
      resultUstensile.appendChild(listUstensile);
    });
  });
}

// afficharge des recettes filtrées
const selectResult = document.querySelector(".resultat-filtre-wrapper");
function affichageFilter() {
  selectResult.innerHTML = "";
  const allFilter = Object.values(searchFilter).flat();
  allFilter.pop();
  allFilter.forEach((filter) => {
    const divIngredient = document.createElement("div");
    const closedIngredient = document.createElement("i");
    const spanIngredient = document.createElement("span");
    closedIngredient.setAttribute("class", "fa-solid fa-xmark");
    divIngredient.setAttribute("class", "resultat-filtre");
    spanIngredient.innerHTML = `${filter}`;
    divIngredient.appendChild(spanIngredient);
    divIngredient.appendChild(closedIngredient);
    selectResult.appendChild(divIngredient);
    closedIngredient.addEventListener("click", function (e) {
      const value = e.target.parentElement.firstChild.innerText;
      const index = searchFilter.ingredients.indexOf(value);
      if (index !== -1) {
        searchFilter.ingredients.splice(index, 1);
      }
      e.target.parentElement.remove();
      searchRecipes();
    });
  });
}

// function affichageFilterAppareil() {
//   selectResult.innerHTML = "";
//   const allFilter = Object.values(searchFilter).flat();
//   allFilter.pop();
//   allFilter.forEach((filter) => {
//     const divAppareil = document.createElement("div");
//     const closedAppareil = document.createElement("i");
//     const spanAppareil = document.createElement("span");
//     closedAppareil.setAttribute("class", "fa-solid fa-xmark");
//     divAppareil.setAttribute("class", "resultat-filtre");
//     spanAppareil.innerHTML = `${filter}`;
//     divAppareil.appendChild(spanAppareil);
//     divAppareil.appendChild(closedAppareil);
//     selectResult.appendChild(divAppareil);
//     closedAppareil.addEventListener("click", function (e) {
//       const value = e.target.parentElement.firstChild.innerText;
//       const index = searchFilter.appliances.indexOf(value);
//       if (index !== -1) {
//         searchFilter.appliances.splice(index, 1);
//       }
//       e.target.parentElement.remove();
//       searchRecipes();
//     });
//   });
// }

//  vérifie si l'ingredient est dans le filtre et l'ajouter au cas contraire
function addIngredientsToFilter(ingredient) {
  if (!searchFilter.ingredients) searchFilter.ingredients = [ingredient];
  else searchFilter.ingredients.push(ingredient);
}

function addAppareilToFilter(appliance) {
  if (!searchFilter.appliances) searchFilter.appliances = [appliance];
  else searchFilter.appliances.push(appliance);
}

function addUstensilToFilter(ustensil) {
  if (!searchFilter.ustensils) searchFilter.ustensils = [ustensil];
  else searchFilter.ustensils.push(ustensil);
}

//function qui renvoie la liste des ingredients sans doublons
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

//function qui renvoie la liste des ustensils sans doublons
async function getListUstensile() {
  const { recipes } = await getRecettes();
  const listUstensil = [];
  recipes.map((el) => {
    el.ustensils;
    if (!listUstensil.includes(el.ustensils)) {
      listUstensil.push(el.ustensils);
    }
  });
  return listUstensil;
}

//function qui renvoie la liste des appareils sans doublons_ççp
async function getListAppareil() {
  const { recipes } = await getRecettes();
  const allAppareils = [];
  recipes.map((el) => {
    el.appliance;
    if (!allAppareils.includes(el.appliance)) {
      allAppareils.push(el.appliance);
    }
  });
  return allAppareils;
}

// function qui filtre les valeurs taper dans l'input ingredient
const inputIngredient = document.getElementById("search1");
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

// function qui filtre les valeurs taper dans l'input appareil
const inputAppareil = document.getElementById("search2");
function filterAppareil(appliance) {
  inputAppareil.addEventListener("input", (event) => {
    const resulFilteredMenu = appliance.filter((appareil) => {
      return appareil.toLowerCase().includes(event.target.value.toLowerCase());
    });

    createAppareil(resulFilteredMenu);
  });
}

// function qui filtre les valeurs taper dans l'input ustensil
const inputUstensile = document.getElementById("search3");
function filterUstensile(ustensils) {
  inputUstensile.addEventListener("input", (event) => {
    const resulFilteredMenu = ustensils.filter((ustensil) => {
      return ustensil.includes(event.target.value);
    });
    createUtensile(resulFilteredMenu);
  });
}

function searchRecipes() {
  const newrecipes = recipes.filter(
    (recipe) =>
      // Vérifiez si chaque ingrédient actif du filtre correspond aux ingrédients des recettes de chaque recette
      searchFilter.ingredients.every((ingredientFilt) =>
        recipe.ingredients.some(
          (recipeIngredient) =>
            recipeIngredient.ingredient.toLowerCase() ===
            ingredientFilt.toLowerCase()
        )
      ) &&
      searchFilter.ustensils.every((ustensilFilt) =>
        recipe.ustensils.some(
          (ustensil) => ustensil.toLowerCase() === ustensilFilt.toLowerCase()
        )
      ) &&
      searchFilter.appliances.every(
        (applianceFilt) =>
          recipe.appliance.toLowerCase() === applianceFilt.toLowerCase()
      ) &&
      // Check if recipe includes user typed value
      (recipe.name.toLowerCase().includes(searchFilter.keyword.toLowerCase()) ||
        recipe.description
          .toLowerCase()
          .includes(searchFilter.keyword.toLowerCase()) ||
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.ingredient
            .toLowerCase()
            .includes(searchFilter.keyword.toLowerCase())
        ))
  );
  displayData(newrecipes);
  sommeRecettes = newrecipes.length;
  totalRecettes.innerHTML = `${sommeRecettes} RECETTES`;
  affichageFilter();
}
