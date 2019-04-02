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

var iconFormSearch = document.querySelector('#idea-search-input');

var ideaSection = document.querySelector('main')
var cardTitle = document.querySelector('.card-title');
var cardBody = document.querySelector('.card-body');

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
// body input
// save button
btnSaveIdea.addEventListener('click', createNewIdea);
// on idea:
// title
btnNewQuality.addEventListener('click', createNewQuality)
// content
btnShowStarIdeas.addEventListener('click', filterStarIdeas)
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
  
}

function createNewQuality(e){
  e.preventDefault()

}