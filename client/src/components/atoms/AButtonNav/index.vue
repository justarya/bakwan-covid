<template>
  <a
    class="m-navigation-button"
    @click="goToUrl"
  >
    <i class="material-icons">{{ icon }}</i>
    <span>
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  name: 'AButtonNav',
  props: {
    icon: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    goBack: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goToUrl() {
      if (this.goBack) this.$router.go(-1);
      this.$router.push(to);
    },
  },
};
</script>

<style lang="scss">
.m-navigation-button {
  cursor: pointer;
  user-select: none;

  color: $blue;
  font-size: 20px;
  border-radius: 20px;
  display: inline-block;
  padding-right: 10px;
  transition: 0.2s;
  .material-icons {
    padding: 0;
    font-size: 30px;
  }
  &:hover {
    transition: 0.2s;
    background-color: $light-blue;
  }
}
</style>
