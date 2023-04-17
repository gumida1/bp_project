<template>
  <div class="navbar">
    <div class="nav_elements">

      <a class="btn btn-sm btn-outline-success" @click="previous_page(); $store.commit('previous_page_store');">
        <i class="bi bi-arrow-left-square-fill" style="font-size: 15px; color: #081f37"></i>
      </a>
      <a class="btn btn-sm btn-outline-success">
        <i class="bi bi-trash-fill" style="font-size: 15px; color: red"></i>
      </a>
      <a class="btn btn-sm btn-outline-success" @click="next_page(); $store.commit('next_page_store');">
        <i class="bi bi-arrow-right-square-fill" style="font-size: 15px; color: #081f37"></i>
      </a>

    </div>
    <div class="list_pages">
      <New_page v-for="index in page_counter" :key="index" :new_p="false" :index="index" @clicked="foo" :is_active="is_active(index)"/>
    </div>
    <New_page :p_c="page_counter" :new_p="true" @click="new_page(); $store.commit('add_new_page');"/>

  </div>
</template>

<script>
import New_page from './New_page.vue'
import page_info  from '../model/page_class'
export default {
  components: { New_page },
  data() {
    return {
      page_counter : 0,
      page_arr : [],
      active_index: 0
    }
  },
  methods: {
    new_page() {
      this.page_counter++
    },
    is_active(index) {
      return index === this.active_index
    },
    foo(index) {
      this.active_index = index
      console.log(this.active_index)
    },
    next_page() {
      this.active_index++
    },
    previous_page() {
      this.active_index--
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