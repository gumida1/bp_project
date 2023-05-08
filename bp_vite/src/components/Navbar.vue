<template>
  <div class="navbar">
    <div class="nav_elements">

      <a class="btn btn-outline-warning" @click="previous_page(); $store.commit('previous_page_store');">
        <i class="bi bi-arrow-left-square-fill" style="font-size: 15px; color: #081f37"></i>
      </a>

      <a class="btn btn-outline-warning" @click="next_page(); $store.commit('next_page_store');">
        <i class="bi bi-arrow-right-square-fill" style="font-size: 15px; color: #081f37"></i>
      </a>

    </div>

    <div class="save_open">
      <a class="btn btn-outline-success" @click="save_spis()">
        <i class="bi bi-download" style="font-size: 15px; color: #081f37"></i> Uložit
      </a>
      <a class="btn btn-outline-success" @click="open_spis()">
        <i class="bi bi-upload" style="font-size: 15px; color: #081f37"></i> Načíst
      </a>


      <a class="btn btn-outline-success" @click="print_spis()">
        <i class="bi bi-printer" style="font-size: 15px; color: #081f37"></i> Export pdf
      </a>



    </div>

    <div class="kos">
      <a class="btn btn-outline-danger" @click="$store.commit('delete_page', {number: active_index}); delete_page();">
        <i class="bi bi-trash-fill" style="font-size: 15px; color: red"></i> Smazat stranu
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
import html2pdf from "html2pdf.js";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
        const fileData = fs.readFileSync(result + '/case.json', 'utf-8');
        const jsonData = JSON.parse(fileData);

        this.$store.state.inf.c_jednaci = jsonData.c_jednaci
        this.$store.state.inf.c_evidencni = jsonData.c_evidencni
        this.$store.state.inf.c_vyjezdu = jsonData.c_vyjezdu
        this.$store.state.inf.j_vyhotovitel = jsonData.j_vyhotovitel
        this.$store.state.inf.j_zpracovatel = jsonData.j_zpracovatel
        this.$store.state.inf.pages = jsonData.pages;
        this.$store.state.inf.images = jsonData.images;
        this.$store.state.inf.page_cnt_model = jsonData.page_cnt_model;
        this.$store.state.inf.template_cnt_model = jsonData.template_cnt_model;

      });

    },
    async print_spis() {
      this.$store.state.printing = true
      await new Promise(resolve => setTimeout(resolve, 500));

      html2pdf(document.getElementById("print"), {
        margin: 0,
        html2canvas: { scale: 4 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        filename: "i-was-html.pdf",
      }).then(() => {
        this.$store.state.printing = false;
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

.save_open {
  position: absolute;
  right: 5px;
  top: 8px;
}

.kos {
  position: absolute;
  left: 14px;
  top: 8px;
}

.save_open a:first-child {
  margin-right: 5px;
}

.save_open a:last-child {
  margin-left: 5px;
}

.nav_elements a:first-child {
  margin-right: 10px;
}

.nav_elements a:last-child {
  margin-left: 10px;
}


</style>