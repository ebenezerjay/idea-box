class Idea {
  constructor(id, title, body, quality){
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality || 0;
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

  upvote(index){
    if(this.quality < 2){
    this.quality++;
    }
    ideas[index].quality = this.quality++;
    this.saveToStorage(ideas);
  }

  downvote(index){
    if(this.quality > 0){
      this.quality--;
    }
      ideas[index].quality = this.quality;
      this.saveToStorage(ideas);
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

  /*
  var myProp = "propName"
  var myObj = {propName: someValue}
  myObj.propName = "someNewVal"
  myObj[myProp] = "someNewVal"
  */

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