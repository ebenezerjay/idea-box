class Idea {
  constructor(id, title, body, quality=0){
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality;
		this.star = false;
  }

  saveToStorage(ideas){
    localStorage.setItem('idea-card', JSON.stringify(ideas));
  }

  updateQuality(vote){
    if(vote === 'upvote'){
      this.upvote()
    }else{
      this.downvote()
    }
  }

  upvote(){
    if(this.quality < 2){
    this.quality++
    }
  }

  downvote(){
    if(this.quality > 0){
      this.quality--
    }
  }

  deleteFromStorage(index) {
    ideas.splice(index, 1);
    this.saveToStorage(ideas);
	}
  
  updateBody(id, body) {
		var ideaArray = this.pullFromStorage();
		ideaArray[this.getIndex(id)].body = body;
    this.saveToStorage(ideaArray);
  }

	// updateTitle(id, title) {
	// 	var ideaArray = this.pullFromStorage();
	// 	ideaArray[this.getIndex(id)].title = title;
  //   this.saveToStorage(ideaArray);
  // }


  getIndex(id) {
    return this.pullFromStorage().findIndex(idea => idea.id === id);
	}

  pullFromStorage() {
    return JSON.parse(localStorage.getItem('idea-card'));
  }
	

}  