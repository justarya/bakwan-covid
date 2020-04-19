<template>
  <div class="m-supply-item">
    <p class="m-supply-item__count a-text">{{ demand }}</p>
    <p class="m-supply-item__name a-text">{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: 'SupplyItem',
  props: {
    name: {
      type: String,
      default: '',
    },
    supply: {
      type: Number,
      default: 0,
    },
    demand: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss">
.m-supply-item {
  margin: 0 10px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  &--container {
    border: thin solid $blue;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba($blue, 0.2);
    padding: 10px;
    width: 100%;

    display: flex;
    position: relative;
    overflow: hidden;

    .m-supply-item__name {
      white-space: nowrap;
      overflow: hidden;
    }

    &__arrow {
      position: absolute;
      top: 0;
      right: 10px;
      z-index: 9;
      height: 100%;
      display: flex;
      align-items: center;
      color: $blue;
    }

    &::after {
      content: "";

      position: absolute;
      right: 0;
      top: 0;

      max-width: 120px;
      width: 100%;
      height: 100%;

      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) ,
        #fff 65%
      );
    }
  }
  &__count {
    color: $blue;
    font-size: 18px;
    line-height: 1.25;
  }
  &__name {
    color: black;
    font-size: 12px;
    line-height: 1.25;
  }
  @media (min-width: $sm) {
    &__count {
      line-height: 1.3;
      font-size: 20px;
    }
    &__name {
      font-size: 14px;
    }
  }
  @media (min-width: $lg) {
    &--container {
      max-width: 500px;
    }
  }
}
</style>
