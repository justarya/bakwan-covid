<template>
  <div class="o-main-nav">
    <div class="o-main-nav__brand">
      <p class="a-text o-main-nav__title">
        Bakwan<b>Covid</b>
      </p>
      <p class="o-main-nav__subtitle">
        Bersama, Kita Lawan Covid
      </p>
    </div>
    <AButtonNav
      icon="keyboard_arrow_right"
      icon-position="right"
      :to="{ name: 'Login' }"
    >
      <span v-if="$store.state.isLogin">
        Dashboard
      </span>
      <span v-else>
        Masuk
      </span>
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
  &__title {
    font-size: 35px;
    line-height: 1.25;
  }
  &__subtitle {
    color: #88959a;
    font-size: 14px;
    font-style: italic;
    line-height: 1.25;
  }
}
</style>
