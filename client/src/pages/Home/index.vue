<template>
  <div class="p-home">
    <MainTemplate>
      <HospitalItem v-for="data in 3" :key="data"/>
    </MainTemplate>
  </div>
</template>

<script>
import MainTemplate from '@/components/templates/MainTemplate';
import HospitalItem from '@/components/organisms/HospitalItem';

export default {
  name: 'Home',
  components: {
    MainTemplate,
    HospitalItem,
  },
};
</script>

<style lang="scss">

</style>
