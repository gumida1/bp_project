<template>
  <div class="pad">
    <div class="card" @click="change_style(); $store.commit('set_active', {index});" :style="{
        border: is_active ? '3px dashed' : '2px solid',
        borderColor: is_active ? '#5fc9f3' : '#081f37',
        backgroundColor: is_active ? '#081f37' : '#5fc9f3',
        color: 'white !important'
      }" v-if="!new_p">
      <p><span :style="{color: is_active ? 'white' : 'black'}">{{index}}</span></p>
    </div>

    <div class="card" v-if="new_p" style="background-color: #5fc9f3">
      <div v-if="new_p">
        <i class="bi bi-plus-circle" style="font-size: 46px; color: #081f37;"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['p_c', 'new_p', 'index', 'list', 'is_active'],
  emits: ['clicked'],
  methods: {
    change_style() {
      this.$emit('clicked', this.index)

    }
  }
}
</script>

<style>
.card {
  //height: auto;
  //position: relative;
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