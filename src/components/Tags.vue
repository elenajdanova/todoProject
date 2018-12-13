<template>
  <div>
    <div class="uk-margin">
      <input v-on:input="onInputTag" v-model="tag"
      class="uk-input" type="text" placeholder="Enter tag name">
      <div v-show="toggleSavedOrNewTag"
            class="uk-position-small uk-width-expand">
        <a @click="showTags" class="uk-icon-link uk-position-bottom createBtn">Create "{{tag}}"</a>
        </div>
        <div v-show="onTagEnter">
          <ul class="uk-list uk-margin-auto">
            <li v-for="match in filtered" class="list" data-uk-button-checkbox>
              <a @click="addFilteredTag(match)">{{match}}</a>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Tags",
  data: function() {
    return{
      tag: "",
      onTagEnter: false,
      savedOrNew: false,
      filtered: Array
    }
  },
  methods:{
    showTags(){
      this.$emit('show-tag', {tagText:this.tag});
      this.tag= "";
    },
    filterTags(target){
      let tagData = this.$storage.getAllTags();
      if(target){
        this.filtered = tagData.filter(function(item) {
          return item.toLowerCase().includes(target.toLowerCase())
        })
      } else {
        this.filtered = [];
      }
    },
    onInputTag(e){
      this.onTagEnter= true;
      this.filterTags(e.target.value);
    },
    addFilteredTag(match){
      this.$emit('show-tag', {tagText:match});
    },
    toggleSavedOrNewTag(){
      this.savedOrNew == !this.onTagEnter;
    }
  }
}
</script>
<style>
.createBtn{
  padding: 5px 5px 5px 20px;
}
.createBtn:hover{
  background-color: #a89d9d33;
}
.list a{
  padding: 2px;
}
a{
  font-family: 'Roboto','Open Sans', sans-serif;
}
</style>
