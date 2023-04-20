<template>

  <div :style="cssProps" class="template_border_P">
    <div :style="cssProps" class="img_border_P">
      <div :style="cssProps" class="text_top_border_P">
        <img>
      </div>
    </div>
    <div v-for="c_S in $store.state.inf.pages">
      <textarea placeholder="Zde je prostor pro popisný text" v-if="c_S.c_stranky === $store.state.store_act_index" v-model="c_S.text_on_single_page"> </textarea>
    </div>
  </div>


</template>

<script>
export default {
  props: ['sizes'],
  computed: {
    cssProps() {
      return {
        '--height': this.sizes.side_text ? this.sizes.height + 'mm' : this.sizes.height + 'mm',
        '--width': this.sizes.side_text ? this.sizes.width + 'mm' : this.sizes.width + 'mm',
        '--width_2': this.sizes.side_text ? this.sizes.text_width + 'mm' : this.sizes.width + 'mm',
        '--height_2': this.sizes.side_text ? this.sizes.text_height : this.sizes.height + 6 + 'mm',
        '--left': this.sizes.side_text ? '1px solid' : '0px solid',
        '--bottom': this.sizes.side_text ? '0px solid' : '1px solid',

        '--height_3': this.sizes.side_text ? this.sizes.height + 6 + 'mm' : this.sizes.height + this.sizes.text_height + 6 + 'mm',
        '--t_height': this.sizes.text_height + 'mm',
        '--t_width': this.sizes.text_width + 'mm'

      }
    }
  }
}
</script>

<style>
.template_border_P {
  position: absolute;
  top: 24mm;
  left: 32mm;
  border: 1px solid;
  height: var(--height_3);
  width: var(--width);
}

.img_border_P {
  position: absolute;
  top: -1px;
  left: -1px;
  border-bottom: 1px solid;
  height: var(--height);
  width: var(--width);
}

.text_top_border_P {
  position: absolute;
  right: 0;
  border-left: var(--left);
  border-bottom: var(--bottom);
  height: var(--height_2);
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
  bottom: 0;
  left: -1px;
  position: absolute;
  overflow:hidden;
}



</style>