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
    filteredRecipes = Search.filterRecipes(recipes, searchInput.value);
    Display.fillFilter(filteredRecipes);
    Display.displayRecipes(filteredRecipes);
  
  searchInput.addEventListener('input', () => {
    filteredRecipes = Search.filterRecipes(filteredRecipes, searchInput.value)
    Display.fillFilter(filteredRecipes);
    Display.displayRecipes(filteredRecipes);
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

      filteredRecipes = Search.filterWithTags(filteredRecipes,filterTags);
      Display.fillFilter(filteredRecipes);
      Display.displayRecipes(filteredRecipes);
      Display.createTag(e.target.textContent, color);
    });
  });

  tags.addEventListener('click', (e) => {

    if (e.target.nodeName.toLowerCase() !== 'i') return;
    e.target.parentElement.remove();

    const element = e.target.previousElementSibling.textContent;

    Display.toggleTagsVisibility(element);

    const index = filterTags.indexOf(element);
    index !== -1 ? filterTags.splice(index, 1) : '';
    
    filteredRecipes = Search.filterWithTags(filteredRecipes,filterTags);
    
    Display.fillFilter(filteredRecipes);
    Display.displayRecipes(filteredRecipes);
    
  });
  
}





init();
