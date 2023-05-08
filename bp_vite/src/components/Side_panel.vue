<template>
  <div class="side_panel">
    <h6>Náhledy fotografií</h6>
    <br>

    <a class="btn btn-outline-success" @click="open_dialog">
      <i class="bi bi-images" style="font-size: 15px; color: #081f37"></i> Otevřít fotografie
    </a>

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
    },
    add_image_in_active_templ(path) {
      let num = 1
      for (let page of this.$store.state.inf.pages) {
        for (let template of page.templates_on_page) {
          if (template.image !== '' ) {
            template.image_number = num
            num++
          }
          if (template.is_active) {
            template.image = path
            template.image_number = num
            num++
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