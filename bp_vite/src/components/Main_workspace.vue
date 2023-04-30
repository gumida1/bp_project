<template>
 <div class="white_page">
   <div class="strana">
     strana {{active_page.toString().padStart(3, '0')}}/{{$store.state.inf.page_cnt_model.toString().padStart(3, '0')}}
   </div>

   <div class="foto_dokumentace">
     Fotografická dokumentace k:<br>
     <h5>
       č. j.<br>
       <div v-if="$store.state.inf.c_evidencni !== ''">
         e. č.
       </div>
       <div v-else-if="$store.state.inf.c_vyjezdu !== ''">
         č. v.
       </div>
     </h5>
     <h3>
       {{$store.state.inf.c_jednaci}} <br>
       <div v-if="$store.state.inf.c_evidencni !== ''">
         {{$store.state.inf.c_evidencni}}
       </div>
       <div v-else-if="$store.state.inf.c_vyjezdu !== ''">
         {{$store.state.inf.c_vyjezdu}}
       </div>
     </h3>
   </div>

   <div class="vyhotovil_zpracoval">
     vyhotovil: {{$store.state.inf.j_vyhotovitel}} <br>
     zpracoval: {{$store.state.inf.j_zpracovatel}}
   </div>

   <img class="logo_class" src="../assets/logo2.png">

   <div id="cross"></div>
   <div id="cross_2"></div>

   <div v-for="c_S in $store.state.inf.pages">
     <div v-if="c_S.c_stranky === active_page">
       <div v-for="templ in c_S.templates_on_page">
         <div v-if="(templ.template_type.height === 265)">
          <Template_only_text :spacing="templ"/>
         </div>
         <div v-else-if="!(templ.template_type.has_text)">
           <Template_only_img :sizes="templ.template_type" :spacing="templ"/>
         </div>
         <div v-else-if="templ.template_type.has_text">
           <Template_combined :sizes="templ.template_type" :spacing="templ"/>
         </div>
       </div>
     </div>
   </div>

 </div>
</template>

<script>
import Template_only_img from './Template_only_img.vue'
import Template_combined from './Template_combined.vue'
import Template_only_text from './Template_only_text.vue'

export default {
  props: ['page'],
  components: { Template_only_img, Template_combined, Template_only_text },
  computed: {
    active_page() {
      if (this.page !== -1) {
        return this.page;
      } else {
        return this.$store.state.store_act_index;
      }
    }
  }
}

</script>

<style>
.white_page {
  background-color : white;
  height: 100%;
  //border: 3px solid #081f37;
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
  hyphens: none !important;
  white-space: nowrap;
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