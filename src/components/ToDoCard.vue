<template>
  <div class="todoCard">
    <figure class="uk-overlay">
    <div v-show="isDone" class="check_mark">
      <div class="sa-icon sa-success animate">
        <span class="sa-line sa-tip animateSuccessTip"></span>
        <span class="sa-line sa-long animateSuccessLong"></span>
        <div class="sa-placeholder"></div>
        <div class="sa-fix"></div>
      </div>
    </div>
    <figcaption v-bind:class="{'uk-overlay-background': isDone}" class="uk-overlay-panel">
    <div class="uk-width-expand uk-flex uk-flex-center uk-margin-top uk-flex card">
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
                <a @click="done"
                class="uk-icon-link uk-margin-small-right uk-text-primary"
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
  </figcaption>
    </figure>
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
        toggle: true,
        isDone: false
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
    },
    done(){
      this.isDone = true;
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

.check_mark {
  width: 80px;
  height: 130px;
  z-index: 200;
  position:absolute;
  right: 48%;
}

.uk-overlay-background{
  opacity: .5;
}

.sa-icon {
  width: 80px;
  height: 80px;
  border: 4px solid gray;
  -webkit-border-radius: 40px;
  border-radius: 40px;
  border-radius: 50%;
  margin: 20px auto;
  padding: 0;
  position: relative;
  box-sizing: content-box;
}

.sa-icon.sa-success {
  border-color: #009dd8;
}

.sa-icon.sa-success::before, .sa-icon.sa-success::after {
  content: '';
  -webkit-border-radius: 40px;
  border-radius: 40px;
  border-radius: 50%;
  position: absolute;
  width: 60px;
  height: 120px;

  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.sa-icon.sa-success::before {
  -webkit-border-radius: 120px 0 0 120px;
  border-radius: 120px 0 0 120px;
  top: -7px;
  left: -33px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 60px 60px;
  transform-origin: 60px 60px;
}

.sa-icon.sa-success::after {
  -webkit-border-radius: 0 120px 120px 0;
  border-radius: 0 120px 120px 0;
  top: -11px;
  left: 30px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 0px 60px;
  transform-origin: 0px 60px;
}

.sa-icon.sa-success .sa-placeholder {
  width: 80px;
  height: 80px;
  border: 4px solid #009dd8;
  -webkit-border-radius: 40px;
  border-radius: 40px;
  border-radius: 50%;
  box-sizing: content-box;
  position: absolute;
  left: -4px;
  top: -4px;
  z-index: 2;
}

.sa-icon.sa-success .sa-fix {
  width: 5px;
  height: 90px;

  position: absolute;
  left: 28px;
  top: 8px;
  z-index: 1;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.sa-icon.sa-success.animate::after {
  -webkit-animation: rotatePlaceholder 4.25s ease-in;
  animation: rotatePlaceholder 4.25s ease-in;
}

.sa-icon.sa-success {
  border-color: transparent\9;
}
.sa-icon.sa-success .sa-line.sa-tip {
  -ms-transform: rotate(45deg) \9;
}
.sa-icon.sa-success .sa-line.sa-long {
  -ms-transform: rotate(-45deg) \9;
}

.animateSuccessTip {
  -webkit-animation: animateSuccessTip 0.75s;
  animation: animateSuccessTip 0.75s;
}

.animateSuccessLong {
  -webkit-animation: animateSuccessLong 0.75s;
  animation: animateSuccessLong 0.75s;
}

@-webkit-keyframes animateSuccessLong {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
@-webkit-keyframes animateSuccessTip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}
@keyframes animateSuccessTip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes animateSuccessLong {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}

.sa-icon.sa-success .sa-line {
  height: 5px;
  background-color: #009dd8;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 2;
}

.sa-icon.sa-success .sa-line.sa-tip {
  width: 25px;
  left: 14px;
  top: 46px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.sa-icon.sa-success .sa-line.sa-long {
  width: 47px;
  right: 8px;
  top: 38px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

</style>
