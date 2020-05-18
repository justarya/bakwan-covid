<template>
  <div class="p-detail-supply">
    <div class="p-detail-supply__main">
      <p class="p-detail-supply__title">Kebutuhan Pasokan</p>
      <div
        class="p-detail-supply__last-updated"
        v-if="supplies.length"
      >
        <i class="material-icons">
          schedule
        </i>
        <span>
          Terakhir diperbarui:
          <b>
            {{ suppliesLastUpdated }}
          </b>
        </span>
      </div>
    </div>
    <div class="p-detail-supply__list">
      <SupplyItem
        v-for="(data, index) in supplies"
        v-bind="data"
        :name="data.product.name"
        :unit="data.product.unit"
        :key="index"
      />
      <p
        v-if="!supplies.length"
        class="text-gray-600"
      >
        Data kosong
      </p>
    </div>
  </div>
</template>

<script>
import SupplyItem from '@/components/molecules/SupplyItem';

export default {
  name: 'DetailSupply',
  components: {
    SupplyItem,
  },
  props: {
    supplies: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    suppliesLastUpdated() {
      const suppliesLastUpdated = this.supplies.reduce((result, curr) => {
        const date = this.$moment(curr.updatedAt);
        if (!result) return date;
        if (date < result) return result;
        return date;
      }, null);
      return this.$moment(suppliesLastUpdated).format('LLL');
    },
  },
};
</script>

<style lang="scss">
.p-detail-supply {
  &__main {
    margin-bottom: 30px;
  }
  &__title {
    font-size: 24px;
  }
  &__last-updated {
    font-size: 14px;
    color: $gray;
    display: flex;
    align-items: center;
    .material-icons {
      margin-right: 5px;
      font-size: 16px;
    }
  }
  &__list {
    .m-supply-item {
      padding: 10px;
      margin: 0;
    }
  }
}
</style>
