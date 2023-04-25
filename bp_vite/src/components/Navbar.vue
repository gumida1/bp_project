<template>
  <div class="navbar" @click="debug_pages">
    <div class="nav_elements">

      <a class="btn btn-sm btn-outline-success" @click="previous_page(); $store.commit('previous_page_store');">
        <i class="bi bi-arrow-left-square-fill" style="font-size: 15px; color: #081f37"></i>
      </a>
      <a class="btn btn-sm btn-outline-success" @click="$store.commit('delete_page', {number: active_index}); delete_page();">
        <i class="bi bi-trash-fill" style="font-size: 15px; color: red"></i>
      </a>
      <a class="btn btn-sm btn-outline-success" @click="next_page(); $store.commit('next_page_store');">
        <i class="bi bi-arrow-right-square-fill" style="font-size: 15px; color: #081f37"></i>
      </a>


      <a class="btn btn-sm btn-outline-success" @click="save_spis()">
        <i class="bi bi-save2-fill" style="font-size: 15px; color: #081f37"></i>
      </a>
      <a class="btn btn-sm btn-outline-success" @click="open_spis()">
        <i class="bi bi-folder2-open" style="font-size: 15px; color: #081f37"></i>
      </a>


    </div>
    <div class="list_pages">
      <New_page v-for="index in $store.state.inf.page_cnt_model" :key="index" :new_p="false" :index="index" @clicked="foo" :is_active="is_active(index)"/>
    </div>
    <New_page :p_c="$store.state.inf.page_cnt_model" :new_p="true" @click="$store.commit('add_new_page'); new_page();"/>
  </div>
</template>

<script>
import New_page from './New_page.vue'
import page_info  from '../model/page_class'
import fs from "node:fs";
import {ipcRenderer} from "electron";
export default {
  components: { New_page },
  data() {
    return {
      active_index: 0
    }
  },
  methods: {
    new_page() {
      this.active_index = this.$store.state.store_act_index
    },
    delete_page() {
      this.active_index = this.$store.state.store_act_index
    },
    is_active(index) {
      return index === this.active_index
    },
    foo(index) {
      this.active_index = index
    },
    next_page() {
      if (this.active_index !== this.$store.state.inf.page_cnt_model) {
        this.active_index++
      }
    },
    previous_page() {
      if (this.active_index !== 1) {
        this.active_index--
      }
    },
    save_spis() {
      const serialized = JSON.stringify(this.$store.state.inf, null, 2);
      let arr_images = []
      for (let img of this.$store.state.inf.images) {
        arr_images.push(img)
      }
      ipcRenderer.invoke("saveDialog", serialized, arr_images)
      ipcRenderer.once('saveDialogResult', (event, result) => {
        console.log('Received result:', result);

      });
    },
    open_spis() {
      ipcRenderer.invoke("showDialog_2")
      ipcRenderer.once('dialogResult_2', (event, result) => {
        console.log('Received result:', result);

      });

    }
  }
}

</script>

<style>
.navbar {
  background-color: #1e549f;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  border: 3px solid #081f37;
}

.list_pages {
  //position: absolute;
  //bottom: 3px;
  overflow: auto;
  display: flex;
  flex-direction: row;
  width: 80%;
  padding: 7px;
}

.nav_elements {
  margin: auto;
  width: 21%;

}
</style>