<template>
  <div class="panel">
    <h6>Výběr šablony</h6>
    <div class="row">
      <div class="resize">
        <img @click="print_log()" class="rounded float-left" v-for="img in images" v-bind:src="img"/>
      </div>
    </div>
  </div>

</template>

<script>

import Img1 from '../assets/sablona_1-1.png'
import Img2 from '../assets/sablona_1-2.png'
import Img3 from '../assets/sablona_1-3.png'

export default {
  methods: {
    print_log() {
     console.log('clicked')
    }
  },
  data() {
    return {
      images: [Img1, Img2, Img3]
    }
  }
}


</script>

<style>

.panel {
  min-height: 395px;
  height: 50%;
  max-width: 18%;
  min-width: 203px;
  background: #1e549f;
  border: 3px solid #081f37;
}

.resize {
  width: 10px;
}

img{
  float: left;
  display: block;
  width: 20%;
}
</style>