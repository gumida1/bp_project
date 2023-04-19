<template>

  <div class="template_border_P_2a">
    <div class="img_border_P_2a">
      <div class="text_top_border_P_2a">
        <img>
      </div>
    </div>
    <div v-for="c_S in $store.state.inf.pages">
      <textarea placeholder="Zde je prostor pro popisný text" v-if="c_S.c_stranky === $store.state.store_act_index" v-model="c_S.text_on_single_page"> </textarea>
    </div>
  </div>


</template>

<script>

</script>

<style>
.template_border_P_2a {
  position: absolute;
  top: 24mm;
  left: 32mm;
  border: 1px solid;
  height: 131mm;
  width: 167mm;
}

.img_border_P_2a {
  position: absolute;
  top: -1px;
  left: -1px;
  border-bottom: 1px solid;
  height: 100mm;
  width: 167mm;
}

.text_top_border_P_2a {
  position: absolute;
  border-bottom: 1px solid;
  height: 106mm;
  width: 167mm;
}

.template_border_P_2a textarea {
  width: 167mm;
  height: 25mm;
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