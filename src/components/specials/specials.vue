<template>
  <div>
    <panel :list="formatedSpecialNews" type="5" @on-click-item="gotoWeixinPage"></panel>
  </div>
</template>

<script>
import { Panel } from 'vux';

export default {
  props: {
    specialNews: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    formatedSpecialNews() {
      let list = [];
      for (let i = 0; i < this.specialNews.length; i++) {
        list.push({
          src: this.specialNews[i].HEAD,
          fallbackSrc: '',
          title: this.specialNews[i].TITLE,
          desc: this.specialNews[i].DESC,
          url: this.specialNews[i].URL,
          meta: {
            source: this.specialNews[i].SOURCE,
            date: this.specialNews[i].CREATETIME,
            other: '其他信息'
          }
        });
      }
      return list;
    }
  },
  methods: {
    gotoWeixinPage(item) {
      window.location.href = item.url;
    }
  },
  components: {
    Panel
  }
};
</script>

<style>

</style>
