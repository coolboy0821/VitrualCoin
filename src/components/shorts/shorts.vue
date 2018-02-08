<template>
  <div>
    <ul>
      <li v-for="(short,newsIndex) in shortNews" :key="newsIndex" >
        <p>{{short.CONTENT}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    shortNews: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>

</style>
