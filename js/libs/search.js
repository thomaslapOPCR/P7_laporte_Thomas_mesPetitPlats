import * as Display from './display.js';

export function sort(recipes) {
  const searchInput = document.querySelector('#searchInput');

  searchInput.addEventListener('input', (event) => {
    if (searchInput.value.length < 3) {
      Display.postRecipes(recipes);
      return;
    }

    const searchRecipes = (recipes, search) => {
      return recipes.filter(recipe => {
        // return (
        //     recipe.name.toLowerCase().includes(search.toLowerCase())
        console.log(recipe.ingredients.map(ingredient =>
            ingredient.ingredient.toLowerCase().includes(search.toLowerCase()))
        )
            // recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(search.toLowerCase()))
        
        // )
      });
    }
   
    const results = searchRecipes(recipes, searchInput.value);
    console.log(results)
    Display.postRecipes(results);

    if (results.length === 0) Display.noResult('Aucune recettes ne correspond...');
  });
}

export default { sort };
