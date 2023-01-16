import { recipes } from '../../data/recipes.js';
import * as Display from '../libs/display.js';
import * as Search from '../libs/search.js';

function init() {
  Display.postRecipes(recipes);
  Search.sort(recipes);
}

// function activateFilters() {
//     const item = document.querySelector('.search-input-content');
//
//     item.addEventListener('click',(event)=>{
//         event.preventDefault();
//         let dataId = event.target.getAttribute('data-id');
//         if(dataId !== "Composante" || dataId !== "Devices" || dataId !== "Ustensiles"){
//             event.target.classList.toggle('active');
//         }else {
//             return;
//         }
//     })
// }
//
// activateFilters()

init();
