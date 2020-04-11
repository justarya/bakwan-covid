<template>
  <div
    :class="[
      'a-card',
      `--${color}`,
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ACard',
  props: {
    color: {
      type: String,
      default: 'gray',
    },
  },
};
</script>

<style lang="scss">
.a-card {
  border-radius: 10px;
  border: thin solid $soft-gray;

  overflow: hidden;
  &.--gray {
    border-color: $soft-gray;
  }
  &.--blue {
    border-color: $blue;
  }
}
</style>
