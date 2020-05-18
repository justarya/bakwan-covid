<template>
  <div class="t-main-template">
    <MainNav/>
    <div class="t-main-template__content">
      <slot></slot>
    </div>
    <MainFooter/>
  </div>
</template>

<script>
import MainNav from '@/components/organisms/MainNav';
import MainFooter from '@/components/organisms/MainFooter';

export default {
  name: 'MainTemplate',
  components: {
    MainNav,
    MainFooter,
  },
};
</script>

<style lang="scss">
.t-main-template {
  &__content {
    margin-bottom: 70px;
  }
}
</style>
