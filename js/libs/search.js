export function searchRecipes(searchInput, recipes, tagList) {
    const recipesFilterWithTags = filterWithTags(recipes, tagList);

    if (searchInput === '') {
        return recipesFilterWithTags;
    }

    return recipesFilterWithTags.filter((recipe) => recipe.name.toLowerCase().includes(searchInput.toLowerCase().trim())
    || recipe.description.toLowerCase().includes(searchInput.toLowerCase().trim())
    || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchInput.toLowerCase().trim())));
}

export function filterWithTags(recipes, tags) {
    if (tags.length === 0) {
        return recipes;
    }

    const lowerCaseTags = tags.map((tag) => tag.toLowerCase().trim());

    return recipes.filter((recipe) => (
            lowerCaseTags.every((tag) => (recipe.appliance && recipe.appliance.toLowerCase().includes(tag))
                || (recipe.ingredients && recipe.ingredients.some((ingredient) => ingredient.ingredient && ingredient.ingredient.toLowerCase().includes(tag)))
                || (recipe.ustensils && recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(tag))))));
}

export default { searchRecipes, filterWithTags };
