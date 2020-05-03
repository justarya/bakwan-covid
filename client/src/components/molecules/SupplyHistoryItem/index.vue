<template>
  <div
    :class="[
      'm-history-item',
      actionClass,
    ]"
  >
    <div class="m-history-item__main">
      <p class="m-history-item__title">
        <span>
          Kebutuhan
        </span>
        <span class="m-history-item__title-product-name">
          {{ productName }}
        </span>
        <span class="m-history-item__title-action">
          {{ actionLabel }}
        </span>
      </p>
      <p class="m-history-item__last-update">
        <i class="material-icons">
          schedule
        </i>
        <span>
          {{ date }}
        </span>
      </p>
    </div>
    <div class="m-history-item__change">
      <i
        v-if="action === 'updated'"
        class="material-icons"
      >
        chevron_right
      </i>
      <span class="font-bold">
        {{ quantity }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupplyHistoryItem',
  props: {
    productName: {
      type: String,
      default: '',
    },
    productUnit: {
      type: String,
      default: '',
    },
    demand: {
      type: Number,
      default: 0,
    },
    action: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
  },
  computed: {
    actionClass() {
      switch (this.action) {
        case 'created':
          return '--action-primary';

        case 'updated':
          return '--action-default';

        case 'removed':
          return '--action-danger';

        default:
          return '--action-default';
      }
    },
    actionLabel() {
      switch (this.action) {
        case 'created':
          return 'dibuat';

        case 'updated':
          return 'diubah menjadi';

        case 'removed':
          return 'dihapus';

        default:
          return '';
      }
    },
    quantity() {
      const defaultText = `${this.demand} ${this.productUnit}`;
      switch (this.action) {
        case 'created':
          return `+ ${defaultText}`;

        case 'updated':
          return defaultText;

        case 'removed':
          return defaultText;

        default:
          return defaultText;
      }
    },
  },
};
</script>

<style lang="scss">
.m-history-item {
  $color: black;

  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;

  &__title {
    font-size: 18px;
    &-product-name {
      font-weight: bold;
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
    $color: rgba(0, 0, 0, 0.8);
    color: $color;
    border: 2px solid rgba($color, 0.02);
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
    border: 2px solid rgba($color, 0.2);
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
      font-size: 16px;
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
      font-size: 18px;
    }
  }
}
</style>
