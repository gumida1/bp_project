<template>
  <div class="panel1">
    <h6 @click="$store.commit('print_state')">Informace o případu</h6>
    <form>
      <div class="form-group">
        <label for="input1">Číslo jednací</label>
        <input type="text" class="form-control form-control-sm" id="input1" placeholder="Číslo jednací" v-model="$store.state.inf.c_jednaci" :disabled="locked === false">

        <label for="input2">Evidenční číslo</label>
        <input type="text" class="form-control form-control-sm" id="input2" placeholder="Evidenční číslo" v-model="$store.state.inf.c_evidencni" :disabled="locked === false || $store.vyj_filled === true" v-on:input="$store.commit('check_filled_input_evi')">

        <label for="input3">Číslo výjezdu</label>
        <input type="text" class="form-control form-control-sm" id="input3" placeholder="Číslo výjezdu" v-model="$store.state.inf.c_vyjezdu" :disabled="locked === false || $store.evi_filled === true" v-on:input="$store.commit('check_filled_input_vyj')">

        <label for="input4">Vyhotovil (fotograf)</label>
        <input type="text" class="form-control form-control-sm" id="input4" placeholder="Vyhotovil" v-model="$store.state.inf.j_vyhotovitel" :disabled="locked === false" @dblclick="$store.commit('fill_vyhotovil')">

        <label for="input5">Zpracoval (kompiloval)</label>
        <input type="text" class="form-control form-control-sm" id="input5" placeholder="Zpracoval" v-model="$store.state.inf.j_zpracovatel" :disabled="locked === false" @dblclick="$store.commit('fill_zpracoval')">
      </div>
      <br>
      <div class="mx-auto" style="width: 123px;">
        <input type="checkbox" data-toggle="switchbutton" checked data-onlabel="Uzamknout" data-offlabel="Odemknout" data-size="sm" data-onstyle="success" data-offstyle="danger" v-model="locked">
      </div>
    </form>
  </div>
</template>


<script>
import case_info  from '../model/case_class'
export default {
  data() {
    return {
      locked: true,
    }
  }
}

</script>


<style>
form {
  max-width: 400px;
  margin: auto;
  background: #1e549f;
  text-align: left;
  padding: 20px;
}

label {
  color: #5fc9f3;
  display: inline-block;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

h6 {
  color: #5fc9f3 !important;
  display: inline-block;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

.btn {
  background-color: #5fc9f3 !important;
}

.panel1 {
  overflow: auto;
  min-height: 395px;
  //height: 100%;
  //max-width: 18%;
  //min-width: 203px;
  width: 100%;
  background: #1e549f;
  border: 3px solid #081f37;
  top: 0;
  left: 0;
  //float: left;
  //position: relative;
}



</style>