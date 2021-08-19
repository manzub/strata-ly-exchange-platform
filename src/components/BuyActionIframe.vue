<template>
  <div>
    <iframe id="buyframe" src="" />
  </div>
</template>

<script>
  export default {
    name:'BuyIfrmae',
    created() {
      let link = sessionStorage.getItem('req_link')
      let frame = document.getElementById("buyframe");
      frame.src = link;
      sessionStorage.removeItem('req_link');
    }
  }
</script>

<style lang="scss" scoped>

</style>