<script lang="ts">
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

console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>


<template>
<div class="app">
  <div class="left_side">
    <Panel/>
    <Templates/>
  </div>

  <Side_panel/>

  <div class="mid_center">
    <Main_workspace/>
  </div>

  <div class="botcorner">
    <Navbar/>
  </div>
</div>

</template>

<style>
.topcorner{
  position: absolute;
  top:0;
  left:0;
  height: 87%;
  float: left;
}

.botcorner{
  position: sticky;
  min-height: 110px;
  bottom:0;
  left:0;
  width: 100%;
  height: 13%;
}

.left_side {
  width: 19%;
  display: inline-block;
  float: left;
  height: 87%;
}

.mid_center {
  transform: scale(0.75);
  transform-origin: top;
  width: 203mm;
  height: 297mm;
  //min-height: 297mm;
  margin: 0 auto;
}
</style>
