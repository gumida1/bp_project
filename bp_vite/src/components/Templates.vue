<template>
  <div class="panel">
    <div>
      <h6>Výběr šablony</h6>
    </div>
      <img @click="print_log(img)" class="rounded" v-for="img in images" v-bind:src="img"/>
  </div>

</template>

<script>

import Img1 from '../assets/sablona_1-1.png'
import Img2 from '../assets/sablona_1-2.png'
import Img3 from '../assets/sablona_1-3.png'
import Img4 from '../assets/sablona_1-4.png'
import Img6 from '../assets/sablona_1-6.png'
import Img8 from '../assets/sablona_1-8.png'
import Img_P_1 from '../assets/sablona_p_1-1.png'
import Img_P_2_a from '../assets/sablona_p_1-2_a.png'
import Img_P_2_b from '../assets/sablona_p_1-2_b.png'
import Img_P_3 from '../assets/sablona_p_1-3.png'
import Img_P_4 from '../assets/sablona_p_1-4.png'
import Img_T_1 from '../assets/sablona_t_1-1.png'

export default {
  methods: {
    print_log(img) {
     console.log(img)
    }
  },
  data() {
    return {
      images: [Img1, Img2, Img3, Img4, Img6, Img8, Img_P_1, Img_P_2_a, Img_P_2_b, Img_P_3, Img_P_4, Img_T_1]
    }
  }
}
</script>


<style>

.panel {
  overflow: auto;
  min-height: 395px;
  height: 50%;
  width: 100%;
  //min-width: 203px;
  background: #1e549f;
  border: 3px solid #081f37;
  //float: left;
}

img{
  padding: 4px;
  width: 25%;
}

.cont {
  overflow: auto !important;
}
</style>