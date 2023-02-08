import * as Display from '../libs/display.js';
import * as Search from '../libs/search.js';
import {recipes} from "../../data/recipes.js";
import {displayRecipes, sendMessage} from "../libs/display.js";



/**
 * fonction qui initialise les fonctions d'affichages est de tris
 */

function init() {
  const searchInput = document.querySelector('#searchInput');
  const searchTag = document.querySelectorAll('.search-input-content div ul');
  const tagsLine = document.querySelector('#tagsline');
  const searchInputContent = document.querySelector('.search-input-content');
  let tagList = []
  function searchRecipes(searchInput,recipes) {
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchInput) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchInput.toLowerCase())) ||
        recipe.description.toLowerCase().includes(searchInput.toLowerCase())
    );
    return filteredRecipes.length > 0
        ? filteredRecipes
        : Display.sendMessage('Aucune recettes ne correspond a votre recherche ...');
  };
  
  searchInputContent.querySelectorAll('div').forEach((div) => {
    div.addEventListener('click', (e) => {
      e.target.classList.toggle('active');
    });
  });
  
  
  Display.displayRecipes(searchRecipes(searchInput.value.toLowerCase().trim(),recipes));
  
  searchInput.addEventListener('input',event=>
  {
    Display.displayRecipes(searchRecipes(searchInput.value.toLowerCase().trim(),recipes));
  })

  let filteredRecipes = searchRecipes(searchInput.value.toLowerCase().trim(),recipes);
  
  Display.fillFilter(filteredRecipes);

  
  searchInputContent.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const li = event.target;
      const ul = li.parentNode;
      const input = ul.previousElementSibling;
      const filter = ul.dataset.filter;
      const color = ul.parentNode.dataset.color;

      const tag = `
      <div class="filters" style="background-color:${color}">
        <p>${li.textContent}</p>
        <i class="fal fa-times-circle close"></i>
      </div>
    `;

      tagsLine.insertAdjacentHTML('beforeend', tag);
      // ul.removeChild(li);
      input.value = '';
      tagList.push(li.textContent)

     Display.displayRecipes(Search.filterWithTags(filteredRecipes,tagList));
      
    }
  });

  tagsLine.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')) {
      const filter = event.target.parentNode.textContent.trim();
      const index = tagList.indexOf(filter);
      tagList.splice(index, 1);
      tagsLine.removeChild(event.target.parentNode);
      Display.displayRecipes(Search.filterWithTags(filteredRecipes,tagList));
    }
  });


    tagsLine.querySelectorAll('.filters').forEach((tag) => {
      const filterValue = tag.textContent.trim();
      filteredRecipes = filteredRecipes.filter((recipe) =>
          recipe[tag.parentNode.dataset.filter].includes(filterValue)
      );
    });

  Display.displayRecipes(searchRecipes(searchInput.value.toLowerCase().trim(),recipes));
}




init();
