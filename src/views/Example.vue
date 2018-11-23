<template>
  <div class="about">
    <h1>This is an EXAMPLE page</h1>
    <MyComponent msg="LaLa"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MyComponent from "@/components/MyComponent.vue";

export default {
  name: "example",
  components: {
    MyComponent
  }
};
</script>
