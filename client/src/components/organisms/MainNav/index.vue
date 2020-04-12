<template>
  <div class="o-main-nav">
    <p class="a-text text-3xl">BakwanCovid</p>
    <AButtonNav
      icon="keyboard_arrow_right"
      icon-position="right"
      :to="{ name: 'Login' }"
    >
      Masuk
    </AButtonNav>
  </div>
</template>

<script>
import AButtonNav from '@/components/atoms/AButtonNav';

export default {
  name: 'MainNav',
  components: {
    AButtonNav,
  },
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
