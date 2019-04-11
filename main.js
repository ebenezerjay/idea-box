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
var cardQuality = document.querySelector('.card-bottom-quality');
var noIdeaDisplay = document.querySelector('.main-no-idea-display');

var qualitiesButtons = document.getElementsByTagName('li');

var ideas = JSON.parse(localStorage.getItem('idea-card')) || [];
const qualities = ['Swill', 'Plausible', 'Genius'];

/*---------- Event Listeners -----------*/

inputSearch.addEventListener('input', searchIdeas);
inputIdeaTitle.addEventListener('input', toggleSaveBtn);
inputIdeaBody.addEventListener('input', toggleSaveBtn);
btnSaveIdea.addEventListener('click', onSaveBtnPress);
window.addEventListener('load', startIdeaBox);
btnShowStarIdeas.addEventListener('click', showStars);
// liQuality.addEventListener('click', filterByQuality)


// function totes(score) {
//   score..forEach(element => {
    
//   });
  
// }
/*---------- Functions -----------------*/

function startIdeaBox(e) {
  loadIdeas();
  hideEmptyMessage();
  addLiEvents();
}


function retrieveMethods(oldIdeas) {
  ideas = [];
  for (i = 0; i < oldIdeas.length; i++) {
    var newIdea = new Idea(oldIdeas[i].id, oldIdeas[i].title, oldIdeas[i].body, oldIdeas[i].star, oldIdeas[i].quality);
    ideas.push(newIdea);
  }
}

function hideEmptyMessage () {
  if (ideas.length == 0) {
    noIdeaDisplay.style.display = 'block';
  }
  if (ideas.length !== 0) {
    noIdeaDisplay.style.display = 'none';    
  }
}

function addLiEvents() {
  for (var i = 0; i < qualitiesButtons.length; ++i) {
    qualitiesButtons[i].addEventListener('click', filterByQuality);
  }
}

function filterByQuality(e) {
  let qualValue = parseInt(e.target.value);
  let filterResults = ideas.filter(idea => idea.quality === qualValue);
  cardsArea.innerHTML = '';
  filterResults.forEach(idea => addCardToDOM(idea));
}

function showStars() {
  if(btnShowStarIdeas.innerText === 'Show Starred Ideas'){
    btnShowStarIdeas.innerText = 'Show All Ideas';
    var filterResults = ideas.filter(idea => idea.star === true)
  }else{
    btnShowStarIdeas.innerText = 'Show Starred Ideas';
    // var filterResults = ideas.filter(idea => idea.star === false)
    retrieveMethods();
    loadIdeas()
  }
  cardsArea.innerHTML = '';
  filterResults.forEach(idea => addCardToDOM(idea));
}

function searchIdeas(e) {
  var searchQuery = inputSearch.value.toLowerCase();
  var searchResults = ideas.filter(card => card.title.toLowerCase().includes(searchQuery) || card.body.toLowerCase().includes(searchQuery));
  cardsArea.innerHTML = '';
  searchResults.forEach(card => addCardToDOM(card));
}

function onSaveBtnPress(e){
  e.preventDefault();
  createNewIdea();
  toggleSaveBtn();
  khalidify();
  hideEmptyMessage();
}

function createNewIdea() {
  var newIdea = new Idea(Date.now(), inputIdeaTitle.value, inputIdeaBody.value);
  addCardToDOM(newIdea);
  ideas.push(newIdea);
  newIdea.saveToStorage(ideas);
  clearCardForms();
  var cardBody = document.querySelectorAll('.card-body');
}

function clearCardForms() {
  document.querySelector(".card-add-form").reset();
}

function enterKeyPress(e){
  if(e.key === 'Enter'){
  e.target.blur();
  }
}

function addCardToDOM(idea) {
  var cardClone = cardTemplate.content.cloneNode(true);
  var cardQuery = cardClone.querySelector('.card');
  var qualityName = qualities[idea.quality];
  cloneQueries(cardClone, qualityName, idea);
  cardQuery.addEventListener('click', cardActions);
  cardQuery.addEventListener('input', editText);
  cardsArea.insertBefore(cardClone, cardsArea.firstChild);
}

function cloneQueries(cardClone, qualityName, idea) {
  cardClone.querySelector('.card').dataset.id = idea.id;
  cardClone.querySelector('.card-title').innerText = idea.title || 'Idea Title';
  cardClone.querySelector('.card-body').innerText = idea.body || 'Lorem Ipsum';
  cardClone.querySelector('.card-bottom-quality').innerText = qualityName;
  starCheck(idea, cardClone);
}

function starCheck(idea, cardClone) {
  if (idea.star === true) {
    cardClone.querySelector('.star-icon').setAttribute('src', 'images/star-active.svg');
  }
  if (idea.star === false) {
    cardClone.querySelector('.star-icon').setAttribute('src', 'images/star.svg');
  }
}

function toggleSaveBtn(e) {
  if (inputIdeaBody.value && inputIdeaTitle.value != '') {
    btnSaveIdea.disabled = false;
  } else {
    btnSaveIdea.disabled = true;
  }
}


function cardActions(e) {
  e.preventDefault();
  if (e.target.matches('.card-top-icon-remove')) {
    removeCard(e);
  }
  if (e.target.matches('.card-bottom-icon')) {
    voteCard(e);
  }
  if (e.target.matches('.star-icon')) {
    starChange(e);
  }
  if (e.target.matches('.card-body')){
    enterKeyPress(e);
  }
}

function loadIdeas() {
  if (ideas.length > 10) {
   var slicedIdeaArr = ideas.slice(ideas.length - 10);
    for (var i = 0; i < slicedIdeaArr.length; i++) {
      addCardToDOM(slicedIdeaArr[i].id, slicedIdeaArr[i].title, slicedIdeaArr[i].body, slicedIdeaArr[i].quality);
    }
  } else {
      for (var i = 0; i < ideas.length; i++) {
      addCardToDOM(ideas[i]);
      }
    }
  retrieveMethods(ideas);
}

function editText(e) {
  var editedText = e.target.innerText;
  var ideaIndex = ideas.indexOf(targetIdea);
  var cardId = e.target.parentNode.parentNode.getAttribute('data-id');
  var parsedId = parseInt(cardId);
  var targetIdea = ideas.find(function(idea) {
    return idea.id === parsedId;
  });
  if (e.target.matches('.card-title')) {
    targetIdea.updateTitle(targetIdea, editedText)
  }
  if (e.target.matches('.card-body')) {
  targetIdea.updateBody(targetIdea, editedText)     
  }
}

function removeCard(e) {
  var cardFull = e.target.parentNode.parentNode;
  var ideaIndex = ideas.indexOf(targetIdea);
  var cardId = e.target.parentNode.parentNode.getAttribute('data-id');
  var parsedId = parseInt(cardId);
  var targetIdea = ideas.find(function(idea) {
    return idea.id === parsedId;
  });
  e.target.parentNode.parentNode.parentNode.removeChild(cardFull);
  targetIdea.deleteFromStorage(ideaIndex);
  hideEmptyMessage();
}

function voteCard(e) {
  const cardId = e.target.parentNode.parentNode.dataset.id;
  const parsedId = parseInt(cardId);
  const targetIdea = ideas.find(function(idea) {
    return idea.id === parsedId;
  });
  let ideaIndex = ideas.indexOf(targetIdea);
  let qualityName = e.target.parentNode.querySelector('.card-bottom-quality');
  if (e.target.matches('.card-bottom-icon-upvote')) {
    targetIdea.upvote(ideaIndex);
  }
  if (e.target.matches('.card-bottom-icon-downvote')) {
    targetIdea.downvote(ideaIndex);
  }
  qualityName.innerText = qualities[ideas[ideaIndex].quality];
}


function khalidify() {
  var body = document.querySelector('.card-body')
  if (inputIdeaTitle.innerText == 'Khalid') {
    // console.log('whatup')
    body.forEach(function () {
      body.innerText +=
        "Lorem Khaled Ipsum is a major key to success. Bless up. Learning is cool, but knowing is better, and I know the key to success. They never said winning was easy. Some people can’t handle success, I can. Look at the sunset, life is amazing, life is beautiful, life is what you make it. The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion! You see the hedges, how I got it shaped up? It’s important to shape up your hedges, it’s like getting a haircut, stay fresh";
    })
  }
}

function starChange(e) {
  var cardId = e.target.parentNode.parentNode.getAttribute('data-id');
  var parsedId = parseInt(cardId);
  var ideaIndex = ideas.indexOf(targetIdea);
  var targetIdea = ideas.find(function(idea) {
    return idea.id === parsedId;
  });
  var starIcon = e.target;
  targetIdea.changeStar();
  if (targetIdea.star === true) {
    starIcon.setAttribute('src', 'images/star-active.svg');
  }
  if (targetIdea.star === false) {
    starIcon.setAttribute('src', 'images/star.svg');
  }
}