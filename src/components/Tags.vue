<template>
  <div>
    <!-- This part is visible only in editing tags mode -->
    <div class="uk-margin">
      <input v-on:keyup="onTagEnter = true" v-model="tag"
      class="uk-input" type="text" placeholder="Enter tag name">
      <div v-show="onTagEnter"
            class="uk-position-small uk-position-bottom-left uk-width-expand">
        <a @click="showTags" class="uk-icon-link">
          Create "{{tag}}"</a>
      </div>
    </div>
    <!-- END This part is visible only in editing tags mode -->
  </div>
</template>

<script>
export default {
  name: "Tags",
  props: {
    tags: Array,
    tagsValue: Array
  },
  data: function() {
    return{
      tag: "",
      onTagEnter: false
    }
  },
  methods:{
    showTags(){
      this.$emit('show-tag', {tagText:this.tag});
      this.tag= "";
    }
  }
}
</script>
