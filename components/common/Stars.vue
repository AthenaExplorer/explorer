<template>
  <ul class="flex items-center justify-center">
    <li v-for="(src, i) in initHtml" :key="'star'+ i">
      <img :class="[className]" :src="src" alt="">
    </li>
  </ul>
</template>
<script>
export default {
  name: 'stars',

  props: ['score', 'type', 'className'],

  computed: {
    getStartType() {
      let imgsrc
      if (this.type == 'full') {
        imgsrc = {
          star: this.starFull,
          starHalf: this.starFullHalf
        }
      } else {
        imgsrc = {
          star: this.star,
          starHalf: this.starHalf
        }
      }
      return imgsrc
    },
    initHtml() {
      let imgsrt = this.getStartType
      let score = Number(this.score)
      if (Number.isNaN(score)) {
        return []
      }
      let stars
      score = Number(this.score) / 2
      if (score % 1 == 0) {
        stars = new Array(score).fill(imgsrt.star)
      } else {
        stars = new Array(Math.floor(score)).fill(imgsrt.star).concat([imgsrt.starHalf])
      }
      return stars
    }
  },

  data() {
    return {
      starFull: require('~/assets/img/icon-star-full.png'),
      starFullHalf: require('~/assets/img/icon-star-full-half.png'),
      star: require('~/assets/img/icon-star.png'),
      starHalf: require('~/assets/img/icon-star-half.png'),
    }
  }
}
</script>