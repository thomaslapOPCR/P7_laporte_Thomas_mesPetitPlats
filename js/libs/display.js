
/**
 * fonction qui permet l'affichage des recettes sur la page
 * retourne le Html de chaque recette grace a Map
 * @param recipes
 * @param tagList
 * @return HTMLElement
 */
export function displayRecipes(recipes) {
  const container = document.querySelector('#recipes-container');
  if(recipes.length === 0) return sendMessage('Aucune correspondance...');
  
  return container.innerHTML = recipes.map(({
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
  ingredients.map(({ ingredient, quantity = '', unit = '' }) => `<li>${ingredient} <span>${quantity} ${unit} </span></li>`).join('')}
                        </ul>
                        <p class="desc-recipes">${description}</p>
                    </div>
                </div>
            </article>
        `).join('');
     
}

/**
 * Permet d'afficher un message d'erreur
 * @param message
 * @return {String}
 */
export function sendMessage(message) {
  const container =  document.querySelector('#recipes-container');
  return container.innerHTML = message;
}


export function fillFilter(recipes, input , element, tags) {

    function check(recipes, input) {
        if(input === '') {
            return recipes;
        }
        const searchTerm = input.toLowerCase().trim();

        const filteredRecipes = recipes.filter(recipe => {
            return (
                recipe.appliance.toLowerCase().includes(searchTerm) ||
                recipe.ustensils.some(ustensil =>
                    ustensil.toLowerCase().includes(searchTerm)
                ) ||
                recipe.ingredients.some(({ ingredient }) =>
                    ingredient.toLowerCase().includes(searchTerm)
                )
            );
        });
        return filteredRecipes.map(({ name, ingredients, appliance, ustensils }) => {
            const matchedIngredients = ingredients.filter(({ ingredient }) =>
                ingredient.toLowerCase().includes(searchTerm)
            );
            return {
                name,
                ingredients: matchedIngredients,
                appliance,
                ustensils
            };
        });
        
    }
    switch (element.dataset.filter) {
        case "ingredients":
            const allIngredients = getAllIngredients(check(recipes, input));
            const filteredIngredients = allIngredients.filter(item => {
                return tags.every(tag => !item.toLowerCase().includes(tag.toLowerCase()));
            });
            const ingredientList = filteredIngredients.map(item => `<li>${item.toLowerCase()}</li>`).join('');
            element.innerHTML = ingredientList;
            break;

        case "appliance":
            const allAppliance = getAllAppliances(check(recipes, input));
            const filteredApplience = allAppliance.filter(item => {
                return tags.every(tag => !item.toLowerCase().includes(tag.toLowerCase()));
            });
            const applianceList = filteredApplience.map(item => `<li>${item.toLowerCase()}</li>`).join('');
            element.innerHTML = applianceList;
            break;

        case "ustensils":
            const allUstensils = getAllUstensils(check(recipes, input));
            const filteredUstensils = allUstensils.filter(item => {
                return tags.every(tag => !item.toLowerCase().includes(tag.toLowerCase()));
            });
            const ustensilList = filteredUstensils.map(item => `<li>${item.toLowerCase()}</li>`).join('');
            element.innerHTML = ustensilList;
            break;

        default:
            element.innerHTML = '';
    }

  
}

export function createTag(name, color) {
  const tagline = document.querySelector('#tagsline');
  const tag = `
        <div class="filters" style="background-color:${color}">
            <p>${name}</p>
            <i class="fal fa-times-circle close"></i>
        </div>`;

     return tagline.insertAdjacentHTML('beforeend', tag);
}



export function getAllIngredients(recipes) {
    if(recipes.length === 0) {
        return ['Aucune correspondance...'];
    }
    const allIngredients = recipes
        .map((recipe) => recipe.ingredients.map((d) => d.ingredient.toLowerCase()))
        .reduce((prev, current) => [...prev, ...current.filter((e) => !prev.includes(e.toLowerCase()))]);

    return allIngredients.sort((a, b) => a.localeCompare(b));
 }

export function getAllAppliances(recipes) {
    if(recipes.length === 0) {
        return ['Aucune correspondance...'];
    }
    return recipes
        .map(recipe => recipe.appliance.toLowerCase())
        .reduce((prev, current) => (prev.includes(current)) ? prev : [...prev, current], [])
        .sort((a, b) => a.localeCompare(b));
}

export function getAllUstensils(recipes) {
    if(recipes.length === 0) {
        return ['Aucune correspondance...'];
    }
    return recipes
        .map(recipe => recipe.ustensils.map(ustensil => ustensil.toLowerCase()))
        .reduce((prev, current) => [...prev, ...current.filter(e => !prev.includes(e))], [])
        .sort((a, b) => a.localeCompare(b));
}


export function setNumberTest(recipes) {
    const doc = document.querySelector('#number');
    return doc.innerHTML = recipes.length;
}

export default {
  displayRecipes,
  sendMessage,
  fillFilter,
  createTag,
    setNumberTest
};
