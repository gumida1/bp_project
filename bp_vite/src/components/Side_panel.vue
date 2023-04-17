<template>
  <div class="side_panel">
    <h6 @click="debug_images">Náhledy fotografií</h6>
    <br>

    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="path in $store.state.inf.images">
        <h5>{{path}}</h5>
      </li>
    </ul>
    <button @click="open_dialog">Ctrl + O</button>

  </div>


</template>

<script>

import {ipcRenderer} from "electron";

export default {
  methods: {
    open_dialog() {
      ipcRenderer.invoke("showDialog", "message")
      ipcRenderer.once('dialogResult', (event, result) => {
        console.log('Received result:', result.filePaths);
        for (let path of result.filePaths) {

          this.$store.commit('save_image_paths', {path: path})
        }
      });

    //console.log(this.$store.state.inf)
    },
    debug_images() {
      console.log(this.$store.state.inf.images)

    }

  }
}

</script>

<style>
.side_panel {
  background-color: #1e549f;
  overflow: auto;
  position: absolute;
  top: 0;
  right: 0;
  //float: left;
  min-height: 790px;
  width: 22%;
  height: 87%;
  border: 3px solid #081f37;
}

.side_panel button {
  margin-top: 10px;
}

.side_panel h5 {
  font-family: Arial;
  font-weight: bold;
  font-size: 8pt;
  margin: 0 auto;
}
</style>