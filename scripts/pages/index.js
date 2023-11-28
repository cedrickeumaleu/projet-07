import { recettesTemplate } from "../templates/recettes.js";
async function getRecettes() {
  const recipes = await fetch("data/recipes.json");
  if (recipes.ok === true) {
    return recipes.json();
  }
  throw new error("erreur serveur");
}

async function init() {
  //réinitialisation de la bar de recherche
  const inputSearch = document.getElementById("search");
  inputSearch.value = "";
  // Récupère les datas
  const { recipes } = await getRecettes();
  const listIngredient = await getListeIngredient();
  //resultat function affichage des menu
  displayData(recipes);
  //resultat de filtre dans la bar de recherche
  getTriRecette(recipes);
  // filterElements(recipes);
  //les functions filtre ingredient
  createIngredient(listIngredient);
  filterIngredient(listIngredient);
  selectIngredient(recipes);
}
init();

//DOM élements
const main = document.getElementById("main");
const menuSection = document.querySelector(".restaurant-section");
const blockSection = document.querySelector(".section-page");
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

// cette function selectionne un ingredient dans la liste
// et revoie que les menus qui comporte cette dernière
function selectIngredient(recipes) {
  resultIngredient.addEventListener("click", (event) => {
    const newrecipes = recipes.filter((recipe) => {
      return (
        // filtrer dans les ingredients
        recipe.ingredients
          .map((ingredient) => {
            return ingredient.ingredient.includes(event.target.textContent);
          })
          .includes(true)
      );
    });
    displayData(newrecipes);
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
