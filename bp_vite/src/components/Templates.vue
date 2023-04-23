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
import space_info from "../model/space_class";

export default {
  methods: {
    choose_template(img, man_auto) {
      let cur_page = this.check_pages_arr(man_auto)
      if (cur_page) {
        console.log(cur_page)
        switch(img) {
          case Img1: {
            console.log('1')
            this.check_space_left(cur_page, this.$store.state.templ_1_1)
            break;
          }
          case Img2: {
            console.log('2')
            if (man_auto) {
              for (let i = 0; i < 2; i++) {
                this.check_space_left(cur_page, this.$store.state.templ_1_2)
              }
            } else {
              this.check_space_left(cur_page, this.$store.state.templ_1_2)
            }
            break;
          }
          case Img3: {
            if (man_auto) {
              for (let i = 0; i < 3; i++) {
                this.check_space_left(cur_page, this.$store.state.templ_1_3)
              }
            } else {
              this.check_space_left(cur_page, this.$store.state.templ_1_3)
            }
            break;
          }
          case Img4: {
            if (man_auto) {
              for (let i = 0; i < 4; i++) {
                this.check_space_left(cur_page, this.$store.state.templ_1_4)
              }
            } else {
              this.check_space_left(cur_page, this.$store.state.templ_1_4)
            }
            break;
          }
          case Img6: {
            if (man_auto) {
              for (let i = 0; i < 6; i++) {
                this.check_space_left(cur_page, this.$store.state.templ_1_6)
              }
            } else {
              this.check_space_left(cur_page, this.$store.state.templ_1_6)
            }
            break;
          }
          case Img8: {
            if (man_auto) {
              for (let i = 0; i < 8; i++) {
                this.check_space_left(cur_page, this.$store.state.templ_1_8)
              }
            } else {
              this.check_space_left(cur_page, this.$store.state.templ_1_8)
            }
            break;
          }
          case Img_P_1: {
            this.check_space_left(cur_page, this.$store.state.templ_p_1_1)
            break;
          }
          case Img_P_2_a: {
            if (man_auto) {
              for (let i = 0; i < 2; i++) {
                this.check_space_left(cur_page, this.$store.state.templ_p_1_2_a)
              }
            } else {
              this.check_space_left(cur_page, this.$store.state.templ_p_1_2_a)
            }
            break;
          }
          case Img_P_2_b: {
            if (man_auto) {
              for (let i = 0; i < 2; i++) {
                this.check_space_left(cur_page, this.$store.state.templ_p_1_2_b)
              }
            } else {
              this.check_space_left(cur_page, this.$store.state.templ_p_1_2_b)
            }
            break;
          }
          case Img_P_3: {
            if (man_auto) {
              for (let i = 0; i < 3; i++) {
                this.check_space_left(cur_page, this.$store.state.templ_p_1_3)
              }
            } else {
              this.check_space_left(cur_page, this.$store.state.templ_p_1_3)
            }
            break;
          }
          case Img_P_4: {
            if (man_auto) {
              for (let i = 0; i < 4; i++) {
                this.check_space_left(cur_page, this.$store.state.templ_p_1_4)
              }
            } else {
              this.check_space_left(cur_page, this.$store.state.templ_p_1_4)
            }
            break;
          }
          case Img_T_1: {
            this.check_space_left(cur_page, this.$store.state.templ_t_1_1)
            break;
          }
        }
      } else {
        console.log('Není zvolená žádná aktivní stránka')
      }

    },
    check_pages_arr(manual) {
      for (let page of this.$store.state.inf.pages) {
        if (page.c_stranky === this.$store.state.store_act_index) {
          if (page.templates_on_page.length === 0) {
            return page
          } else {
            if (manual === 0) {
              return page
            } else {
              console.log('Na teto strance je uz vybrana sablona, odeberte sablonu a akci opakujte')
              return false
            }
          }
        }
      }
    },
    check_space_left(current, template) {
      console.log('HEEHE')
      let max_left_col = 21
      let max_right_col = 21
      let from_left = 32

      for (let space of current.filled) {
        if (space.left) {
          if (max_left_col < space.end_pos) {
            max_left_col = space.end_pos
          }
        }
        if (space.right) {
          if (max_right_col < space.end_pos)  {
            max_right_col = space.end_pos
          }
        }
      }

      if (template.columns === 2) {
        from_left = 32
        if (this.check_overflow(template, max_left_col)) return false
        if (template.has_text) {
          if (template.side_text) {
            let new_templ = new template_info(this.$store.state.inf.template_cnt_model++, template, String(max_left_col + 3)+'mm', String(from_left) + 'mm')
            current.templates_on_page.push(new_templ)

            let new_filled_space = new space_info(true, true, max_left_col, max_left_col+template.height+6+3)
            current.filled.push(new_filled_space)
          } else {
            let new_templ = new template_info(this.$store.state.inf.template_cnt_model++, template, String(max_left_col + 3)+'mm', String(from_left) + 'mm')
            current.templates_on_page.push(new_templ)

            let new_filled_space = new space_info(true, true, max_left_col, max_left_col+template.height+6+3+template.text_height)
            current.filled.push(new_filled_space)
          }

        } else {
          let new_templ = new template_info(this.$store.state.inf.template_cnt_model++, template, String(max_left_col + 3)+'mm', String(from_left) + 'mm')
          current.templates_on_page.push(new_templ)

          let new_filled_space = new space_info(true, true, max_left_col, max_left_col+template.height+6+3)
          current.filled.push(new_filled_space)
        }
      } else {
          if (max_right_col < max_left_col) {
            from_left = 85 + 32
            if (this.check_overflow(template, max_right_col)) return false
            let new_filled_space = new space_info(false, true, max_right_col, max_right_col+template.height+6+3)
            current.filled.push(new_filled_space)
            let new_templ = new template_info(this.$store.state.inf.template_cnt_model++, template, String(max_right_col + 3)+'mm', String(from_left) + 'mm')
            current.templates_on_page.push(new_templ)
          } else {
            from_left = 32
            if (this.check_overflow(template, max_left_col)) return false
            let new_filled_space = new space_info(true, false, max_left_col, max_left_col+template.height+6+3)
            current.filled.push(new_filled_space)
            let new_templ = new template_info(this.$store.state.inf.template_cnt_model++, template, String(max_left_col + 3)+'mm', String(from_left) + 'mm')
            current.templates_on_page.push(new_templ)
          }
      }
      return current
    },
    check_overflow(template, max) {
      if (template.height + max > 289) {
        console.log('Nelze vložit, byla přesažena maximální velikost stránky.')
        return true
      }
    },
    handleClick(event, img) {
      if (this.ctrlPressed) {
        this.choose_template(img, 0);
      } else {
        this.choose_template(img, 1);
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
