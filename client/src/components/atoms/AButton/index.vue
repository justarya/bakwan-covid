<template>
  <a
    :class="[
      'a-button',
      `--color-${color}`,
      `--size-${size}`,
      { '--border': border },
      { '--disabled': disabled },
    ]"
    @click="click"
  >
    <span>
      <slot></slot>
    </span>
    <i class="material-icons">{{ icon }}</i>
  </a>
</template>

<script>
export default {
  name: 'AButton',
  props: {
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'blue',
    },
    size: {
      type: String,
      default: 'default',
    },
    border: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click() {
      if (!this.disabled) this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
.a-button {
  display: inline-block;
  cursor: pointer;

  border-radius: 8px;
  font-size: 16px;
  transition: 0.3s;

  .material-icons {
    padding-left: 5px;
    font-size: 16px;
    line-height: 16px;
  }
  &:hover {
    transition: 0.3s;
  }


  &.--size {
    &-default {
      padding: 7px 10px;
    }
    &-small {
      padding: 3px 5px;
    }
  }
  &.--color-blue {
    border-color: $blue;
    color: $blue;
    &:hover {
      color: white;
      background-color: $blue;
    }
  }
  &.--border {
    border-width: thin;
    border-style: solid;
  }
  &.--disabled, &.--disabled:hover {
    color: $gray;
    border-color: $gray;
    background-color: transparent;
    cursor: not-allowed;
  }
}
</style>
