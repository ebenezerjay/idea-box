class Idea {
  constructor(id, title, body, quality=0){
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality;
    this.star = false;
  }

  saveToStorage(ideas){
    ideas.push(this)
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

}