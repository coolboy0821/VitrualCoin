<template>
  <div>
    <panel :list="formatedShortNews" type="4" @click="showHaibao"></panel>
  </div>
</template>

<script>
import { Panel } from 'vux';
export default {
  props: {
    shortNews: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    formatedShortNews() {
      let list = [];
      for (let i = 0; i < this.shortNews.length; i++) {
        list.push({
          src: '',
          fallbackSrc: '',
          title: '',
          desc: this.shortNews[i].CONTENT,
          url: '',
          meta: {
            source: '来源信息',
            date: this.shortNews[i].CREATETIME,
            other: '其他信息'
          }
        });
      }
      return list;
    }
  },
  components: { Panel }
};
</script>

<style>

</style>
