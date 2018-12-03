import Time from "@/services/time.js";

const storage = {
  getItem: function(name, callback) {
    let item = JSON.parse(localStorage.getItem(name));
    if (item) {
      if (typeof callback === "function") {
        return callback(item);
      }
      return item;
    }
    return this.defaultValues[name];
  },
  defaultValues: {
    savedCards: new Map(),
    savedTags: new Map(),
    lastID: 0,
    lastTagID: 0
  },
  getAllCards() {
    return [...this.savedCards.values()]; // get array from storage Map
  },
  getNextID: function() {
    this.lastID++;
    this.save("lastID", this.lastID);
    return this.lastID;
  },
  createCard: function(cardData) {
    cardData.id = this.getNextID();
    cardData.creationTime = Time.getDateTime();
    cardData.lastEditTime = cardData.creationTime;
    cardData.tags = [];
    this.savedCards.set(cardData.id, cardData);
    this.save("savedCards", [...this.savedCards]);
    return cardData;
  },
  save: function(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  },
  delete: function(id) {
    this.savedCards.delete(id);
    this.save("savedCards", [...this.savedCards]);
  },
  edit: function(editedData) {
    editedData.lastEditTime = Time.getDateTime();
    this.savedCards.set(editedData.id, editedData);
    this.save("savedCards", [...this.savedCards]);
  },
  getTagID: function() {
    this.lastTagID++;
    this.save("lastTagID", this.lastTagID);
    return this.lastTagID;
  },
  saveTag: function(cardID, tagID) {
    let info = this.savedCards.get(cardID);
    info.tags.push(tagID);
    this.savedCards.set(cardID, info);
    return this.savedCards;
  },
  assignTagToCard: function(tagData) {
    let flag = false;
    for (let pair of this.savedTags) {
      if (pair[1] === tagData.tagText) {
        flag = true;
        tagData.tagID = pair[0];
        this.saveTag(tagData.id, tagData.tagID);
      }
    }
    if (flag == false) {
      let currentID = this.getTagID();
      this.savedTags.set(currentID, tagData.tagText);
      this.save("savedTags", [...this.savedTags]);
      this.saveTag(tagData.id, currentID);
    }
    this.save("savedCards", [...this.savedCards]);
  }
};

storage.lastID = storage.getItem("lastID");
storage.savedCards = storage.getItem("savedCards", function(arr) {
  return new Map(arr);
});
storage.lastTagID = storage.getItem("lastTagID");
storage.savedTags = storage.getItem("savedTags", function(arr) {
  return new Map(arr);
});
export default storage;
