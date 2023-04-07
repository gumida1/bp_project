<template>
  <div class="navbar">
    <div class="list_pages">
      <New_page v-for="index in page_counter" :key="index" :new_p="false" @click="logovani(index)" :index="index" :list="page_arr"/>
    </div>
    <New_page :p_c="page_counter" :new_p="true" @click="new_page()"/>
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
      page_arr : []
    }
  },
  methods: {
    new_page() {
      this.page_counter++
      let page = new page_info(this.page_counter, false)
      this.page_arr.push(page)
    },
    logovani(ind) {
      console.log(ind)
      console.log(this.$refs.ind);
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
  overflow: auto;
  display: flex;
  flex-direction: row;
  width: 80%;
  padding: 7px;
}
</style>