<template>
  <div id="app">
    <view-box ref="viewBox">
      <router-view :short-news="shortNews" :special-news="specialNews"></router-view>
      <tabbar slot="bottom" class="tabbar">
        <tabbar-item :selected="$route.path == '/'" link="/">
          <font-awesome-icon slot="icon" :icon="['far','list-alt']" />
          <font-awesome-icon slot="icon-active" :icon="['fas','list-alt']" />
          <span slot="label">短讯</span>
        </tabbar-item>
        <tabbar-item :selected="$route.path == '/specials'" link="/specials">
          <font-awesome-icon slot="icon" :icon="['far','flag']" />
          <font-awesome-icon slot="icon-active" :icon="['fas','flag']" />
          <span slot="label">专栏</span>
        </tabbar-item>
      </tabbar>
    </view-box>
    <loading :show="isLoading"></loading>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Confirm, ViewBox, Loading, dateFormat } from 'vux';
import { mapState } from 'vuex';

const ERR_OK = 0;

export default {
  data() {
    return {
      shortNews: [],
      specialNews: []
    };
  },
  components: {
    Tabbar,
    TabbarItem,
    Confirm,
    'view-box': ViewBox,
    Loading
  },
  methods: {},
  created() {
    this.$http.get('/api/shorts').then(response => {
      if (response.data.err_code === ERR_OK) {
        response.data.data.forEach(item => {
          item.CREATETIME = dateFormat(
            Date.parse(item.CREATETIME),
            'YYYY-MM-DD HH:mm:ss'
          );
        });
        this.shortNews = response.data.data;
      }
    });

    this.$http.get('/api/specials').then(response => {
      if (response.data.err_code === ERR_OK) {
        response.data.data.forEach(item => {
          item.CREATETIME = dateFormat(
            Date.parse(item.CREATETIME),
            'YYYY-MM-DD HH:mm:ss'
          );
        });
        this.specialNews = response.data.data;
      }
    });
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
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
.weui-tabbar__icon > svg {
  font-size: 24px;
  color: #999999;
}

.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > svg {
  color: #09bb07;
}
</style>
