/*---------- Query Selectors -----------*/
// search box
// title input
// body input
// save button
// down vote
// up vote
// delete
/*---------- Event Listeners -----------*/

// Search box

// title input
// body input
// save button

// on idea:
// downvote
// upvote
// delete

/*---------- Functions -----------------*/

/* When a user clicks “Save”: */

// A new idea with the provided title and body should appear in the idea list.
// The text fields should be cleared and ready to accept a new idea.
// The page should not reload.
// The idea should be persisted.It should still be present upon reloading the page.



/* Deleting an existing idea */

// Upon clicking the “Delete” button, the appropriate idea should be removed from the list.

// The page should not reload when an idea is deleted.

// The idea should be removed from localStorage.It should not re - appear on next page load.

// This update of the data model should happen in a deleteFromStorage method that is defined in the Idea class.
// How the dom gets updated using javascript should happen in the main.js file(where you should can still leverage your idea instance)



/* Editing an existing idea */

// When a user clicks the title or body of an idea in the list, that text should become an editable text field, pre - populated with the existing idea title or body.

// The user should be able to “commit” their changes by pressing “Enter / Return” or by clicking outside of the text field.

// If the user reloads the page, their edits will be reflected.

// This update of the data model should occur in an updateContent method that is defined in the Idea class.

// How the dom gets updated using javascript should happen in the main.js file(where you should can still leverage your idea instance)



/* Changing the quality of an idea */

// As we said above, ideas should start out as “swill.” In order to change the recorded quality of an idea, the user will interact with it from the idea list.

// Each idea in the list should include an “upvote” and “downvote” button.

// Clicking upvote on the idea should increase its quality one notch(“swill” → “plausible”, “plausible” → “genius”).

// Clicking downvote on the idea should decrease its quality one notch(“genius” → “plausible”, “plausible” → “swill”).

// Incrementing a “genius” idea or decrementing a “swill” idea should have no effect.

// This update of the data model should occur in an updateQuality method that is defined in the Idea class.

// How the dom gets updated using javascript should happen in the main.js file(where you should can still leverage your idea instance)



/* Filtering and Searching by Text */

// As a user types in the search box, the list of ideas should filter in real time to only display ideas whose title or body include the user’s text.The page should not reload.

// Clearing the search box should restore all the ideas to the list.



/* Filtering by Importance */

// The application should allow users to filter the idea list based on level of quality.

// Your application should have 3 buttons corresponding to each level of importance(swill, plausible, and genius).

// When one of the filter buttons is clicked, the idea list should only display the ideas with the selected quality.



/* Recent Ideas */

// The application should only show the ten most recent Ideas on page load.

// The application should contain a button labeled Show more....

// When a user clicks on the Show more...button, the list should load all of the remaining ideas.

// Once the remaining ideas are loaded, the Show more...button should switch to a Show less...button.

// When a user clicks on the Show less...button, the list should switch back to being the first 10 ideas only.

// This functionality should toggle back and forth based on that button click.

