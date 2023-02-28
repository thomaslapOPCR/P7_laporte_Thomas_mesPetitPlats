function searchRecipes(searchInput, recipes) {
    if (searchInput === '') {
        return recipes;
    }

    var results = [];

    for (var i = 0; i < recipes.length; i++) {
        var recipe = recipes[i];
        var name = recipe.name.toLowerCase().trim();
        var description = recipe.description.toLowerCase().trim();
        var hasMatch = false;

        if (name.indexOf(searchInput.toLowerCase().trim()) !== -1 ||
            description.indexOf(searchInput.toLowerCase().trim()) !== -1) {
            hasMatch = true;
        }

        var ingredients = recipe.ingredients || [];

        for (var j = 0; j < ingredients.length; j++) {
            var ingredient = ingredients[j].ingredient.toLowerCase().trim();

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


function filterWithTags(recipes, tags) {
    if (tags.length === 0) {
        return recipes;
    }

    var results = [];

    for (var i = 0; i < recipes.length; i++) {
        var recipe = recipes[i];
        var appliance = recipe.appliance ? recipe.appliance.toLowerCase().trim() : '';
        var ingredients = recipe.ingredients || [];
        var ustensils = recipe.ustensils || [];
        var hasTags = true;

        for (var j = 0; j < tags.length; j++) {
            var tag = tags[j].toLowerCase().trim();
            var hasTag = false;

            if (appliance.indexOf(tag) !== -1) {
                hasTag = true;
            }

            for (var k = 0; k < ingredients.length; k++) {
                var ingredient = ingredients[k].ingredient.toLowerCase().trim();

                if (ingredient.indexOf(tag) !== -1) {
                    hasTag = true;
                    break;
                }
            }

            for (var l = 0; l < ustensils.length; l++) {
                var ustensil = ustensils[l].toLowerCase().trim();

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


export { searchRecipes, filterWithTags };