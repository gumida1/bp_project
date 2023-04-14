<template>
  <div class="side_panel">
    <h6>Náhledy fotografií</h6>
    <br>
    <button @click="my_method">Ctrl + O</button>

  </div>


</template>

<script>

import {ipcRenderer} from "electron";

export default {
  methods: {
    my_method() {
      ipcRenderer.invoke("showDialog", "message");
    }
  }
}

</script>

<style>
.side_panel {
  background-color: #1e549f;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  //float: left;
  min-height: 790px;
  width: 19%;
  height: 87%;
  border: 3px solid #081f37;
}
</style>