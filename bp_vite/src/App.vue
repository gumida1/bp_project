<script lang="ts">
import {defineComponent} from "vue";
import Panel from './components/Panel.vue'
import Templates from './components/Templates.vue'
import Navbar from './components/Navbar.vue'
import Side_panel from './components/Side_panel.vue'

export default defineComponent( {
  name: 'App',
  components: { Panel,  Templates, Navbar, Side_panel },
  methods: {

  }
})

console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>

<template>
<div class="app">
  <div class="topcorner">
    <Panel/>
    <Templates/>
  </div>

  <div>
    <Side_panel/>
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
}

.botcorner{
  position: absolute;
  min-height: 110px;
  bottom:0;
  left:0;
  width: 100%;
  height: 13%;
}

</style>
