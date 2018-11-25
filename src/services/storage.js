import Time from "@/services/time.js";

const storage = {
  getItem: function(name, callback){
    let item = JSON.parse( localStorage.getItem(name) );
    if(item){
      if (typeof callback === "function") {
        return callback(item);
      }
      return item;
    };

    return this.defaultValues[name];
  },
  defaultValues: {
    savedCards: new Map(),
    lastID: 0
  },
  getAllCards(){
    return [...this.savedCards.values()]; // get array from storage Map
  },
  getNextID: function(){
    this.lastID++;
    this.save("lastID", this.lastID);
    return this.lastID;
  },
  createCard: function(cardData){
    cardData.id = this.getNextID();
    cardData.creationTime = Time.getDateTime();
    this.savedCards.set(cardData.id, cardData);
    this.save("savedCards", [...this.savedCards]);
    return cardData;
  },
  save: function(name, value){
    localStorage.setItem( name, JSON.stringify(value) );
  },
  delete: function(id){
    this.savedCards.delete(id);
    this.save("savedCards", [...this.savedCards]);
  },
  edit: function(editedData){
    editedData.lastEditTime = Time.getDateTime();
    this.savedCards.set(editedData.id, editedData);
    this.save("savedCards", [...this.savedCards]);
  }
}
storage.lastID = storage.getItem("lastID");
storage.savedCards = storage.getItem("savedCards", function(arr){
  return new Map(arr);
});
export default storage;
