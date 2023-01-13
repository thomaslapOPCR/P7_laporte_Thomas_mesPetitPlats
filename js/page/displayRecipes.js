export const recipesDisplay = (data) => {
    const { id, name, time, description, ingredients = [] } = data;

    const ingredientsList = ingredients.map(({ ingredient, quantity = '', unit = '' }) => {
        return `<li>${ingredient} ${quantity} ${unit}</li>`;
    });

    const article = document.createElement('article');
    article.setAttribute('class', 'card');
    article.setAttribute('data-index', id);

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
                <ul>${ingredientsList.join('')}</ul>
                <p class="desc-recipes">${description}</p>
            </div>
        </div>`;

    return {
        DataRecipes: () => article
    };
};

export function iterateDatas(data) {
    const container = document.querySelector('#recipes-container');
    data.forEach((data) => {
        const model = recipesDisplay(data);
        container.appendChild(model.DataRecipes());
    });
}