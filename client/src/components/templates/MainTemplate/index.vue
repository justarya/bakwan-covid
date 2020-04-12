<template>
  <div class="t-main-template">
    <MainNav/>
    <slot name="top"></slot>
    <ACard>
      <slot></slot>
    </ACard>
    <MainFooter/>
  </div>
</template>

<script>
import MainNav from '@/components/organisms/MainNav';
import MainFooter from '@/components/organisms/MainFooter';
import ACard from '@/components/atoms/ACard';

export default {
  name: 'MainTemplate',
  components: {
    MainNav,
    MainFooter,
    ACard,
  },
};
</script>
