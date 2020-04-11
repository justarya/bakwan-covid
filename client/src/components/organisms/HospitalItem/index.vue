<template>
  <router-link to="/detail/1" class="o-hospital-item">
    <div class="o-hospital-item__main">
      <p class="a-text text-2xl">RS Persahabatan</p>
      <p class="a-text text-base text-gray-500">Jl. Sunter Satu dua tiga No. 123</p>
    </div>
    <div class="m-supply-item--container">
      <SupplyItem v-for="data in 5" :key="data"></SupplyItem>
    </div>
    <div class="o-hospital-item__view-more">
      <i class="material-icons">keyboard_arrow_right</i>
    </div>
  </router-link>
</template>

<script>
import SupplyItem from '@/components/molecules/SupplyItem';

export default {
  name: 'HospitalItem',
  components: {
    SupplyItem,
  },
};
</script>

<style lang="scss">
.o-hospital-item {
  padding: 30px;

  display: flex;
  align-items: center;

  cursor: pointer;

  border-bottom: 1px solid $soft-gray;
  &:last-child {
    border-bottom: 0;
  }
  &__main {
    width: 100%;
    max-width: 350px;
  }
  &__view-more {
    font-size: 14px;
    height: 100%;
  }
}
</style>
