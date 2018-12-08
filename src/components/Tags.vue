<template>
  <div>
    <!-- This part is visible only in editing tags mode -->
    <div class="uk-margin">
      <input v-on:input="onInputTag" v-model="tag"
      class="uk-input" type="text" placeholder="Enter tag name">
      <div v-show="onTagEnter"
            class="uk-position-small uk-position-bottom-left uk-width-expand">
           <a @click="showTags" class="uk-icon-link">Create "{{tag}}"</a>
               <ul class="uk-list uk-margin-auto-bottom">
                <li v-for="match in filtered">
                  <a @click="addFilteredTag(match)">{{match}}</a></li>
              </ul>
      </div>
    </div>
    <!-- END This part is visible only in editing tags mode -->
  </div>
</template>

<script>
import Storage from "@/services/storage.js";

export default {
  name: "Tags",
  data: function() {
    return{
      tag: "",
      onTagEnter: false,
      filtered: Array
    }
  },
  methods:{
    showTags(){
      this.$emit('show-tag', {tagText:this.tag});
      this.filterTags();
      this.tag= "";
    },
    filterTags(target){
      let tagData = Storage.getAllTags();
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
    }
  }
}
</script>
