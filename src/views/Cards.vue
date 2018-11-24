<template>
  <div class="cards">
    <Navigation></Navigation>
    <CreateNewToDo v-on:create-new-card="addNewCard"></CreateNewToDo>
    <ToDoCard v-for="card in cards" :key="card.id" v-bind:title="card.title" v-bind:body="card.body" v-bind:id="card.id"
              @delete-card="deleteCard"
              @edit-card="updateEdited">
    </ToDoCard>
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
    CreateNewToDo
  },
  data: function(){
    return{
      cards:{}
    }
  },
  created(){
      this.cards = Storage.getItem("savedCards");
  },
  methods:{
    addNewCard(cardData){

      this.cards.unshift( Storage.createCard(cardData) );
    },
    deleteCard(id){
      Storage.delete(id);
      this.cards = Storage.getItem("savedCards");
    },
    updateEdited(editedData){
      Storage.edit(editedData);
      // console.log(editedData.id + "deleted");
      // this.deleteCard(editedData.id);
      // console.log( Storage.getItem("lastID") );
      // this.addNewCard(editedData);
      // console.log( Storage.getItem("lastID") + "new" );
    }
  }
};
</script>
