<template>
  <p
    :class="[
      'a-text',
      `--${size}`
    ]"
  >
    Pasokan Aalat Medis Nusantara
  </p>
</template>

<script>
export default {
  name: 'AText',
  props: {
    size: {
      type: String,
      default: 'base',
    },
    bold: {
      type: Boolean,
      default: false,
    },
    italic: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.a-text {
  &.--display-4 { font-size: 16px; }
  &.--display-3 { font-size: 16px; }
  &.--display-2 { font-size: 16px; }
  &.--display-1 { font-size: 16px; }
  &.--base { font-size: 16px; }
  &.--h1 { font-size: 16px; }
  &.--h2 { font-size: 16px; }
  &.--h3 { font-size: 16px; }
  &.--h4 { font-size: 16px; }
  &.--h5 { font-size: 16px; }
  &.--h6 { font-size: 16px; }
}
</style>
