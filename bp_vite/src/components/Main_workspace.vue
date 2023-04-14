<template>
 <div class="white_page">
   <div class="strana">
     strana {{$store.state.store_act_index}}
   </div>

   <div class="foto_dokumentace">
     Fotografická dokumentace k: <br>
     <h5>
       č. j. {{$store.state.inf.c_jednaci}} <br>
       e. č. {{$store.state.inf.c_evidencni}}
     </h5>
   </div>

   <div class="vyhotovil_zpracoval">
     vyhotovil: {{$store.state.inf.j_vyhotovitel}} <br>
     zpracoval: {{$store.state.inf.j_zpracovatel}}
   </div>

   <!--<img class="logo_class" src="../assets/logo.png">-->

 </div>
</template>




<script>
import logo from '../assets/logo.png'
export default {
  props: ['inf']
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
}

.foto_dokumentace h5 {
  font-family: Arial;
  font-size: 18pt;
  text-align: left;
  color: #000;
}

.logo_class {
  transform: scale(0.3);
  top: 2mm;
  left: 2mm;
  position: absolute;
}

</style>