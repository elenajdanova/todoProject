const storage = {
  getItem: function(name){
    let item = JSON.parse( localStorage.getItem(name) );
    if(item){
      return item;
    }
    return this.defaultValues[name];
  },
  defaultValues: {
    savedCards: {},
    lastID: 0
  },
  getNextID: function(){
    this.lastID++;
    this.save("lastID", this.lastID);
    return this.lastID;
  },
  createCard: function(cardData){
    let id = 0;
    id = id++;
    this.savedCards[id]=cardData;

    console.log(this.cardData);
    this.save("savedCards", this.savedCards);
    return cardData;
  },
  save: function(name, value){
    localStorage.setItem( name, JSON.stringify(value) );
  },
  delete: function(id){
    this.savedCards = this.savedCards.filter(card => card.id != id)
    this.save("savedCards", this.savedCards);
  },
  edit: function(editedData){
    console.log(editedData.id);
    //this.save(savedCards)
  }
}
storage.lastID = storage.getItem("lastID");
storage.savedCards = storage.getItem("savedCards");
export default storage;
