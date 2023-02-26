import * as Display from '../libs/display.js';
import * as Search from '../libs/search.js';
// import * as Search from '../libs/searchV2.js';
import { recipes } from "../../data/recipes.js";




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
  let tagList = [];
  
  searchInputContent.querySelectorAll('div').forEach((div) => {
    div.addEventListener('click', (e) => {
      e.target.classList.toggle('active');
    });
  });
  
  let firstFilter = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
  Display.displayRecipes(firstFilter);
  SetAllFilter(firstFilter);
  Display.setNumberTest(firstFilter)
  
  searchInput.addEventListener('input',() =>
  {
      if(searchInput.value.length > 3) {
        let filteredRecipes = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
        if(filteredRecipes.length === 0) Display.sendMessage('Aucune correspondance...')
        Display.displayRecipes(filteredRecipes);
        Display.setNumberTest(filteredRecipes)
        SetAllFilter(filteredRecipes);
      } else {
        let filteredRecipes = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
        Display.displayRecipes(filteredRecipes);
        SetAllFilter(filteredRecipes);
        Display.setNumberTest(filteredRecipes)
      }

    
  })

  selectBoxInputSearchI.addEventListener('input',(event)=>
  {
    let filteredRecipes = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
    SetAllFilter(filteredRecipes)
    Display.setNumberTest(filteredRecipes)
    // Display.fillFilter(filteredRecipes,selectBoxInputSearchI.value);
  })

  selectBoxInputSearchA.addEventListener('input',()=>
  {
    let filteredRecipes = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
    SetAllFilter(filteredRecipes)
    Display.setNumberTest(filteredRecipes)
    // Display.fillFilter(filteredRecipes,selectBoxInputSearchA.value);
  })

  selectBoxInputSearchU.addEventListener('input',()=>
  {
    let filteredRecipes = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
    SetAllFilter(filteredRecipes)
    Display.setNumberTest(filteredRecipes)
    // Display.fillFilter(filteredRecipes,selectBoxInputSearchU.value);
  })
    
   
  function SetAllFilter(recipes) {
    Display.fillFilter(recipes,selectBoxInputSearchI.value,selectBoxListIngredient);
    Display.fillFilter(recipes,selectBoxInputSearchA.value,selectBoxListApplience);
    Display.fillFilter(recipes,selectBoxInputSearchU.value,selectBoxListUstensil);
  }

  searchInputContent.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const li = event.target;
      const ul = li.parentNode;
      const input = ul.previousElementSibling;
      const filter = ul.dataset.filter;
      const color = ul.parentNode.dataset.color;
      input.value = '';
      tagList.push(li.textContent)

      let filteredRecipes = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
      Display.createTag(li.textContent,color);
      Display.displayRecipes(filteredRecipes);
      SetAllFilter(filteredRecipes)
      Display.setNumberTest(filteredRecipes)
    }
  });

  tagsLine.addEventListener('click', (event) => {
    if (event.target.classList.contains('close')) {
      const filter = event.target.parentNode.textContent.trim();
      const index = tagList.indexOf(filter);
      tagList.splice(index, 1);
      tagsLine.removeChild(event.target.parentNode);
 
      let filteredRecipes = Search.searchRecipes(searchInput.value,Search.filterWithTags(recipes,tagList));
      Display.displayRecipes(filteredRecipes);
      Display.setNumberTest(filteredRecipes)

    }
  });

  
  

}

init();
