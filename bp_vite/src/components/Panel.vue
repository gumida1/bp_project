<template>
  <div class="panel">
    <h6>Informace o případu</h6>
    <form>
      <div class="form-group">
        <label for="input1">Číslo jednací</label>
        <input type="text" class="form-control form-control-sm" id="input1" placeholder="Číslo jednací" v-model="inf.c_jednaci" :disabled="locked === false">

        <label for="input2">Evidenční číslo</label>
        <input type="text" class="form-control form-control-sm" id="input2" placeholder="Evidenční číslo" v-model="inf.c_evidencni" :disabled="locked === false || vyj_filled === true" v-on:input="check_filled_input_evi()">

        <label for="input3">Číslo výjezdu</label>
        <input type="text" class="form-control form-control-sm" id="input3" placeholder="Číslo výjezdu" v-model="inf.c_vyjezdu" :disabled="locked === false || evi_filled === true" v-on:input="check_filled_input_vyj()">

        <label for="input4">Vyhotovil (fotograf)</label>
        <input type="text" class="form-control form-control-sm" id="input4" placeholder="Vyhotovil" v-model="inf.j_vyhotovitel" :disabled="locked === false" @dblclick="fill_vyhotovil()">

        <label for="input5">Zpracoval (kompiloval)</label>
        <input type="text" class="form-control form-control-sm" id="input5" placeholder="Zpracoval" v-model="inf.j_zpracovatel" :disabled="locked === false" @dblclick="fill_zpracoval()">
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
      inf : new case_info('', '', '', '', ''),
      locked: true,
      evi_filled: false,
      vyj_filled: false
    }
  },
  methods: {
    check_filled_input_evi() {
      this.evi_filled = this.inf.c_evidencni !== '';
    },
    check_filled_input_vyj() {
      this.vyj_filled = this.inf.c_vyjezdu !== '';
    },
    fill_vyhotovil() {
      if (this.inf.j_zpracovatel !== '') {
        this.inf.j_vyhotovitel = this.inf.j_zpracovatel
      }
    },
    fill_zpracoval() {
      if (this.inf.j_vyhotovitel !== '') {
        this.inf.j_zpracovatel = this.inf.j_vyhotovitel
      }
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



</style>