<script>
import {defineComponent} from "vue";
import Panel from './components/Panel.vue'
import Templates from './components/Templates.vue'
import Navbar from './components/Navbar.vue'
import Side_panel from './components/Side_panel.vue'
import Main_workspace from './components/Main_workspace.vue'


export default defineComponent( {
  name: 'App',
  components: { Panel,  Templates, Navbar, Side_panel, Main_workspace },
  methods: {

  }
})

</script>


<template>
<div class="app">
  <div class="left_side" >
    <Panel/>
    <Templates/>
  </div>

  <Side_panel/>


    <div v-if="!($store.state.printing)" class="mid_center">
      <Main_workspace :page="-1"/>
    </div>
    <div v-else>
      <div id="print">
        <div v-for="iterationIndex in $store.state.inf.page_cnt_model" :key="iterationIndex">
          <div class="mid_center_print">
            <Main_workspace :key="iterationIndex" :page="iterationIndex"/>
          </div>
        </div>
      </div>
    </div>



  <div class="botcorner">
    <Navbar/>
  </div>
</div>

</template>

<style>
@import '../node_modules/bootstrap-icons/font/bootstrap-icons';

.botcorner{
  position: sticky;
  min-height: 110px;
  bottom:0;
  left:0;
  width: 100%;
  height: 13%;
}

.left_side {
  width: 22%;
  display: inline-block;
  float: left;
  height: 87%;
}

.mid_center {
  transform: scale(0.74);
  transform-origin: top;
  width: 203mm;
  height: 297mm;
  margin: 0 auto;
}

.mid_center_print {
  width: 203mm;
  height: 297mm;
  margin: 0 auto;
}

</style>
