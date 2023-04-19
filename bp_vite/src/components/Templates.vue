<template>
  <div class="panel">
    <div>
      <h6>Výběr šablony</h6>
    </div>
      <img @dblclick="choose_template(img)" class="rounded" v-for="img in images" v-bind:src="img"/>
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
    choose_template(img) {
      //jaka sablona je vybrana
      if (img === Img1) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_1/1')
        }
      } else if (img === Img2) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_1/2')
        }
      }  else if (img === Img3) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_1/3')
        }
      }  else if (img === Img4) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_1/4')
        }
      }  else if (img === Img6) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_1/6')
        }
      }  else if (img === Img8) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_1/8')
        }
      }  else if (img === Img_P_1) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_P_1/1')
        }
      }  else if (img === Img_P_2_a) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_P_1/2_a')
        }
      }  else if (img === Img_P_2_b) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_P_1/2_b')
        }
      }  else if (img === Img_P_3) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_P_1/3')
        }
      }  else if (img === Img_P_4) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_P_1/4')
        }
      }  else if (img === Img_T_1) {
        if (this.check_pages_arr()) {
          this.check_pages_arr().teplates_on_single_page.push('auto_templ_T_1/1')
        }
      }
    },
    check_pages_arr() {
      for (let page of this.$store.state.inf.pages) {
        if (page.c_stranky === this.$store.state.store_act_index) {
          if (page.teplates_on_single_page.length === 0) {
            return page
          } else {
            console.log('Na teto strance je uz vybrana sablona, odeberte sablonu a akci opakujte')
            return false
          }
        }
      }
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
  //height: 100%;
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