<template>
 <div class="white_page">
   <div class="strana">
     strana {{$store.state.store_act_index}}/{{$store.state.page_cnt}}
     <div v-for="c_S in $store.state.inf.pages">
       <p v-if="c_S.c_stranky === $store.state.store_act_index">{{c_S}}</p>
     </div>
   </div>

   <div class="foto_dokumentace">
     Fotografická dokumentace k: <br>
     <h5>
       č. j.<br>
       e. č.
     </h5>
     <h3>
       {{$store.state.inf.c_jednaci}} <br>
       {{$store.state.inf.c_evidencni}}
     </h3>

   </div>

   <div class="vyhotovil_zpracoval">
     vyhotovil: {{$store.state.inf.j_vyhotovitel}} <br>
     zpracoval: {{$store.state.inf.j_zpracovatel}}
   </div>

   <img class="logo_class" src="../assets/logo2.png">

   <div id="cross"></div>
   <div id="cross_2"></div>

  <Template_1_1/>

 </div>
</template>




<script>
import logo from '../assets/logo.png'
import Template_1_1 from './Template_1_1.vue'
export default {
  props: ['inf'],
  components: { Template_1_1 }
}

</script>


<style>
.white_page {
  background-color : white;
  height: 100%;
  border: 3px solid #081f37;
  //overflow: auto;
  position: relative;
}

.foto_dokumentace {
  font-family: Arial;
  font-size: 10pt;
  line-height: 1.1;
  //margin: 6mm 0 0 32mm;
  top: 6mm;
  left: 32mm;
  position: absolute;
  text-align: left;
  color: #000;
}

.strana {
  font-family: Arial;
  font-size: 10pt;
  position: absolute;
  top: 2mm;
  right: 4mm;
  text-align: right;
  color: #000;
}

.vyhotovil_zpracoval {
  font-family: Arial;
  font-size: 6pt;
  text-align: left;
  color: #000;
  bottom: 2mm;
  left: 32mm;
  position: absolute;
  line-height: 1;

}

.foto_dokumentace h5 {
  font-family: Arial;
  font-size: 18pt;
  text-align: left;
  color: #000;
  line-height: 1.05;
}

.foto_dokumentace h3 {
  font-family: Arial;
  font-size: 18pt;
  line-height: 1.1;
  text-align: left;
  color: #000;
  margin: 0 0 0 18mm;
  top: 3.4mm;
  position: absolute;
}

.logo_class {
  transform: scale(0.54);
  transform-origin: top left;
  top: 2mm;
  left: 2mm;
  position: absolute;
}

#cross {
  background: white;
  height: 30px;
  position: relative;
  width: 2px;
  top: 104.5mm;
  left: 10mm;
  border-style:dashed;
  border-color: #c0c0c0;
  border-width: 0.3mm;
}
#cross:after {
  background: white;
  content: "";
  height: 2px;
  left: -15px;
  position: absolute;
  top: 13px;
  width: 30px;
  border-style:dashed;
  border-color: #c0c0c0;
  border-width: 0.3mm;
}

#cross_2 {
  background: white;
  height: 30px;
  position: relative;
  width: 2px;
  top: 176.5mm;
  left: 10mm;
  border-style:dashed;
  border-color: #c0c0c0;
  border-width: 0.3mm;
  //margin: 76mm 0 0 0;
}
#cross_2:after {
  background: white;
  content: "";
  height: 2px;
  left: -15px;
  position: absolute;
  top: 13px;
  width: 30px;
  border-style:dashed;
  border-color: #c0c0c0;
  border-width: 0.3mm;
}

</style>