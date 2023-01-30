import * as Display from '../libs/display.js';
import * as Search from '../libs/search.js';
import {recipes} from "../../data/recipes.js";

/**
 * fonction qui initialise les fonctions d'affichages est de tris
 */

function init() {
  const searchInput = document.querySelector('#searchInput');
  const searchTag = document.querySelectorAll('.search-input-content div ul');
  const tags = document.querySelector('#tagsline');
  const searchInputContent = document.querySelector('.search-input-content');

  const filterTags = [];
    let filteredRecipes;
    let recipesFilteredWithTags;
    
    filteredRecipes = Search.filterRecipes(recipes, searchInput.value);
    Display.fillFilter(filteredRecipes);
    Display.displayRecipes(filteredRecipes);

    
  searchInput.addEventListener('input', () => {

    if(filterTags.length > 0 && searchInput.value.length >= 3) {
      let filteredRecipesWithTagAndInput = Search.filterRecipes( Search.filterWithTags(recipes,filterTags), searchInput.value);
      Display.fillFilter(filteredRecipesWithTagAndInput);
      Display.displayRecipes(filteredRecipesWithTagAndInput);
    } else if(filterTags.length > 0 && searchInput.value.length < 3) {
      let filteredRecipesWithTag = Search.filterWithTags(recipes,filterTags);
      Display.fillFilter(filteredRecipesWithTag);
      Display.displayRecipes(filteredRecipesWithTag);
    } else {
      filteredRecipes = Search.filterRecipes(recipes, searchInput.value)
      Display.fillFilter(filteredRecipes);
      Display.displayRecipes(filteredRecipes);
    }
  });


  searchInputContent.querySelectorAll('div').forEach((div) => {
    div.addEventListener('click', (e) => {
      e.target.classList.toggle('active');
    });
  });

  searchTag.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.nodeName.toLowerCase() !== 'li') return;
      const color = e.target.parentElement.parentElement.dataset.color;
      filterTags.push(e.target.textContent.toLowerCase());

      recipesFilteredWithTags = Search.filterWithTags(filteredRecipes,filterTags);
      Display.fillFilter(recipesFilteredWithTags);
      Display.displayRecipes(recipesFilteredWithTags);
      Display.createTag(e.target.textContent, color);

    });
  });

  tags.addEventListener('click', (e) => {

    if (e.target.nodeName.toLowerCase() !== 'i') return;
    e.target.parentElement.remove();

    const element = e.target.previousElementSibling.textContent;

    Display.toggleTagsVisibility(element);

    const index = filterTags.indexOf(element);
    filterTags.splice(index, 1);
    
     const refresh = Search.filterWithTags(filteredRecipes,filterTags);

    Display.fillFilter(refresh);
    Display.displayRecipes(refresh);
  });
  
}





init();
