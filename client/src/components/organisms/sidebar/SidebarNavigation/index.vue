<template>
  <ACard class="o-sidebar --navigation">
    <AButtonNav
      icon="chevron_left"
      :to="{ name: 'Home' }"
    >
      Home
    </AButtonNav>
  </ACard>
</template>

<script>
import ACard from '@/components/atoms/ACard';
import AButtonNav from '@/components/atoms/AButtonNav';

export default {
  name: 'SidebarNavigation',
  components: {
    ACard,
    AButtonNav,
  },
};
</script>

<style lang="scss">
.o-sidebar {
  &.--navigation {
    border-radius: 25px;
    padding: 5px;
  }
}
</style>
