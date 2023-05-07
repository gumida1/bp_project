<template>
  <div :style="cssProps" class="template_border" @click="set_active">
    <div :style="cssProps" class="img_border" @mouseover="showIcons" @mouseleave="hideIcons">
      <img v-bind:src="spacing.image">
      <div class="icons" v-show="showIconsFlag">
        <a class="btn btn-sm btn-outline-success" @click="erase_photo">
          <i class="bi bi bi-eraser-fill"></i>
        </a>
        <a class="btn btn-sm btn-outline-success" @click="erase_template">
          <i class="bi bi-trash-fill" style="font-size: 15px; color: red"></i>
        </a>
      </div>
    </div>
    <div class="caption_img">
      {{name_img}}
    </div>
    <div class="photo_index" v-if="spacing.image_number != null && spacing.image_number !== -1">
      fotografie č. {{spacing.image_number}}
    </div>
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
        '--height': this.sizes.height + 'mm',
        '--width': this.sizes.width + 'mm',
        '--height_2' : this.sizes.height + 6 +'mm',
        '--top' : this.spacing.from_top,
        '--left' : this.spacing.from_left,
        '--border-color': this.spacing.is_active ? 'red' : 'black',
        '--border-width': this.spacing.is_active ? '4px dashed' : '1px solid',
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
.template_border {
  position: absolute;
  top: var(--top);
  left: var(--left);
  border: var(--border-width);
  height: var(--height_2);
  width: var(--width);
  border-color: var(--border-color);
}

.img_border {
  position: absolute;
  top: -1px;
  left: -1px;
  border-bottom: 1px solid;
  height: var(--height);
  width: var(--width);
}

.img_border img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  top: -1px;
  left: -1px;
}

.caption_img {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6mm;
  font-family: Arial;
  font-size: 10pt;
  color: #000;
  text-align: left;
  left: 1mm;
}

.photo_index {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6mm;
  font-family: Arial;
  font-size: 10pt;
  color: #000;
  text-align: right;
  right: 1mm;
}

.icons {
  position: absolute;
  top: 2mm;
  right: 2mm;
  visibility: hidden;
}

.img_border:hover .icons {
  visibility: visible;
}

</style>