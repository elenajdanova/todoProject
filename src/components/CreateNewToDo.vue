<template>
  <div class= "todoCard">
    <div class="uk-width-expand uk-flex uk-flex-center uk-margin-top uk-flex">
      <div class="uk-flex uk-flex-column ">
            <div class="uk-card uk-card-default uk-margin-bottom uk-width-xxlarge">
          <form v-on:submit.prevent="onSubmit">
            <fieldset class="uk-fieldset">
              <div @click="show = !show">
                <input v-model="newTitle" class="uk-input" type="text" placeholder="Create new task...">
              </div>
              <div v-show="show">
                <textarea v-model="newBody" class="uk-textarea" rows="3" placeholder="..."></textarea>
                <button class="uk-button uk-button-primary uk-align-right">Save</button>
              </div>
            </fieldset>
          </form>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateNewToDo",
  data: function() {
    return{
      show: false,
      newTitle: "",
      newBody: ""
    }
  },
  methods: {
    onSubmit() {
      this.$emit('create-new-card', {title:this.newTitle, body:this.newBody});
      this.show = false,
      this.newTitle = "",
      this.newBod = ""
    }
  }
}
</script>

<style>
.uk-align-right{
  margin-bottom: 0;
  }</style>
