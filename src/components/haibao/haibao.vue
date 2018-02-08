<template>
  <div class="haibao">
    <p>{{text}}</p>
    <img class="haibao-img" src="./1.png" width="70%"/>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  }
};
</script>

<style>
.haibao {
  width: 100%;
  height: 100%;
}

</style>
