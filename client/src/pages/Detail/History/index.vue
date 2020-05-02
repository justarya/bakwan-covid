<template>
  <div class="p-detail-history">
    <div class="p-detail-history__main">
      <p class="p-detail-history__title">
        Riwayat
      </p>
    </div>
    <div class="p-detail-history__list">
      <HistoryItem />
    </div>
  </div>
</template>

<script>
import HistoryItem from '@/components/molecules/HistoryItem';

export default {
  name: 'DetailHistory',
  components: {
    HistoryItem,
  },
  props: {
    id: {
      type: String,
      default: '',
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
