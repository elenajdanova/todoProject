<template>
  <div class="cards">
    <Navigation></Navigation>
    <CreateNewToDo v-on:create-new-card="addNewCard"></CreateNewToDo>
    <ToDoCard v-for="card in cards" :key="card.id" :title="card.title" :body="card.body" :id="card.id"
        :creationTime="card.creationTime" :lastEditTime="card.lastEditTime" :tags="card.tags" :tagsValue="getTags(card.tags)"
              @delete-card="deleteCard"
              @edit-card="updateEdited"
              @add-tag="saveTag">
    </ToDoCard> <!-- v-bind = :-->
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
import CreateNewToDo from "@/components/CreateNewToDo.vue";
import ToDoCard from "@/components/ToDoCard.vue";
import Storage from "@/services/storage.js";


export default {
  name: "cards",
  components: {
    Navigation,
    ToDoCard,
    CreateNewToDo,
  },
  data: function(){
    return{
      cards:[]
    }
  },
  created(){
      this.cards = Storage.getAllCards();
  },
  methods:{
    addNewCard(cardData){
      this.cards.unshift( Storage.createCard(cardData) );
    },
    deleteCard(id){
      Storage.delete(id);
      this.cards = Storage.getAllCards();
    },
    updateEdited(editedData){
      Storage.edit(editedData);
      this.cards = Storage.getAllCards();
    },
    saveTag(tagData){
      Storage.assignTagToCard(tagData);
    },
    getTags(tagIDs){
      let tagsValue = [];
      if(tagIDs){
        for (let pair of Storage.savedTags) {
          if(tagIDs.indexOf(pair[0]) != -1) {
            tagsValue.push(pair[1])
          }
        }
      }
      return tagsValue;
    }
  }
};
</script>
