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

var ideasArea = document.querySelector('main')
var cardTitle = document.querySelector('.card-title');
var cardBody = document.querySelector('.card-body');
var cardQuality = document.querySelector('.card-bottom-quality')

// save button
// search box

/* on card */
// down vote
// up vote
// delete
// star

/* on aside */
// show starred
// filter by quality
// new quality input
// add new quality button

/*---------- Event Listeners -----------*/

// Search box
inputSearch.addEventListener('input', searchIdeas);
// title input

inputIdeaTitle.addEventListener('input', toggleSaveBtn)
inputIdeaBody.addEventListener('input', toggleSaveBtn)
// body input
// save button
btnSaveIdea.addEventListener('click', createNewIdea);
// on idea:
// title
btnNewQuality.addEventListener('click', createNewQuality)
// content
// btnShowStarIdeas.addEventListener('click', filterStarIdeas)
// downvote

// upvote
// delete
// star

// 
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

function toggleSaveBtn() {
  if (inputIdeaBody.value && inputIdeaTitle.value != '') {
    btnSaveIdea.disabled = false;
  } else {
    btnSaveIdea.disabled = true;
  }
}