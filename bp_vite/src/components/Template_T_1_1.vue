<template>

  <div class="template_border_T">
    <div v-for="c_S in $store.state.inf.pages">
      <textarea placeholder="Zde je prostor pro popisný text" v-if="c_S.c_stranky === $store.state.store_act_index" v-model="c_S.text_on_single_page"> </textarea>
    </div>
  </div>


</template>

<script>

</script>

<style>
.template_border_T {
  position: absolute;
  top: 24mm;
  left: 32mm;
  border: 1px solid;
  height: 265mm;
  width: 167mm;
}

.template_border_T textarea {
  width: 167mm;
  height: 265mm;
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