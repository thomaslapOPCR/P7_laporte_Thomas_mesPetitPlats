export function searchRecipes(searchInput, recipes, tagList) {
    const recipesFilterWithTags = filterWithTags(recipes, tagList);
    const results = [];

    for (let i = 0; i < recipesFilterWithTags.length; i++) {
        const recipe = recipesFilterWithTags[i];
        const name = recipe.name.toLowerCase().trim();
        const description = recipe.description.toLowerCase().trim();
        let hasMatch = false;

        if (name.indexOf(searchInput.toLowerCase().trim()) !== -1 || description.indexOf(searchInput.toLowerCase().trim()) !== -1) {
            hasMatch = true;
        }

        const ingredients = recipe.ingredients || [];

        for (let j = 0; j < ingredients.length; j++) {
            const ingredient = ingredients[j].ingredient.toLowerCase().trim();

            if (ingredient.indexOf(searchInput.toLowerCase().trim()) !== -1) {
                hasMatch = true;
                break;
            }
        }

        if (hasMatch) {
            results.push(recipe);
        }
    }

    return results;
}

export function filterWithTags(recipes, tags) {
    if (tags.length === 0) {
        return recipes;
    }

    const lowerCaseTags = tags.map((tag) => tag.toLowerCase().trim());
    const results = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const appliance = recipe.appliance ? recipe.appliance.toLowerCase().trim() : '';
        const ingredients = recipe.ingredients || [];
        const ustensils = recipe.ustensils || [];
        let hasTags = true;

        for (let j = 0; j < lowerCaseTags.length; j++) {
            const tag = lowerCaseTags[j];
            let hasTag = false;

            if (appliance.indexOf(tag) !== -1) {
                hasTag = true;
            }

            for (let k = 0; k < ingredients.length; k++) {
                const ingredient = ingredients[k].ingredient.toLowerCase().trim();

                if (ingredient.indexOf(tag) !== -1) {
                    hasTag = true;
                    break;
                }
            }

            for (let l = 0; l < ustensils.length; l++) {
                const ustensil = ustensils[l].toLowerCase().trim();

                if (ustensil.indexOf(tag) !== -1) {
                    hasTag = true;
                    break;
                }
            }

            if (!hasTag) {
                hasTags = false;
                break;
            }
        }

        if (hasTags) {
            results.push(recipe);
        }
    }

    return results;
}

export default { searchRecipes, filterWithTags };
