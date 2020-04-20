<template>
  <router-link :to="`/detail/${this.id}`" class="o-hospital-item">
    <div class="o-hospital-item__main">
      <div class="o-hospital-item__main--top">
        <p class="o-hospital-item__title a-text">
          {{ name }}
          <span
            v-if="supplies.length"
            class="text-gray-500"
          >
            butuh
          </span>
        </p>
        <i
          v-if="!supplies.length"
          class="o-hospital-item__arrow-icon material-icons"
        >
          keyboard_arrow_right
        </i>
      </div>
      <div class="o-hospital-item__location">
        <p class="a-text">{{ location }}</p>
      </div>
    </div>
    <div
      v-if="supplies.length"
      class="m-supply-item--container"
    >
      <SupplyItem
        v-for="(data, index) in supplies"
        :name="data.product_name"
        :demand-unit="data.demand_unit"
        :demand="data.demand"
        :key="index"
      />
      <div class="m-supply-item--container__arrow">
        <i class="material-icons">keyboard_arrow_right</i>
      </div>
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
  padding: 15px 25px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 0;

  cursor: pointer;
  &__main {
    line-height: 1.25;
    width: 100%;
    margin-bottom: 10px;
    &--top {
      display: flex;
      justify-content: space-between;
    }
  }
  &__view-more {
    font-size: 14px;
    height: 100%;
    display: flex;
    align-items: center;
    color: $blue;
    span {
      text-align: center;
      font-size: 14px;
    }
  }
  &__title {
    font-size: 20px;
  }
  &__location {
    display: none;
  }

  @media (min-width: $sm) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: initial;

    &__main {
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 275px;
    }
    &__location {
      display: flex;
      padding-right: 20px;
      font-size: 14px;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        color: $gray;
      }
    }
    &__arrow-icon {
      display: none;
    }
  }
  @media (min-width: $lg) {
    &__main {
      max-width: 450px;
    }
    &__title {
      font-size: 24px;
    }
    &__location {
      font-size: 16px;
    }
  }
  @media (min-width: $xl) {
    &__main {
      max-width: 450px;
    }
    &__title {
      font-size: 24px;
    }
    &__location {
      font-size: 16px;
    }
  }
}
</style>
