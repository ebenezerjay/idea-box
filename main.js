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

var cardsArea = document.querySelector('main');
var cardTemplate = document.querySelector('template') 
var cardTitle = document.querySelector('.card-title');
var cardBody = document.querySelector('.card-body');
var cardQuality = document.querySelector('.card-bottom-quality');
var noIdeaDisplay = document.querySelector('.main-no-idea-display');

var ideas = JSON.parse(localStorage.getItem('idea-card')) || [];
// var ideaInstance = new Idea();

/*---------- Event Listeners -----------*/

inputSearch.addEventListener('input', searchIdeas);
inputIdeaTitle.addEventListener('input', toggleSaveBtn);
inputIdeaBody.addEventListener('input', toggleSaveBtn);
btnSaveIdea.addEventListener('click', createNewIdea);
btnNewQuality.addEventListener('click', createNewQuality);
window.addEventListener('load', loadIdeas);

/*---------- Functions -----------------*/

function searchIdeas(e) {
  
}

function createNewIdea(e) {
  e.preventDefault();
  var ideaInfo = {id:Date.now(),title: inputIdeaTitle.value, body: inputIdeaBody.value}
  addCardToDOM(ideaInfo);
  var newIdea = new Idea(Date.now(), inputIdeaTitle.value, inputIdeaBody.value);
  ideas.push(newIdea);
  newIdea.saveToStorage(ideas);
  document.querySelector(".card-add-form").reset();
  noIdeaDisplay.style.display = 'none';
  console.log(ideas);
}

function createNewQuality(e){
  e.preventDefault();
  // Not sure what they want us to do here?
}

// function getIdeas(ideaArray){
//   var ideasString = localStorage.ideas || '[]';
//   return JSON.parse(ideasString);
// }

function storeIdeas(){
  localStorage.ideas = JSON.stringify(ideas);
}

function addCardToDOM(idea) {
  console.log(idea);
  var qualities = ['Swill', 'Plausible', 'Genius'];
  var cardClone = cardTemplate.content.cloneNode(true);
  cardClone.querySelector('section').dataset.id = idea.id;
  cardClone.querySelector('.card-title').innerText = idea.title;
  cardClone.querySelector('.card-body').innerText = idea.body;
  cardClone.querySelector('.card-bottom-quality').innerText = 'swill';
  // getIdeas().forEach(idea => addCardToDOM(ideas));
  cardsArea.insertBefore(cardClone, cardsArea.firstChild);
}

function toggleSaveBtn(e) {
  if (inputIdeaBody.value && inputIdeaTitle.value != '') {
    btnSaveIdea.disabled = false;
  } else {
    btnSaveIdea.disabled = true;
  }
  e.preventDefault();
}

function loadIdeas() {
  console.log(ideas);
  if (ideas.length > 10) {
   var slicedIdeaArr = ideas.slice(ideas.length - 10);
    for (var i = 0; i < slicedIdeaArr.length; i++) {
      addCardToDOM(slicedIdeaArr[i].id, slicedIdeaArr[i].title, slicedIdeaArr[i].body,  slicedIdeaArr[i].quality);
    }
  } else {
      for (var i = 0; i < ideas.length; i++) {
      addCardToDOM(ideas[i]);
      }
    }
}

// function editBody(e) {
//   var indexFound = e.target.parentElement.dataset.id
//   var editedBody = e.target.innerText;
//   ideaInstance.updateIdea(parseInt(indexFound), editedBody);
//   console.log(editedBody);
// }