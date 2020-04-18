<template>
  <router-link :to="`/detail/${this.id}`" class="o-hospital-item">
    <div class="o-hospital-item__main">
      <p class="a-text text-2xl">{{ name }}</p>
      <p class="a-text text-base text-gray-500">{{ location }}</p>
    </div>
    <div class="m-supply-item--container">
      <SupplyItem
        v-for="(data, index) in supplies"
        :name="data.product_name"
        :supply="data.supply"
        :demand="data.demand"
        :key="index"
      />
    </div>
    <div class="o-hospital-item__view-more">
      <span>
        Yuk! Bantu
      </span>
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
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    supplies: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.o-hospital-item {
  padding: 15px;
  @media (min-width: $sm) { padding: 30px; }

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
    display: flex;
    align-items: center;
    color: $blue;
    span {
      text-align: right;
      font-weight: bold;
      font-size: 14px;
    }
  }
}
</style>
