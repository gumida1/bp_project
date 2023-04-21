<template>
  <div class="side_panel">
    <h6 @click="debug_images">Náhledy fotografií</h6>
    <br>
    <button @click="open_dialog">Ctrl + O</button>

    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="path in $store.state.inf.images" :key="path" @click="add_image_in_active_templ(path)">
        <img v-bind:src="path" class="img-thumbnail">
        <h5>{{path}}</h5>
      </li>
    </ul>

  </div>


</template>

<script>

import {ipcRenderer} from "electron";

export default {
  methods: {
    open_dialog() {
      ipcRenderer.invoke("showDialog", "message")
      ipcRenderer.once('dialogResult', (event, result) => {
        console.log('Received result:', result);
        for (let path of result) {
          console.log(path)
          this.$store.commit('save_image_paths', {path: path})
        }
      });

    //console.log(this.$store.state.inf)
    },
    debug_images() {
      console.log(this.$store.state.inf.images)
      console.log(process.versions.electron)

    },
    add_image_in_active_templ(path) {
      for (let page of this.$store.state.inf.pages) {
        for (let template of page.templates_on_page) {
          if (template.is_active) {
            template.image = path
          }
        }
      }
      console.log(path)
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
  margin-bottom: 15px;
}

.side_panel h5 {
  font-family: Arial;
  font-weight: bold;
  font-size: 8pt;
  margin: 0 auto;
}

li {
  word-wrap: break-word;
  margin-top: 1px;
}
</style>