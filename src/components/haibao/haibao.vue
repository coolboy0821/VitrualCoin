<template>
  <div class="haibao">
    <img class="haibao-img" :src="haibaoImgSrc" width="80%"/>
    <div id="qrcode" style="display:none" ref="qrcode"></div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';

const SUBSCRIBE_URL = 'http://weixin.qq.com/r/3y2kvLHES_w0rfXf93jN';

export default {
  data() {
    return {
      haibaoImgSrc: ''
    };
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    }
  },
  watch: {
    text: function(newQuestion, oldQuestion) {
      this.hechengHBImg();
    }
  },
  methods: {
    hechengHBImg() {
      // 画布区域
      let c = document.createElement('canvas');
      let ctx = c.getContext('2d');
      c.width = 600;
      c.height = 1000;
      ctx.rect(0, 0, c.width, c.height);
      ctx.fillStyle = '#fff';
      ctx.fill();

      let img = new Image(); // 背景
      let img2 = new Image(); // 二维码
      img.src = '/static/img/bg-qr-hongbao.jpg';

      // let _this = this;

      img.onload = () => {
        ctx.drawImage(img, 0, 0, c.width, c.height);

        this.$refs.qrcode.innerHTML = '';
        let qrcode = new QRCode(this.$refs.qrcode, SUBSCRIBE_URL);

        img2 = qrcode._el.childNodes[1];
        img2.onload = () => {
          // 二维码
          ctx.fillStyle = '#e7e7c9';
          ctx.fillRect(416, 806, 128, 128);
          ctx.drawImage(img2, 420, 810, 120, 120);

          ctx.font = "20px 'microsoft yahei'";
          ctx.fillStyle = '#e7e7c9';
          ctx.fillText(this.time, 85, 320);
          // 设置字体样式

          ctx.font = "25px 'microsoft yahei'";
          ctx.fillStyle = '#e7e7c9';
          // ctx.textAlign = "center";
          // 开始绘制文字--对话内容(text,x,y)
          let result = this.breakLinesForCanvas(
            this.text,
            500,
            '25px 微软雅黑'
          );
          let lineHeight = 35;
          if (result.length > 13) {
            ctx.font = "22px 'microsoft yahei'";
            result = this.breakLinesForCanvas(this.text, 500, '22px 微软雅黑');
            lineHeight = 28;
          }
          if (result.length > 16) {
            ctx.font = "20px 'microsoft yahei'";
            result = this.breakLinesForCanvas(this.text, 500, '20px 微软雅黑');
            lineHeight = 25;
          }
          if (result.length > 17) {
            ctx.font = "18px 'microsoft yahei'";
            result = this.breakLinesForCanvas(this.text, 500, '18px 微软雅黑');
            lineHeight = 23;
          }

          result.forEach(function(line, index) {
            ctx.fillText(line, 50, lineHeight * index + 360);
          });
          // 保存生成作品图片
          this.haibaoImgSrc = c.toDataURL('image/jpeg', 1);
          this.$emit('on-item-success');
        };
      };
    },
    findBreakPoint(text, width, context) {
      let min = 0;
      let max = text.length - 1;

      while (min <= max) {
        let middle = Math.floor((min + max) / 2);
        let middleWidth = context.measureText(text.substr(0, middle)).width;
        let oneCharWiderThanMiddleWidth = context.measureText(
          text.substr(0, middle + 1)
        ).width;
        if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
          return middle;
        }
        if (middleWidth < width) {
          min = middle + 1;
        } else {
          max = middle - 1;
        }
      }
      return -1;
    },
    breakLinesForCanvas(text, width, font) {
      let c = document.createElement('canvas');
      let ctx = c.getContext('2d');
      let result = [];
      let breakPoint = 0;

      if (font) {
        ctx.font = font;
      }

      while ((breakPoint = this.findBreakPoint(text, width, ctx)) !== -1) {
        result.push(text.substr(0, breakPoint));
        text = text.substr(breakPoint);
      }

      if (text) {
        result.push(text);
      }

      return result;
    }
  }
};
</script>

<style>
.haibao {
  width: 100%;
  height: 100%;
  padding-top: 10%;
}
.haibao-img {
  width: 70%;
}
</style>
