<template>
 <div class="white_page">
   <div class="strana">
     strana {{$store.state.store_act_index}}/{{$store.state.page_cnt}}
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

   <!--<div v-for="c_S in $store.state.inf.pages">
     <p v-if="c_S.c_stranky === $store.state.store_act_index">{{c_S}}</p>
   </div>-->

  <!--
   <div v-for="c_S in $store.state.inf.pages">
     <div v-if="c_S.c_stranky === $store.state.store_act_index">
       <div v-if="c_S.teplates_on_single_page[0] === 'auto_templ_1/1'">
         <Template_1_1/>
       </div>
       <div v-else-if="c_S.teplates_on_single_page[0] === 'auto_templ_1/2'">
         <Template_1_2/>
         <Template_1_2 style="top: 158mm;"/>
       </div>
       <div v-else-if="c_S.teplates_on_single_page[0] === 'auto_templ_1/3'">
         <Template_1_3/>
         <Template_1_3 style="top: 113.33mm;"/>
         <Template_1_3 style="top: 202.66mm;"/>
       </div>
       <div v-else-if="c_S.teplates_on_single_page[0] === 'auto_templ_1/4'">
         <Template_1_4/>
         <Template_1_4 style="left: 117mm;"/>
         <Template_1_4 style="top: 158mm;"/>
         <Template_1_4 style="top: 158mm; left: 117mm;"/>
       </div>
       <div v-else-if="c_S.teplates_on_single_page[0] === 'auto_templ_1/6'">
         <Template_1_6/>
         <Template_1_6 style="left: 117mm;"/>
         <Template_1_6 style="top: 113.33mm;"/>
         <Template_1_6 style="top: 113.33mm; left: 117mm;"/>
         <Template_1_6 style="top: 202.66mm;"/>
         <Template_1_6 style="top: 202.66mm; left: 117mm;"/>
       </div>
       <div v-else-if="c_S.teplates_on_single_page[0] === 'auto_templ_1/8'">
         <Template_1_8/>
         <Template_1_8 style="left: 117mm;"/>
         <Template_1_8 style="top: 91mm;"/>
         <Template_1_8 style="top: 91mm; left: 117mm;"/>
         <Template_1_8 style="top: 158mm;"/>
         <Template_1_8 style="top: 158mm; left: 117mm;"/>
         <Template_1_8 style="top: 225mm;"/>
         <Template_1_8 style="top: 225mm; left: 117mm;"/>
       </div>
       <div v-else-if="c_S.teplates_on_single_page[0] === 'auto_templ_P_1/1'">
         <Template_P_1_1/>
       </div>
       <div v-else-if="c_S.teplates_on_single_page[0] === 'auto_templ_P_1/2_a'">
         <Template_P_1_2_a/>
         <Template_P_1_2_a style="top: 158mm;"/>
       </div>




       <div v-else-if="c_S.teplates_on_single_page[0] === 'auto_templ_T_1/1'">
         <Template_T_1_1/>
       </div>


     </div>
   </div>

   <div v-for="c_S in $store.state.inf.pages">
     <div v-if="c_S.c_stranky === $store.state.store_act_index">
       <div v-for="template in c_S.templates_on_page">
         <div style="top: 150mm; position: absolute;">
           {{template}}
         </div>
         <div v-if="template.template_type === '1/1'">
           <Template_1_1/>
         </div>
         <div v-else-if="template.template_type === '1/2'">
           <Template_1_2 :style="{ top: template.from_top }"/>
         </div>

       </div>
     </div>
   </div>
-->

   <!-- ****** -- ****** -->


   <div v-for="c_S in $store.state.inf.pages">
     <div v-if="c_S.c_stranky === $store.state.store_act_index">
       <div v-for="templ in c_S.templates_on_page">
         <Template_only_img v-if="!(templ.template_type.has_text)" :sizes="templ.template_type" :spacing="templ"/>
         <Template_combined v-else-if="templ.template_type.has_text" :sizes="templ.template_type"/>
       </div>
     </div>
   </div>

















 </div>
</template>




<script>
import Template_only_img from './Template_only_img.vue'
import Template_1_2 from './Template_1_2.vue'
import Template_1_3 from './Template_1_3.vue'
import Template_1_4 from './Template_1_4.vue'
import Template_1_6 from './Template_1_6.vue'
import Template_1_8 from './Template_1_8.vue'
import Template_combined from './Template_combined.vue'
import Template_P_1_2_a from './Template_P_1_2_a.vue'


import Template_T_1_1 from './Template_T_1_1.vue'

export default {
  props: ['inf'],
  components: { Template_only_img, Template_1_2, Template_1_3, Template_1_4, Template_1_6, Template_1_8, Template_combined,
                Template_P_1_2_a, Template_T_1_1 }
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
  bottom: 1.9mm;
  left: 32mm;
  position: absolute;
  line-height: 0.9;

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