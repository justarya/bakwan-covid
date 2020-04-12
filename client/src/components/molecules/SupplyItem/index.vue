<template>
  <div class="m-supply-item">
    <p class="m-supply-item__title a-text text-lg">{{ name }}</p>
    <div class="m-supply-item__total">
      <div class="m-supply-item__supply">
        <p class="m-supply-item__label">Sisa</p>
        <p class="m-supply-item__count">{{ supply }}</p>
      </div>
      <div class="m-supply-item__seperator"></div>
      <div class="m-supply-item__demand">
        <p class="m-supply-item__label">Butuh</p>
        <p class="m-supply-item__count">{{ demand }}</p>
      </div>
    </div>
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
  padding: 0 10px;
  display: inline-block;
  &--container {
    position: relative;
    width: 100%;
    display: flex;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      max-width: 200px;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff)
    }
  }
  &__total {
    display: flex;
  }
  &__supply, &__demand {
    width: 50px;
  }
  &__supply {
    text-align: right;
    color: #C3CED3;
  }
  &__demand {
    text-align: left;
    color: #3482FF;
  }
  &__seperator {
    border-right: thin solid $gray;
    margin: 5px 10px;
  }
  &__label {
    font-size: 10px;
    line-height: 1.25;
  }
  &__count {
    font-size: 17px;
    font-weight: 500;
    line-height: 1.25;
  }
  &__title {
    text-align: center;
  }
}
</style>
