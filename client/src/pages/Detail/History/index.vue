<template>
  <div class="p-detail-history">
    <div class="p-detail-history__main">
      <p class="p-detail-history__title">
        Riwayat
      </p>
    </div>
    <div class="p-detail-history__list">
      <SupplyHistoryItem
        v-for="(data, index) in detail.history"
        :key="index"
        v-bind="data"
      />
      <InfiniteLoading
        spinner="spiral"
        @infinite="fetchHistory"
      >
        <div slot="no-more"></div>
        <div slot="no-results">
          <p
            v-if="!detail.history.length"
            class="p-detail-history__list-empty"
          >
            Belum ada riwayat perubahan tercatat
          </p>
        </div>
      </InfiniteLoading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import SupplyHistoryItem from '@/components/molecules/SupplyHistoryItem';

export default {
  name: 'DetailHistory',
  components: {
    InfiniteLoading,
    SupplyHistoryItem,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    detail: {
      history: [],
    },
    pagination: {
      page: 0,
      size: 20,
    },
  }),
  methods: {
    async fetchHistory(state) {
      try {
        const { data } = await this.$http(
          `/records/hospital/${this.id}/supplies`,
          {
            params: {
              page: this.pagination.page,
              size: this.pagination.size,
            },
          },
        );
        if (data.length) {
          this.pagination.page += 1;

          this.detail.history.push(...this.mappingHistoryData(data));
          state.loaded();
        } else {
          state.complete();
        }
      } catch (error) {
        state.error(error);
      }
    },
    mappingHistoryData(data) {
      return data.map((el) => ({
        productUnit: el.referenceDocument.product.unit,
        productName: el.referenceDocument.product.name,
        demand: el.referenceDocument.demand,
        action: el.action,
        date: this.$moment(el.createdAt).format('LLL'),
      }));
    },
  },
};
</script>

<style lang="scss">
.p-detail-history {
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
