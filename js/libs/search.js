/**
 * fonction qui gere le tri sur la page
 * @param recipes
 * @param value
 * @return []
 */

export function filterRecipes(recipes, value) {
  return value.length < 3 ? recipes : recipes.filter((recipe) => (
    recipe.name.toLowerCase().includes(value.toLowerCase().trim())
            || recipe.description.toLowerCase().includes(value.toLowerCase().trim())
            || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(value.toLowerCase().trim()))
  ));
}

export function filterWithTags(recipes, tags) {
    if (!tags || tags.length === 0) return recipes;
    const lowerCaseTags = tags.map(tag => tag.toLowerCase().trim());
    return recipes.filter(recipe => {
        return (
            lowerCaseTags.every(tag => (recipe.appliance && recipe.appliance.toLowerCase().includes(tag)) ||
                (recipe.ingredients && recipe.ingredients.some(ingredient => ingredient.ingredient && ingredient.ingredient.toLowerCase().includes(tag))) ||
                (recipe.ustensils && recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag)))
            ));
    });
}

export default { filterRecipes, filterWithTags };
