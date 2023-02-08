
 /**
 * fonction qui permet l'affichage des recettes sur la page
 * retourne le Html de chaque recette grace a Map
 * @param recipes
 * @return HTMLElement
 */
export function displayRecipes(recipes) {
  const container = document.querySelector('#recipes-container');

  return recipes.length === 0 ? sendMessage('Aucune recettes ne correspond a votre recherche ...')
    : container.innerHTML = recipes.map(({
      id, name, time, description, ingredients = [],
    }) => `
            <article class="card" data-index="${id}">
                <div class="img"></div>
                <div class="desc">
                    <div class="header">
                        <p class="title">${name}</p>
                        <span>
                            <i class="fal fa-clock"></i>
                            <p class="time">${time} mins</p>
                        </span>
                    </div>
                    <div class="main-content">
                        <ul>${
  ingredients.map(({ ingredient, quantity = '', unit = '' }) => `<li>${ingredient} <span>${quantity} ${unit} </span></li>`).join('')}
                        </ul>
                        <p class="desc-recipes">${description}</p>
                    </div>
                </div>
            </article>
        `).join('');
}

/**
 * Permet d'afficher un message d'erreur
 * @param message
 * @return {String}
 */
export function sendMessage(message) {
  const container =  document.querySelector('#recipes-container');
  return container.innerHTML = message;
}

export function fillFilter(recipes,tags) {
  const selectBoxIngredients = document.querySelector('#ingrédients ul');
  const selectBoxAppliance = document.querySelector('#appareils ul');
  const selectBoxUstensils = document.querySelector('#ustensiles ul');

  selectBoxIngredients.innerHTML = getAllIngredients(recipes).map((item) => `<li>${item.toLowerCase()}</li>`).join('');
  selectBoxAppliance.innerHTML = getAllAppliances(recipes).map((item) => `<li>${item.toLowerCase()}</li>`).join('');
  selectBoxUstensils.innerHTML = getAllUstensils(recipes).map((item) => `<li>${item.toLowerCase()}</li>`).join('');
}




export function createTag(name, color) {
  const tagline = document.querySelector('#tagsline');
  const tag = `
        <div class="filters" style="background-color:${color}">
            <p>${name}</p>
            <i class="fal fa-times-circle close"></i>
        </div>`;
  // toggleTagsVisibility(name);
  return tagline.innerHTML += tag;
}


export function getAllIngredients(recipes) {
   return recipes
       .map(recipe => recipe.ingredients.map(d => d.ingredient.toLowerCase()))
       .reduce((prev, current) => [...prev, ...current.filter(e => !prev.includes(e.toLowerCase()))]);
 }

 export function getAllAppliances(recipes) {
   return recipes
       .map(recipe => [recipe.appliance.toLowerCase()])
       .reduce((prev, current) => (prev.includes(...current)) ? prev : [...prev, ...current]);
 }

 export function getAllUstensils(recipes) {
   return recipes
       .map(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()))
       .reduce((prev, current) => [...prev, ...current.filter(e => !prev.includes(e.toLowerCase()))]);
 }




export default {
  displayRecipes,
  sendMessage,
  fillFilter,
  createTag,
  getAllIngredients,
  getAllAppliances,
  getAllUstensils
};
