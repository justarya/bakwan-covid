<template>
  <div class="t-main-template">
    <MainNav/>
      <slot></slot>
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
