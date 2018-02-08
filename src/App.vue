<template>
  <div id="app">
    <view-box ref="viewBox">
      <router-view :short-news="shortNews"></router-view>
      <tabbar slot="bottom" class="tabbar">
        <tabbar-item selected link="/">
          <i slot="icon" class="fa fa-fw fa-user"></i>
          <i slot="icon-active" class="fa fa-fw fa-users"></i>
          <span slot="label">短讯</span>
        </tabbar-item>
        <tabbar-item link="/specials">
          <i slot="icon" class="fa fa-fw fa-times"></i>
          <span slot="label">专栏</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Confirm, ViewBox } from 'vux';

const ERR_OK = 0;

export default {
  data() {
    return {
      shortNews: []
    };
  },
  components: {
    Tabbar,
    TabbarItem,
    Confirm,
    'view-box': ViewBox
  },
  methods: {},
  created() {
    this.$http.get('/api/shorts').then(response => {
      if (response.data.err_code === ERR_OK) {
        this.shortNews = response.data.data;
      }
    });
  }
};
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
#app .tabbar {
  position: fixed;
}
</style>
