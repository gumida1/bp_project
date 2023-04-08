<template>
  <div class="pad">
    <div class="card" @click="change_style()" :style="{
        backgroundColor: is_active ? 'red' : '#5fc9f3'
      }" v-if="!new_p">
      <p>{{index}}</p>
    </div>

    <div class="card" v-if="new_p" style="background-color: #5fc9f3">
      <div v-if="new_p">
        <i class="bi bi-plus-circle" style="font-size: 60px; color: #081f37"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //chng_border : false
    }
  },
  props: ['p_c', 'new_p', 'index', 'list', 'is_active'],
  emits: ['clicked'],
  methods: {
    change_style() {
      /*for (let i of this.list) {
        i.active = i.c_stranky === this.index;
      }*/
      //console.log(this.list);
      this.$emit('clicked', this.index)
    }
  }
}
</script>

<style>
.card {
  //height: auto;
  position: fixed;
  margin-right: 2%;
  padding: 7px;
  min-width: 120px !important;
  width: 8%;
  overflow: hidden;
  float: left;
}

.pad {
  padding: 5px;
}

</style>