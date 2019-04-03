/*---------- Query Selectors -----------*/

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
var cardTemplate = document.querySelector('template'); 
var noIdeaDisplay = document.querySelector('.main-no-idea-display');

/*---------- Event Listeners -----------*/

inputSearch.addEventListener('input', searchIdeas);

inputIdeaTitle.addEventListener('input', toggleSaveBtn);
inputIdeaBody.addEventListener('input', toggleSaveBtn);

btnSaveIdea.addEventListener('click', onSaveBtnPress);

btnNewQuality.addEventListener('click', createNewQuality)

window.addEventListener('load', getIdeas)
/*---------- Functions -----------------*/

function searchIdeas(e) {

}
function onSaveBtnPress(e){
  e.preventDefault();
  createNewIdea();
  toggleSaveBtn();
  khalidify();
}
function createNewIdea() {
  var ideas = getIdeas();
  var newIdea = new Idea(Date.now(), inputIdeaTitle.value, inputIdeaBody.value);
  newIdea.saveToStorage(ideas);
  console.log(newIdea);
  document.querySelector(".card-add-form").reset()
  noIdeaDisplay.style.display = 'none';
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
  cardClone.querySelector('.card-title').innerText = idea.title || 'Idea Title';
  cardClone.querySelector('.card-body').innerText = idea.body || 'Lorem Ipsum';
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

function khalidify(){
  var body = document.querySelector('.card-body')
  if(inputIdeaTitle.innerText == 'Khalid'){
    console.log('whatup')
    body.forEach(function(){
      body.innerText +=
        "Lorem Khaled Ipsum is a major key to success. Bless up. Learning is cool, but knowing is better, and I know the key to success. They never said winning was easy. Some people can’t handle success, I can. Look at the sunset, life is amazing, life is beautiful, life is what you make it. The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion! You see the hedges, how I got it shaped up? It’s important to shape up your hedges, it’s like getting a haircut, stay fresh";
    })
  }
}