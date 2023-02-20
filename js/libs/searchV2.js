export function searchRecipes(searchInput, recipes) {
    const filteredRecipes = [];

    if (searchInput.length < 3) {
        filteredRecipes.push(...recipes);
    } else {
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const name = recipe.name.toLowerCase();
            const description = recipe.description.toLowerCase();
            const ingredients = recipe.ingredients;

            if (name.includes(searchInput.toLowerCase().trim()) || description.includes(searchInput.toLowerCase().trim())) {
                filteredRecipes.push(recipe);
            } else {
                for (let j = 0; j < ingredients.length; j++) {
                    const ingredient = ingredients[j].ingredient.toLowerCase();
                    if (ingredient.includes(searchInput.toLowerCase().trim())) {
                        filteredRecipes.push(recipe);
                        break;
                    }
                }
            }
        }
    }

    if (searchInput.length > 3) {
        return filteredRecipes;
    } else {
        return recipes;
    }
}

 export function filterWithTags(recipes, tags) {
    const filteredRecipes = [];

    if (tags.length === 0) {
        filteredRecipes.push(...recipes);
    } else {
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const appliance = recipe.appliance;
            const ingredients = recipe.ingredients;
            const ustensils = recipe.ustensils;

            let match = true;

            for (let j = 0; j < tags.length; j++) {
                const tag = tags[j].toLowerCase().trim();

                if ((appliance && appliance.toLowerCase().includes(tag)) ||
                    (ingredients && ingredients.some(ingredient => ingredient.ingredient && ingredient.ingredient.toLowerCase().includes(tag))) ||
                    (ustensils && ustensils.some(ustensil => ustensil.toLowerCase().includes(tag)))) {
                    continue;
                } else {
                    match = false;
                    break;
                }
            }

            if (match) {
                filteredRecipes.push(recipe);
            }
        }
    }

    return filteredRecipes;
}

export function filterIngredientsWithInput(list, value) {
    const filteredList = [];

    if (list.length < 1) {
        filteredList.push(...list);
    } else {
        for (let i = 0; i < list.length; i++) {
            const item = list[i];

            if (item.toLowerCase().includes(value.toLowerCase())) {
                filteredList.push(item);
            }
        }
    }

    return filteredList;
}

export default { searchRecipes, filterWithTags,filterIngredientsWithInput };
