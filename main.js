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

window.addEventListener('load', function() {
  loadIdeas();
  if (ideas.length != 0) {
    noIdeaDisplay.style.display = 'none';
  }
})
/*---------- Functions -----------------*/


function retrieveMethods(oldIdeas) {
  ideas = [];
  for (i = 0; i < oldIdeas.length; i++) {
    var newIdea = new Idea(oldIdeas[i].id, oldIdeas[i].title, oldIdeas[i].body, oldIdeas[i].star, oldIdeas[i].quality)
    ideas.push(newIdea);
  }
}


function searchIdeas(e) {
  
}

function onSaveBtnPress(e){
  e.preventDefault();
  createNewIdea();
  toggleSaveBtn();
  khalidify();
  if (ideas.length >= 1) {
    noIdeaDisplay.style.display = 'none';
  }
}

function createNewIdea() {
  // var ideaInfo = {id:Date.now(),title: inputIdeaTitle.value, body: inputIdeaBody.value}
  var newIdea = new Idea(Date.now(), inputIdeaTitle.value, inputIdeaBody.value);
  addCardToDOM(newIdea);
  console.log(ideas);
  ideas.push(newIdea);
  newIdea.saveToStorage(ideas);
  clearCardForms();
  console.log(ideas);
}

function clearCardForms() {
  document.querySelector(".card-add-form").reset();
  noIdeaDisplay.style.display = 'none';
}

function createNewQuality(e){
  e.preventDefault();
  // Not sure what they want us to do here?
}

function storeIdeas(){
  localStorage.ideas = JSON.stringify(ideas);
}

function addCardToDOM(idea) {
  console.log(idea);
  var qualities = ['Swill', 'Plausible', 'Genius'];
  var cardClone = cardTemplate.content.cloneNode(true);
  cardClone.querySelector('.card').dataset.id = idea.id;
  cardClone.querySelector('.card-title').innerText = idea.title || 'Idea Title';
  cardClone.querySelector('.card-body').innerText = idea.body || 'Lorem Ipsum';
  cardClone.querySelector('.card-bottom-quality').innerText = 'swill';
  cardClone.querySelector('.card-top-icon-remove').addEventListener('click', cardActions);
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
    if (e.target.matches('.card-top-icon-remove')) {
    removeCard(e);
  }
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
  retrieveMethods(ideas);
}

// function editBody(e) {
//   var indexFound = e.target.parentElement.dataset.id
//   var editedBody = e.target.innerText;
//   ideaInstance.updateIdea(parseInt(indexFound), editedBody);
//   console.log(editedBody);
// }

function removeCard(e) {
  var cardFull = e.target.parentNode.parentNode;
  var cardId = e.target.parentNode.parentNode.getAttribute('data-id');
  var parsedId = parseInt(cardId);
  var targetIdea = ideas.find(function(idea) {
    return idea.id === parsedId;
  });
  var ideaIndex = ideas.indexOf(targetIdea);
  e.target.parentNode.parentNode.parentNode.removeChild(cardFull);
  targetIdea.deleteFromStorage(ideaIndex);
}
