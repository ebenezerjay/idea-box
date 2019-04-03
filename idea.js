class Idea {
  constructor(id, title, body, quality=0){
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality;
    this.star = false;
  }

  saveToStorage(ideas){
    // ideas.push(this)
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

  deleteFromStorage(index){
    this.splice(index, 1)
  }

//   updateIdea(id, title, body) {
//     var ideas = this.pullFromStorage();
//     ideas[this.getIndex(id)].title = title;
//     ideas[this.getIndex(id)].body = body;
//     this.saveToStorage(ideas);
//   }

  getIndex(id) {
    return this.pullFromStorage().findIndex(idea => idea.id === id);
	}
  pullFromStorage() {
    return JSON.parse(localStorage.getItem('idea-card'));
  }


}  