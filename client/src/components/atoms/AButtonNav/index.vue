<template>
  <a
    :class="[
      'm-navigation-button',
      `--icon-${iconPosition}`
    ]"
    @click="goToUrl"
  >
    <i v-if="iconPosition === 'left'" class="material-icons">{{ icon }}</i>
    <span class="m-navigation-button__text">
      <slot></slot>
    </span>
    <i v-if="iconPosition === 'right'" class="material-icons">{{ icon }}</i>
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
    iconPosition: {
      type: String,
      default: 'left',
    },
    to: {
      type: [String, Object],
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
      else if (this.to) this.$router.push(this.to);
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
  transition: 0.2s;
  &__text {
    padding: 0 10px;
  }
  .material-icons {
    padding: 0;
    font-size: 30px;
    &:first-child {
      margin-right: -10px;
    }
    &:last-child {
      margin-left: -10px;
    }
  }
  &:hover {
    transition: 0.2s;
    background-color: $light-blue;
  }
}
</style>
