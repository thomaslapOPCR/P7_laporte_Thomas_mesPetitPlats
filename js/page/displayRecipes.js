export const recipesDisplay = (data)=>{

    const {id,name,time,description} = data


    function setIngredients(ingredients = data.ingredients) {
        const ingredientsList = document.createElement('ul');
        ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            console.log(ingredient)
            ingredientItem.innerHTML = `
           ${ingredient.ingredient} ${ingredient.quantity || ' '} ${ingredient.unit || ' '}
        `;
            ingredientsList.appendChild(ingredientItem);
        });
        return ingredientsList;
    }
    function DataRecipes() {
        const ingredientsList = setIngredients();
        const article = document.createElement('article')
        article.setAttribute('class','card');
        article.setAttribute('data-index',id)

        article.innerHTML = `
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
                    ${ingredientsList.outerHTML}
                    <p class="desc-recipes">${description}</p>
	            </div>
	        </div>`;

        return (article);
        }
    return {DataRecipes};
}

export function iterateDatas(data){
    const container = document.querySelector('#recipes-container');
    data.forEach((data) => {
        const model = recipesDisplay(data);
        container.appendChild(model.DataRecipes());
    });
}


