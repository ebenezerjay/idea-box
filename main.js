/*---------- Query Selectors -----------*/
/* on main */

var inputIdeaTitle = document.querySelector('#idea-title-input');
var inputIdeaBody = document.querySelector('#idea-body-input');
var inputNewQuality = document.querySelector('#custom-quality-input');

var inputSearch = document.querySelector('#idea-search-input');

var btnShowStarIdeas = document.querySelector('#show-starred-ideas');
var btnNewQuality = document.querySelector('#add-new-quality');
var btnSaveIdea = document.querySelector("#idea-btn-save");

var iconCardStar = document.querySelector('.card-top-icon-favorite');
var iconCardClose = document.querySelector('.card-top-icon-close');
var iconCardUpvote = document.querySelector('.card-bottom-icon-upvote');
var iconCardDownvote = document.querySelector('.card-bottom-icon-downvote');

var cardsArea = document.querySelector('main')
var cardTemplate = document.querySelector('template') 
var cardTitle = document.querySelector('.card-title');
var cardBody = document.querySelector('.card-body');
var cardQuality = document.querySelector('.card-bottom-quality')

/*---------- Event Listeners -----------*/

inputSearch.addEventListener('input', searchIdeas);

inputIdeaTitle.addEventListener('input', toggleSaveBtn);
inputIdeaBody.addEventListener('input', toggleSaveBtn);

btnSaveIdea.addEventListener('click', createNewIdea);

btnNewQuality.addEventListener('click', createNewQuality)

/*---------- Functions -----------------*/

function searchIdeas(e) {

}

function createNewIdea(e) {
  e.preventDefault();
  var ideas = getIdeas();
  var newIdea = new Idea(Date.now(), inputIdeaTitle.value, inputIdeaBody.value);
  newIdea.saveToStorage(ideas);
  console.log(newIdea);
  document.querySelector(".card-add-form").reset()
  addCardToDOM(newIdea)
}

function createNewQuality(e){
  e.preventDefault();
  // Not sure what they want us to do here?
}

function getIdeas(){
  var ideasString = localStorage.ideas || '[]';
  return JSON.parse(ideasString);
}

function storeIdeas(){
  localStorage.ideas = JSON.stringify(ideas);
}

function addCardToDOM(idea) {
  var qualities = ['Swill', 'Plausible', 'Genius']
  var cardClone = cardTemplate.content.cloneNode(true);
  cardClone.querySelector('section').dataset.id = idea.id;
  cardClone.querySelector('.card-title').innerText = idea.title;
  cardClone.querySelector('.card-body').innerText = idea.body;
  cardClone.querySelector('.card-bottom-quality').innerText = 'swill';
  getIdeas().forEach(idea => addCardToDOM(idea));
  cardsArea.insertBefore(cardClone, cardsArea.firstChild)
}

function toggleSaveBtn() {
  if (inputIdeaBody.value && inputIdeaTitle.value != '') {
    btnSaveIdea.disabled = false;
  } else {
    btnSaveIdea.disabled = true;
  }
}