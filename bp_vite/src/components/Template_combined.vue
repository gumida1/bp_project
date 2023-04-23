<template>

  <div :style="cssProps" class="template_border_P" @click="set_active">
    <div :style="cssProps" class="text_top_border_P">
    </div>
    <div :style="cssProps" class="img_border_P" @mouseenter="showIcons" @mouseleave="hideIcons" style="position: relative;">
      <img v-bind:src="spacing.image">
      <div class="icons_P" v-show="showIconsFlag">
        <a class="btn btn-sm btn-outline-success" @click="erase_photo">
          <i class="bi bi bi-eraser-fill"></i>
        </a>
        <a class="btn btn-sm btn-outline-success" @click="erase_template">
          <i class="bi bi-trash-fill" style="font-size: 15px; color: red"></i>
        </a>
      </div>
    </div>
    <div class="caption_img_P">
      {{name_img}}
    </div>
    <div class="photo_index_P" v-if="spacing.image_number != null && spacing.image_number !== -1">
      fotografie č. {{spacing.image_number}}
    </div>
    <textarea placeholder="Zde je prostor pro popisný text" v-model="spacing.text"> </textarea>
  </div>


</template>

<script>
export default {
  data() {
    return {
      showIconsFlag: false
    }
  },
  props: ['sizes', 'spacing'],
  computed: {
    cssProps() {
      return {
        '--height': this.sizes.side_text ? this.sizes.height + 'mm' : this.sizes.height + 'mm',
        '--width': this.sizes.side_text ? this.sizes.width + 'mm' : this.sizes.width + 'mm',
        '--width_2': this.sizes.side_text ? this.sizes.text_width + 'mm' : this.sizes.width + 'mm',
        '--width_3': this.sizes.side_text ? this.sizes.width - this.sizes.text_width + 'mm' : this.sizes.width + 'mm',
        '--height_2': this.sizes.side_text ? this.sizes.text_height : this.sizes.height + 6 + 'mm',
        '--left': this.sizes.side_text ? '1px solid' : '0px solid',
        '--bottom': this.sizes.side_text ? '0px solid' : '1px solid',
        '--textarea': this.sizes.side_text ? 6 + 'mm' : 0,
        '--height_3': this.sizes.side_text ? this.sizes.height + 6 + 'mm' : this.sizes.height + this.sizes.text_height + 6 + 'mm',
        '--t_height': this.sizes.text_height + 'mm',
        '--t_width': this.sizes.text_width + 'mm',
        '--top' : this.spacing.from_top,
        '--left_2' : this.spacing.from_left,
        '--border-color': this.spacing.is_active ? 'red' : 'black',
        '--border-width': this.spacing.is_active ? '4px dashed' : '1px solid',
        '--bottom_2' : this.sizes.side_text ? 0 : '25mm'
      }
    },
    name_img() {
      let arr = this.spacing.image.split('\\')
      return arr[arr.length - 1]
    }
  },
  methods: {
    set_active() {
      for (let page of this.$store.state.inf.pages) {
        for (let template of page.templates_on_page) {
          if (template === this.spacing) {
            this.spacing.is_active = !this.spacing.is_active;
            this.$store.state.active_template = this.spacing.id_templatu
          } else {
            template.is_active = false
          }
        }
      }
      console.log(this.spacing.is_active, this.$store.state.active_template)
    },
    showIcons() {
      this.showIconsFlag = true;
    },
    hideIcons() {
      this.showIconsFlag = false;
    },
    erase_photo() {
      let num = 1
      for (let page of this.$store.state.inf.pages) {
        for (let template of page.templates_on_page) {
          if (template === this.spacing) {
            template.image = ''
            template.image_number = null
          }
          if (template.image !== '') {
            template.image_number = num
            num++
          }
        }
      }
    },
    erase_template() {
      for (let page of this.$store.state.inf.pages) {
        const index = page.templates_on_page.indexOf(this.spacing);
        if (index > -1) {
          page.templates_on_page.splice(index, 1);
        }
      }
    }
  }
}
</script>

<style>
.template_border_P {
  position: absolute;
  top: var(--top);
  left: var(--left_2);
  border: var(--border-width);
  height: var(--height_3);
  width: var(--width);
  border-color: var(--border-color);
}

.img_border_P {
  position: absolute;
  top: -1px;
  left: -1px;
  border-bottom: 1px solid;
  height: var(--height);
  width: var(--width_3);

}

.text_top_border_P {
  position: absolute;
  right: 0;
  top: 0;
  border-left: var(--left);
  border-bottom: var(--bottom);
  height: var(--height);
  width: var(--width_2);
}

.template_border_P textarea {
  width: var(--t_width);
  height: var(--t_height);
  background-color: white;
  color: #000;
  font-size: 12pt;
  font-family: "Arial Narrow";
  resize: none !important;
  bottom: var(--textarea);
  right: 0;
  position: absolute;
  overflow:hidden;
}
.img_border_P img {
  height: 100%;
  width: 100%;
  top: -1px;
  left: -1px;
}

.caption_img_P {
  position: absolute;
  bottom: var(--bottom_2);
  width: 100%;
  height: 6mm;
  font-family: Arial;
  font-size: 10pt;
  color: #000;
  text-align: left;
  left: 1mm;
}

.photo_index_P {
  position: absolute;
  bottom: var(--bottom_2);
  width: 100%;
  height: 6mm;
  font-family: Arial;
  font-size: 10pt;
  color: #000;
  text-align: right;
  right: 1mm;
}

.icons_P {
  position: absolute;
  top: 2mm;
  right: 2mm;
  //visibility: hidden;
}

.img_border:hover .icons_P {
  visibility: visible;
}

</style>