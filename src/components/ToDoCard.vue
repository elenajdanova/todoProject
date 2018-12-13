<template>
  <div class= "todoCard">
    <div class="uk-width-expand uk-flex uk-flex-center uk-margin-top uk-flex">
      <div class="uk-flex uk-flex-column ">
        <div class="uk-margin uk-margin-medium-bottom"></div>
        <div v-show="!isEditing"
        class="uk-card uk-card-default uk-margin-bottom uk-width-xxlarge">
          <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
              <h4 class="uk-card-title uk-margin-remove-bottom">{{title}}</h4>
            </div>
          </div>
          <div class="uk-card-body uk-text-left">
            <p>{{body}}</p>
          </div>
          <div class="uk-card-footer uk-text-left">
            <div class="uk-grid">
              <div class="uk-text-meta uk-width-auto">
                <time v-show="!toggleEditTime">{{creationTime}}</time>
                <time v-show="toggleEditTime">{{lastEditTime}}</time>
              </div>
              <div class="uk-text-meta uk-width-expand">
                <span v-for="tag in tagsValue" class="onTag">
                  <span @click="filterCardsByTeg(tag)" class="uk-label uk-text-lowercase tags">{{tag}}</span>
                  <button @click="deleteTag(tag)"
                  type="button" class="uk-icon-link deleteBtn"
                  uk-icon="icon: trash;"></button>
               </span>
              </div>
              <div class="uk-text-meta uk-margin-remove-top uk-width-auto">
                <a class="uk-icon-link uk-margin-small-right uk-text-primary"
                uk-icon="icon: check; ratio: 1.5"></a>
                <a @click="deleteCard"
                class="uk-icon-link uk-margin-small-right"
                uk-icon="icon: trash;"></a>
                <a @click="showForm"
                class="uk-icon-link uk-margin-small-right"
                uk-icon="file-edit"></a>
                <button type="button"
                class="uk-icon-link"
                uk-icon="more-vertical"></button>
                <div v-show="toggle" uk-dropdown="mode: click">
                  <ul class="uk-nav uk-dropdown-nav">
                    <li><a @click="showTagsInput">Add tag</a></li>
                    <Tags v-show="isEditingTags"
                          @show-tag="showTag"></Tags>
                    <!-- This part is hidden while editing tags -->
                    <div v-show="!isEditingTags">
                    <li><a>Item</a></li>
                    <li><a>Item</a></li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- This part is visible only in editing card mode -->
        <form v-show="isEditing" v-on:submit.prevent="editCard">
          <fieldset class="uk-fieldset uk-card uk-card-default uk-margin-bottom uk-width-xxlarge">
            <div>
              <input v-model="editedTitle"
              class="uk-input" type="text">
            </div>
            <div>
              <textarea v-model="editedBody"
              class="uk-textarea" rows="3"></textarea>
              <button class="uk-button uk-button-primary uk-align-right">Save</button>
            </div>
          </fieldset>
        </form>
        <!-- END This part is visible only in editing card mode -->
      </div>
    </div>
  </div>
</template>

<script>

import Tags from "@/components/Tags.vue";

  export default {
    name: "ToDoCard",
    components: {
      Tags
    },
    props: {
      id: Number,
      title: String,
      body: String,
      creationTime: String,
      lastEditTime: String,
      tags: Array,
      tagsValue: Array
    },
    data: function() {
      return{
        isEditing: false,
        editedTitle: "",
        editedBody: "",
        wasEdited: false,
        isEditingTags: false,
        tag: "",
        toggle: true
      }
  },
  methods:{
    deleteCard(){
      this.$emit('delete-card', this.id);
    },
    editCard(){
      this.$emit('edit-card', {title:this.editedTitle, body:this.editedBody, id:this.id, creationTime:this.creationTime, lastEditTime:this.lastEditTime, tags: this.tags});
      this.isEditing = false;
    },
    showForm(){
       this.editedTitle= this.title;
       this.editedBody= this.body;
       this.isEditing = true;
    },
    toggleEditTime(){
      if(this.creationTime === this.lastEditTime){
        this.wasEdited = false
      } else {
        this.wasEdited = true
      }
      return this.wasEdited;
    },
    showTagsInput(){
      this.isEditingTags = !this.isEditingTags;
    },
    showTag(tagData){
      this.tag = tagData.tagText;
      this.$emit('add-tag', {tagText:this.tag, id:this.id});
      this.showTagsInput();
      this.toggle = false;
   },
    deleteTag(tag){
      this.$emit('delete-tag', {tagText:tag, id:this.id});
    },
    filterCardsByTeg(tagText){
      this.$emit('filter-cards', tagText)
    }
  }
}
</script>

<style>
.uk-dropdown{
  padding: 20px;
}

.uk-position-small{
  margin: 5px 20px;
}
.tags{
  margin: 0 1px;
  border-radius: 10px;
}

li a:hover  {
  background-color: #ebebebc4;
}
.deleteBtn{
  display: none;
}

.onTag:hover .deleteBtn{
  display:inline;
}

h4{
  font-family: 'Open Sans', 'Roboto', sans-serif;
}
p,a,span{
  font-family: 'Roboto','Open Sans', sans-serif;
}
</style>
