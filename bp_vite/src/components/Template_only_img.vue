<template>
  <div :style="cssProps" class="template_border">
    <div :style="cssProps" class="img_border">
      <img>
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
        '--left' : this.spacing.from_left
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
  border: 1px solid;
  height: var(--height_2);
  width: var(--width);
}

.img_border {
  position: absolute;
  top: -1px;
  left: -1px;
  border-bottom: 1px solid;
  height: var(--height);
  width: var(--width);
}
</style>