import {recipes} from "../../data/recipes.js";
import {iterateDatas} from "./displayRecipes.js";

iterateDatas(recipes);

function activateFilters() {
    const item = document.querySelector('.search-input-content');
    
    item.addEventListener('click',(event)=>{
        event.preventDefault();
        let dataId = event.target.getAttribute('data-id');
        if(dataId !== "Composante" || dataId !== "Devices" || dataId !== "Ustensiles"){
            event.target.classList.toggle('active');
            
        }else {
            return;
        }
    })
}

activateFilters()