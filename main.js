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
  cardClone.querySelector('.card-title').innerText = idea.title || 'Idea Title';
  cardClone.querySelector('.card-body').innerText = idea.body || 'Lorem Ipsum';
  cardClone.querySelector('.card-bottom-quality').innerText = 'swill';
  cardClone.querySelector('.card-top-icon-remove').addEventListener('click', cardActions);
  getIdeas().forEach(idea => addCardToDOM(idea));
  cardsArea.insertBefore(cardClone, cardsArea.firstChild)
}

function toggleSaveBtn(e) {
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
function cardActions(e) {
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

  if (e.target.matches('.card-top-icon-remove')) {
    removeCard();
  // }  
  // if (e.target.matches('.card-top-icon-favorite')) {
  //   favorite();
  // }
  // if (e.target.matches('.card-bottom-icon-upvote')) {
  //   cardUpvote();
  // }
  // if (e.target.matches('.card-bottom-icon-downvote')) {
  //   cardDownvote();
  // }

}

function removeCard() {
  var cardFull = document.querySelector('.card');
  cardFull.parentNode.removeChild(cardFull);
  // var cardId = e.target.parentNode.parentNode.id;
  // localStorage.removeItem('id');
}

// function cardUpvote() {

// }

// function cardDownvote() {

// }

// function favorite() {}

