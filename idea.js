class Idea {
  constructor(id, title, body, quality=0){
    this.id = id;
    this.title = title;
    this.body = body;
    this.star = false;
    this.quality = quality;
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

  deleteFromStorage(ideas, index){
    ideas.splice(index, 1)
  }

}