<template>
  <div>
    <panel :list="formatedShortNews" type="4" @on-click-item="showHaibao"></panel>
    <div v-transfer-dom>
      <x-dialog v-model="haibaoIsShow" @click.native="haibaoIsShow=false" :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <haibao :text="curText" :time="curTime" @on-item-success="haiBaoIsSuccess"></haibao>
        <i class="fa fa-fw fa-times" style="fill:#fff;"></i>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { Panel, XDialog, TransferDomDirective as TransferDom } from 'vux';
import haibao from '../haibao/haibao';

export default {
  data() {
    return {
      haibaoIsShow: false,
      curText: '',
      curTime: ''
    };
  },
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
  components: {
    Panel,
    XDialog,
    haibao
  },
  methods: {
    showHaibao(item) {
      this.$store.commit('updateLoadingStatus', { isLoading: true });
      this.curText = item.desc;
      this.curTime = item.meta.date;
    },
    haiBaoIsSuccess() {
      this.$store.commit('updateLoadingStatus', { isLoading: false });
      this.haibaoIsShow = true;
    }
  },
  directives: {
    TransferDom
  }
};
</script>

<style>

</style>
