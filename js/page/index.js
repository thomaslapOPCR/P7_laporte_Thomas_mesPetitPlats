import * as Display from '../libs/display.js';
import * as Search from '../libs/search.js';
import { recipes } from '../../data/recipes.js';

/**
 * fonction qui initialise les fonctions d'affichages est de tris
 */

function init() {
  const searchInput = document.querySelector('#searchInput');
  const searchTag = document.querySelectorAll('.search-input-content div ul li');
  const tagsLine = document.querySelector('#tagsline');
  const searchInputContent = document.querySelector('.search-input-content');
  const selectBoxInputSearch = document.querySelectorAll('.search-input-content div input');

  const selectBoxInputSearchI = document.querySelector('#ingrédients input');
  const selectBoxInputSearchA = document.querySelector('#appareils input');
  const selectBoxInputSearchU = document.querySelector('#ustensiles input');

  const selectBoxListIngredient = document.querySelector('#ingrédients ul');
  const selectBoxListApplience = document.querySelector('#appareils ul');
  const selectBoxListUstensil = document.querySelector('#ustensiles ul');
  const tagList = [];
  const divsAndElements = document.querySelectorAll('.Composante, .Devices, .Utensils, input, ul, i');

  divsAndElements.forEach(element => {
    element.addEventListener('click', () => {
      element.classList.toggle('active');
    });
  });

  displayAndFilter();

  searchInput.addEventListener('input', () => {
      if (searchInput.value.length > 3) {
        displayAndFilter();
      } else {
        displayAndFilter();
      }
  });

  selectBoxInputSearchI.addEventListener('input', (event) => {
    displayAndFilter();
  });

  selectBoxInputSearchA.addEventListener('input', () => {
    displayAndFilter();
  });

  selectBoxInputSearchU.addEventListener('input', () => {
    displayAndFilter();
  });

  function SetAllFilter(recipes, tag) {
    Display.fillFilter(recipes, selectBoxInputSearchI.value, selectBoxListIngredient, tag);
    Display.fillFilter(recipes, selectBoxInputSearchA.value, selectBoxListApplience, tag);
    Display.fillFilter(recipes, selectBoxInputSearchU.value, selectBoxListUstensil, tag);
  }

  searchInputContent.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const li = event.target;
      const ul = li.parentNode;
      const input = ul.previousElementSibling;
      const { filter } = ul.dataset;
      const { color } = ul.parentNode.dataset;
      input.value = '';
      tagList.push(li.textContent);

      Display.createTag(li.textContent, color);
      displayAndFilter();
    }
  });

  tagsLine.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')) {
      const filter = event.target.parentNode.textContent.trim();
      const index = tagList.indexOf(filter);
      tagList.splice(index, 1);
      tagsLine.removeChild(event.target.parentNode);
      displayAndFilter();
    }
  });

  function displayAndFilter() {
    const filteredRecipes = Search.searchRecipes(searchInput.value, recipes, tagList);
    Display.displayRecipes(filteredRecipes);
    SetAllFilter(filteredRecipes, tagList);
    // Display.setNumberTest(filteredRecipes);
  }
}

init();
