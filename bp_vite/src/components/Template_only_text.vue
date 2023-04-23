<template>
  <div class="template_border_T">
    <textarea placeholder="Zde je prostor pro popisný text" v-model="spacing.text"> </textarea>
  </div>
</template>

<script>

export default {
  props: ['sizes', 'spacing']
}

</script>

<style>
.template_border_T {
  position: absolute;
  top: 24mm;
  left: 32mm;
  border: 1px solid;
  height: 265mm;
  width: 167mm;
  //border-color: var(--border-color);
}

.template_border_T textarea {
  height: 100%;
  width: 100%;
  background-color: white;
  color: #000;
  font-size: 12pt;
  font-family: "Arial Narrow";
  resize: none !important;
  position: absolute;
  overflow:hidden;
  left: 0;
}



</style>