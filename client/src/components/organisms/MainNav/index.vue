<template>
  <div class="o-main-nav">
    <p class="a-text text-3xl">Pasokan Alat Medis Nusantara</p>
    <router-link to="/login">Masuk</router-link>
  </div>
</template>

<script>
export default {
  name: 'MainNav',
};
</script>

<style lang="scss">
.o-main-nav {
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
