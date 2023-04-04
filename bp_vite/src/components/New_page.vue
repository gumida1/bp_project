<template>
  <div class="card">
    <div v-if="new_p">
      <i class="bi bi-plus-circle" style="font-size: 60px"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['p_c', 'new_p'],
}
</script>

<style>
.card {
  background: #5fc9f3 !important;
  //height: auto;
  position: fixed;
  margin-right: 2%;
  padding: 7px;
  min-width: 120px !important;
  width: 8%;
  overflow: hidden;
  float: left;
}

</style>