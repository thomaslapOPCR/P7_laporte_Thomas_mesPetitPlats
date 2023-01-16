export function postRecipes(recipes) {
  const container = document.querySelector('#recipes-container');

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
  ingredients.map(({ ingredient, quantity = '', unit = '' }) => `<li>${ingredient} ${quantity} ${unit}</li>`).join('')}
                        </ul>
                        <p class="desc-recipes">${description}</p>
                    </div>
                </div>
            </article>
        `).join('');
}

export function noResult(message) {
  return document.querySelector('#recipes-container').innerHTML = message;
}
export default { postRecipes, noResult };
