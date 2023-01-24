import * as Search from "./search.js";
import { recipes } from "../../data/recipes.js";

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
  ingredients.map(({ ingredient, quantity = '', unit = '' }) => `<li>${ingredient} ${quantity} ${unit} </li>`).join('')}
                        </ul>
                        <p class="desc-recipes">${description}</p>
                    </div>
                </div>
            </article>
        `).join('');
}

const convertUnits = (unit, quantity) => {
  const units = {
    grammes: 'g',
    ml: 'ml',
    'cuillères à soupe': 'cuillère à soupe',
    'cuillères à café': 'cuillère à café',
    gousses: 'gousse',
    sachets: 'sachet',
  };
  return quantity === 1 ? units[unit].slice(0, -1) : quantity > 1 ? `${units[unit]}s` : units[unit];
};

/**
 * Permet d'afficher un message d'erreur
 * @param message
 * @return {String}
 */
export function sendMessage(message) {
  const container =  document.querySelector('#recipes-container');
  return container.innerHTML = message;
}

export function fillFilter(recipes) {
  const selectBoxIngredients = document.querySelector('#ingrédients ul');
  const selectBoxAppliance = document.querySelector('#appareils ul');
  const selectBoxUstensils = document.querySelector('#ustensiles ul');

  const extractAndSortItems = (recipes, key) => {
    let items = recipes
      .map((recipe) => (Array.isArray(recipe[key])
            && recipe[key]
        ? recipe[key].map((ingredien) => (key === 'ingredients' ? ingredien.ingredient : ingredien))
        : key === 'ingredients' ? recipe[key].ingredient : recipe[key]))
      .filter((item) => item)
      .reduce((acc, item) => acc.concat(item), []);

    items = Array.from(new Set(items))
      .filter((item) => items.map((i) => i.toLowerCase().replace(/s$/, ''))
        .indexOf(item.toLowerCase().replace(/s$/, '')) === items.indexOf(item));

    return items.sort((a, b) => a.localeCompare(b));
  };

  selectBoxIngredients.innerHTML = extractAndSortItems(recipes, 'ingredients').map((item) => `<li>${item.toLowerCase()}</li>`).join('');
  selectBoxAppliance.innerHTML = extractAndSortItems(recipes, 'appliance').map((item) => `<li>${item.toLowerCase()}</li>`).join('');
  selectBoxUstensils.innerHTML = extractAndSortItems(recipes, 'ustensils').map((item) => `<li>${item.toLowerCase()}</li>`).join('');
}

export function createTag(name, color) {
  const tagline = document.querySelector('#tagsline');
  const tag = `
        <div class="filters" style="background-color:${color}">
            <p>${name}</p>
            <i class="fal fa-times-circle close"></i>
        </div>`;
  toggleVisibility(name);
  return tagline.innerHTML += tag;
}

export function toggleVisibility(elementValue) {
  const liElements = document.querySelectorAll('.search-input-content div ul li');
  liElements.forEach(li => {
    if (li.textContent === elementValue) {
      li.style.display = li.style.display === "none" ? "block" : "none";
    }
  });
}

export function displayRecipesAccordingToFilter() {
  const searchInput = document.querySelector('#searchInput');
  let filteredRecipes;
  filteredRecipes = Search.filterRecipes(recipes, searchInput.value);
  fillFilter(filteredRecipes);
  displayRecipes(filteredRecipes);
  ////////////////////////////////////////////
  document.title = filteredRecipes.length; // indicateur visuelle temporaire
  //////////////////////////////////////////
  return filteredRecipes
}

export function displayRecipesAccordingToTags(filterTags) {
  const tagsFilterResult =  Search.filterWithTags(displayRecipesAccordingToFilter(),filterTags);
  return filterTags.length < 1 ? displayRecipes(recipes) : displayRecipes(tagsFilterResult);
}

export default {
  displayRecipes, sendMessage, fillFilter, createTag, toggleVisibility , displayRecipesAccordingToFilter ,
  displayRecipesAccordingToTags
};
