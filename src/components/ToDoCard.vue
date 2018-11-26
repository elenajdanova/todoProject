<template>
  <div class= "todoCard">
    <div class="uk-width-expand uk-flex uk-flex-center uk-margin-top uk-flex">
      <div class="uk-flex uk-flex-column ">
        <div class="uk-margin uk-margin-medium-bottom"></div>
        <div v-show="!isEditing"
        class="uk-card uk-card-default uk-margin-bottom uk-width-xxlarge">
          <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
              <h3 class="uk-card-title uk-margin-remove-bottom">{{title}}</h3>
            </div>
          </div>
          <div class="uk-card-body">
            <p>{{body}}</p>
          </div>
          <div class="uk-card-footer">
            <div class="uk-grid">
              <div class="uk-text-meta uk-margin-remove-top uk-width-auto">
                <time v-show="!toggleEditTime">{{creationTime}}</time>
                <time v-show="toggleEditTime">{{lastEditTime}}</time>
              </div>
              <div class="uk-text-meta uk-margin-remove-top uk-width-expand">
                <span class="uk-label uk-text-lowercase">one</span>
                <span class="uk-label uk-text-lowercase">two</span>
                <span class="uk-label uk-text-lowercase">three</span>
              </div>
              <div class="uk-text-meta uk-margin-remove-top uk-width-auto">
                <a href="#"
                class="uk-icon-link uk-margin-small-right uk-text-primary"
                uk-icon="icon: check; ratio: 1.5"></a>
                <a @click="deleteCard"
                href="#"
                class="uk-icon-link uk-margin-small-right"
                uk-icon="icon: trash;"></a>
                <a @click="showForm"
                href="#"
                class="uk-icon-link uk-margin-small-right"
                uk-icon="file-edit"></a>
                <button type="button"
                class="uk-icon-link"
                uk-icon="more-vertical"></button>
                <div uk-dropdown>
                  <ul class="uk-nav uk-dropdown-nav">
                    <li class="uk-active"><a href="#">Active</a></li>
                    <li><a href="#">Item</a>  </li>
                    <li class="uk-nav-header">Header</li>
                    <li><a href="#">Item</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- This part is visible only in editing mode -->
        <form v-show="isEditing">
          <fieldset class="uk-fieldset uk-card uk-card-default uk-margin-bottom uk-width-xxlarge">
            <div>
              <input v-model="editedTitle"
              class="uk-input" type="text">
            </div>
            <div>
              <textarea v-model="editedBody"
              class="uk-textarea" rows="3"></textarea>
              <button @click="editCard"
              class="uk-button uk-button-primary uk-align-right">Save</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ToDoCard",
    props: {
      id: Number,
      title: String,
      body: String,
      creationTime: String,
      lastEditTime: String
    },
    data: function() {
      return{
        isEditing: false,
        editedTitle: "",
        editedBody: "",
        wasEdited: false
      }
  },
  methods:{
    deleteCard(){
      this.$emit('delete-card', this.id);
    },
    editCard(){
      this.$emit('edit-card', {title:this.editedTitle, body:this.editedBody, id:this.id, creationTime:this.creationTime});
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
    }
  }

}

</script>
