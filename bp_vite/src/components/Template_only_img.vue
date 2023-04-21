<template>
  <div :style="cssProps" class="template_border" @click="set_active">
    <div :style="cssProps" class="img_border">
      <img v-bind:src="spacing.image">
    </div>
  </div>
</template>

<script>
export default {
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
  height: 100%;
  width: 100%;
  top: -1px;
  left: -1px;
}
</style>