import * as Display from '../libs/display.js';
import * as Search from '../libs/search.js';


/**
 * fonction qui initialise les fonctions d'affichages est de tris
 */

function init() {
  const searchInput = document.querySelector('#searchInput');
  const searchTag = document.querySelectorAll('.search-input-content div ul');
  const tags = document.querySelector('#tagsline');
  const searchInputContent = document.querySelector('.search-input-content');

  const filterTags = [];

  Display.displayRecipesAccordingToFilter();
  searchInput.addEventListener('input', () => Display.displayRecipesAccordingToFilter());
  
  searchInputContent.querySelectorAll('div').forEach((div) => {
    div.addEventListener('click', (e) => {
      if (e.target.type === 'li') console.log('test');
      e.target.classList.toggle('active');
    });
  });

  searchTag.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.nodeName.toLowerCase() !== 'li') return;
      const color = e.target.parentElement.parentElement.dataset.color;
      filterTags.push(e.target.textContent.toLowerCase());
     Display.displayRecipesAccordingToTags(filterTags);
      Display.createTag(e.target.textContent, color);
    });
  });

  tags.addEventListener('click', (e) => {
    if (e.target.nodeName.toLowerCase() !== 'i') return;
    e.target.parentElement.remove();
    const element = e.target.previousElementSibling.textContent;
    Display.toggleVisibility(element);
    const index = filterTags.indexOf(element);
    index !== -1 ? filterTags.splice(index, 1) : '';
    Display.displayRecipesAccordingToTags(filterTags);
  });
}





init();
