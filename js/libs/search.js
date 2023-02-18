

export function searchRecipes(searchInput,recipes) {
    const filteredRecipes = searchInput.length < 3 ? recipes : recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchInput.toLowerCase().trim())
    || recipe.description.toLowerCase().includes(searchInput.toLowerCase().trim())
    || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchInput.toLowerCase().trim())))

    return searchInput.length > 3 ?filteredRecipes : recipes
};


export function filterWithTags(recipes, tags) {
    
    const lowerCaseTags = tags.map(tag => tag.toLowerCase().trim());
    
    return tags.length === 0 ? recipes : recipes.filter(recipe => {
        return (
            lowerCaseTags.every(tag => (recipe.appliance && recipe.appliance.toLowerCase().includes(tag)) ||
                (recipe.ingredients && recipe.ingredients.some(ingredient => ingredient.ingredient && ingredient.ingredient.toLowerCase().includes(tag))) ||
                (recipe.ustensils && recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag)))
            ));
    });
}

export function filterIngredientsWithInput(list, value) {
    return list.length<1? list :list.filter(item => {
        return item.toLowerCase().includes(value.toLowerCase());
    });
}

export default { searchRecipes, filterWithTags,filterIngredientsWithInput };
