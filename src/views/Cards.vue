<template>
  <div class="cards">
    <Navigation></Navigation>
    <CreateNewToDo v-on:create-new-card="addNewCard" v-show="onFilter"></CreateNewToDo>
    <div v-show="!onFilter">
      <h2>Filtered by {{filteredTag}} tag</h2>
      <a @click="cancelFiltration" class="uk-close uk-close-alt closeBtn" uk-icon="icon: close;"></a>
    </div>
    <ToDoCard v-for="card in cards" :key="card.id" :title="card.title" :body="card.body" :id="card.id"
        :creationTime="card.creationTime" :lastEditTime="card.lastEditTime" :tags="card.tags" :tagsValue="getTags(card.tags)"
              @delete-card="deleteCard"
              @edit-card="updateEdited"
              @add-tag="saveTag"
              @delete-tag="deleteTag"
              @filter-cards="filterCards">
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
      cards:[],
      onFilter: true,
      filteredTag: ""
    }
  },
  created(){
      this.cards = this.$storage.getAllCards();
  },
  methods:{
    addNewCard(cardData){
      this.cards.unshift( this.$storage.createCard(cardData) );
    },
    deleteCard(id){
      this.$storage.delete(id);
      this.cards = this.$storage.getAllCards();
    },
    updateEdited(editedData){
      this.$storage.edit(editedData);
      this.cards = this.$storage.getAllCards();
    },
    saveTag(tagData){
      this.$storage.assignTagToCard(tagData);
    },
    getTags(tagIDs){
      let tagsValue = [];
      if(tagIDs){
        for (let pair of this.$storage.savedTags) {
          if(tagIDs.indexOf(pair[0]) != -1) {
            tagsValue.push(pair[1])
          }
        }
      }
      return tagsValue;
    },
    deleteTag(tagData){
      this.$storage.deleteTag(tagData);
    },
    filterCards(tagText){
      this.cards = this.$storage.filterCards(this.$storage.getSavedTagID(tagText));
      this.onFilter = false;
      this.filteredTag = tagText;
    },
    cancelFiltration(){
      this.cards = this.$storage.getAllCards();
      this.onFilter = true;
    }
  }
};
</script>

<style>

h2{
  display: inline-block;
  font-family: 'Open Sans', 'Roboto', sans-serif;
}
.closeBtn {
  display: inline-block;
  margin-left:10px;

}
.uk-close-alt{
padding: 2px;
border-radius: 50%;
background: #fff;
opacity: 1;
box-shadow: 0 0 0 1px rgba(0,0,0,.1),0 0 6px rgba(0,0,0,.3);
}

</style>
