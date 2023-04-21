<template>
  <div class="panel">
    <div>
      <h6>Výběr šablony</h6>
    </div>
      <img @dblclick="handleClick($event, img)" class="rounded" v-for="img in images" v-bind:src="img"/>
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
import template_info from "../model/template_class";

export default {
  methods: {
    choose_template_auto(img) {
      let cur_page = this.check_pages_arr()
      if (img === Img1) {
        if (this.check_pages_arr()) {
          cur_page.teplates_on_single_page.push('auto_templ_1/1')
          let new_template = new template_info(this.$store.state.template_cnt++, 'auto_1/1')
          cur_page.templates_on_page.push(new_template)
        }
      } else if (img === Img2) {
        if (this.check_pages_arr()) {
          cur_page.teplates_on_single_page.push('auto_templ_1/2')
          let new_template = new template_info(this.$store.state.template_cnt++, 'auto_1/2')
          cur_page.templates_on_page.push(new_template)
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
    check_pages_arr(manual) {
      for (let page of this.$store.state.inf.pages) {
        if (page.c_stranky === this.$store.state.store_act_index) {
          if (page.teplates_on_single_page.length === 0) {
            return page
          } else {
            if (manual === 1) {
              return page
            } else {
              console.log('Na teto strance je uz vybrana sablona, odeberte sablonu a akci opakujte')
              return false
            }
          }
        }
      }
    },
    choose_template_manually(img) {
      let cur_page = this.check_pages_arr(1)
      if (img === Img1) {
          cur_page.teplates_on_single_page.push('templ_1/1')
          let new_template = new template_info(this.$store.state.template_cnt++, '1/1')
          cur_page.templates_on_page.push(new_template)
      } else if (img === Img2) {
        if (this.check_space_left(cur_page)) {
          if (cur_page.templates_on_page.length === 0) {
            cur_page.teplates_on_single_page.push('templ_1/2')
            let new_template = new template_info(this.$store.state.template_cnt++, '1/2')
            cur_page.templates_on_page.push(new_template)
          }
        }
      }  else if (img === Img3) {

      }  else if (img === Img4) {

      }  else if (img === Img6) {

      }  else if (img === Img8) {

      }  else if (img === Img_P_1) {

      }  else if (img === Img_P_2_a) {

      }  else if (img === Img_P_2_b) {

      }  else if (img === Img_P_3) {

      }  else if (img === Img_P_4) {

      }  else if (img === Img_T_1) {

      }
    },
    check_space_left(current) {
      console.log(current.templates_on_page)
      console.log('HEEHE')
      for (let space of current.filled) {
        













      }
      return current
    },
    handleClick(event, img) {
      if (this.ctrlPressed) {
        this.choose_template_manually(img);
      } else {
        this.choose_template_auto(img);
      }
    },
    handleKeyDown(event) {
      if (event.ctrlKey) {
        this.ctrlPressed = true;
      }
    },
    handleKeyUp() {
      this.ctrlPressed = false;
    },
  },
  data() {
    return {
      images: [Img1, Img2, Img3, Img4, Img6, Img8, Img_P_1, Img_P_2_a, Img_P_2_b, Img_P_3, Img_P_4, Img_T_1],
      ctrlPressed: false
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  },
  destroyed() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  },
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
