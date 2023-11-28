function recettesTemplate(recipes) {
  const {
    id,
    image,
    name,
    servings,
    ingredients,
    description,
    time,
    appliance,
    ustensils,
  } = recipes;

  function getCardDOM() {
    const card = document.createElement("article");
    card.className = "card";
    card.style = "width: 382px;";
    card.setAttribute("id", id);

    //card image
    const images = `image/${image}`;
    const img = document.createElement("img");
    img.setAttribute("src", images);
    img.className = "card-img-top";

    //body card
    const bodyCard = document.createElement("div");
    bodyCard.className = "card-body";

    // tempts de préparation
    const recetteTime = document.createElement("span");
    recetteTime.className = "recette-time";
    recetteTime.textContent = `${time} min`;

    //title
    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = name;

    const h6 = document.createElement("h6");
    h6.className = "recette";
    h6.innerText = "RECETTE";

    // description
    const p = document.createElement("p");
    p.className = "card-text";
    p.textContent = description;

    //ingredients
    const ingredient = document.createElement("h6");
    ingredient.className = "recette";
    ingredient.innerText = "INGREDIENTS";

    // affichage des differents élement de la structure des articles
    card.appendChild(img);
    card.appendChild(recetteTime);
    card.appendChild(bodyCard);
    bodyCard.appendChild(h5);
    bodyCard.appendChild(h6);
    bodyCard.appendChild(p);
    bodyCard.appendChild(ingredient);

    // div d'affichage de la section des ingrediens dans l'article
    const contentIngredient = document.createElement("div");
    contentIngredient.className = "content-ingredient";
    bodyCard.appendChild(contentIngredient);

    recipes.ingredients.forEach((ingredient) => {
      // condition pour les unités
      if (ingredient.unit) {
        ingredient.unit = ingredient.unit;
      } else ingredient.unit = "";
      // condition pour les unités
      if (ingredient.quantity) {
        ingredient.quantity = ingredient.quantity;
      } else ingredient.quantity = "";

      //recupération des ingrédients et des valeurs
      const recettecard = `${ingredient.ingredient}, ${ingredient.quantity}, ${ingredient.unit}`;

      const contentCol = document.createElement("div");
      contentCol.className = "container-ingredient";

      // collone de récupération des ingredients
      const col1 = document.createElement("div");
      col1.className = "card-ingredient";

      // balise des ingredients
      const ingredientPlat = document.createElement("p");
      ingredientPlat.className = "ingredient";
      ingredientPlat.textContent = `${ingredient.ingredient}`;

      // balise des Quantitées
      const quantite = document.createElement("span");
      quantite.className = "quantite";
      quantite.textContent = `${ingredient.quantity}`;

      // balise des unitées
      const unite = document.createElement("i");
      unite.className = "unite";
      unite.textContent = `${ingredient.unit}`;
      quantite.appendChild(unite);

      // affichage des ingredients
      col1.appendChild(ingredientPlat);
      col1.appendChild(quantite);
      contentCol.appendChild(col1);
      contentIngredient.appendChild(contentCol);
    });

    return card;
  }

  return { getCardDOM };
}
export { recettesTemplate };
