<template>
  <div
    :class="[
      'm-history-item',
      '--action-primary',
    ]"
  >
    <div class="m-history-item__main">
      <p class="m-history-item__title">
        <span>
          Kebutuhan
        </span>
        <span class="m-history-item__title-product-name">
          Masker
        </span>
        <span class="m-history-item__title-action">
          dibuat
        </span>
      </p>
      <p class="m-history-item__last-update">
        <i class="material-icons">
          schedule
        </i>
        <span>
          24 Maret 2020
        </span>
      </p>
    </div>
    <div class="m-history-item__change">
      <span>
        10 Qty
      </span>
      <i class="material-icons">chevron_right</i>
      <span class="font-bold">
        100 Qty
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryItem',
  props: {},
};
</script>

<style lang="scss">
.m-history-item {
  $color: black;

  border-radius: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;

  &__title {
    font-size: 18px;
    &-product-name {
      font-weight: 600;
    }
    &-action {
      font-weight: 600;
    }
  }
  &__last-update {
    font-size: 14px;
    color: rgba($color, 0.4);
    .material-icons {
      font-size: 16px;
    }
  }
  &__change {
    display: flex;

    align-items: center;
    position: relative;
    font-size: 16px;
    .material-icons {
      font-size: 18px;
    }
  }

  &.--action-default {
    $color: black;
    color: $color;
    border: 2px solid rgba($color, 0.05);
  }
  &.--action-danger {
    $color: red;
    color: $color;
    border: 2px solid rgba($color, 0.05);
    .m-history-item {
      &__last-update {
        color: rgba($color, 0.4);
      }
      &__change {
        &::after {
          content: '';
          background-color: $color;
          position: absolute;
          top: 50%;
          right: 0;
          width: 100%;
          height: 2px;
          transform: rotate(-5deg);
        }
      }
    }
  }
  &.--action-primary {
    $color: $blue;
    color: $color;
    border: 2px solid rgba($color, 0.05);
    .m-history-item {
      &__last-update {
        color: rgba($color, 0.4);
      }
    }
  }
  @media (min-width: $sm) {
    flex-direction: column;
    &__main {
      display: flex;
      flex-direction: column-reverse;
    }
    &__title {
      font-size: 16px;
    }
    &__last-update {
      font-size: 12px;
      .material-icons {
        font-size: 14px;
      }
    }
    &__change {
      font-size: 14px;
    }
  }
  @media (min-width: $lg) {
    flex-direction: row;
    &__main {
      flex-direction: column;
    }
    &__title {
      font-size: 18px;
    }
    &__last-update {
      font-size: 14px;
      .material-icons {
        font-size: 16px;
      }
    }
    &__change {
      font-size: 16px;
    }
  }
}
</style>
