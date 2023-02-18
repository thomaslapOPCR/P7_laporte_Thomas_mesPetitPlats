import * as Display from '../libs/display.js';
import * as Search from '../libs/search.js';
import { recipes } from "../../data/recipes.js";
import {getAllAppliances, getAllIngredients, getAllUstensils} from "../libs/display.js";


/**
 * fonction qui initialise les fonctions d'affichages est de tris
 */

function init() {
  const searchInput = document.querySelector('#searchInput');
  const searchTag = document.querySelectorAll('.search-input-content div ul');
  const tagsLine = document.querySelector('#tagsline');
  const searchInputContent = document.querySelector('.search-input-content');
  const selectBoxInputSearch = document.querySelectorAll('.search-input-content div input');
  
  let tagList = [];
  
  searchInputContent.querySelectorAll('div').forEach((div) => {
    div.addEventListener('click', (e) => {
      e.target.classList.toggle('active');
    });
  });
  
  Display.displayRecipes(recipes,tagList);
  
  searchInput.addEventListener('input',() =>
  {
    let filteredRecipes = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
    if(filteredRecipes.length === 0) Display.sendMessage('Aucune correspondance...')
    Display.displayRecipes(filteredRecipes,tagList);
  })
  
  
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
      
      input.value = '';
      tagList.push(li.textContent)

     Display.displayRecipes(Search.filterWithTags(recipes,tagList),tagList);
    }
  });

  tagsLine.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')) {
      const filter = event.target.parentNode.textContent.trim();
      const index = tagList.indexOf(filter);
      tagList.splice(index, 1);
      tagsLine.removeChild(event.target.parentNode);

      let filteredRecipes = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
      Display.displayRecipes(filteredRecipes,tagList);
    }
  });

    selectBoxInputSearch.forEach(el=>{
      el.addEventListener('input',event =>{
        let filteredRecipes = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
       
        switch (el.dataset.type) {
         case "Ingrédients": {

           const result = Search.filterIngredientsWithInput(Display.getAllIngredients(filteredRecipes),event.target.value);
            Display.fillFilter(result,Display.getAllAppliances(filteredRecipes),getAllUstensils(filteredRecipes));
           
           break;
         }

         case "Appareils": {
           const result = Search.filterIngredientsWithInput(Display.getAllAppliances(filteredRecipes),event.target.value);
           Display.fillFilter(getAllIngredients(filteredRecipes),result,getAllUstensils(filteredRecipes));
           break;
         }

         case "ustensiles": {
           const result = Search.filterIngredientsWithInput(Display.getAllAppliances(filteredRecipes),event.target.value);
           Display.fillFilter(getAllIngredients(filteredRecipes),getAllAppliances(filteredRecipes),result);
           break;
         }
         
         default:{
           
           break;
         }
       }
       
      })
    })

}

init();
