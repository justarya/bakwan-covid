<template>
  <div class="a-search-bar">
    <input
      v-model="inputValue"
      type="text"
      placeholder="Cari nama, lokasi"
      @keyup.enter="$emit('submit')"
      @focus="onFocus"
      @blur="onBlur"
    >
    <i
      v-if="inputValue.length"
      :class="[
        'a-search-bar__close material-icons',
        { '--active': isFocus },
      ]"
      @click="reset"
    >
      close
    </i>
  </div>
</template>

<script>
export default {
  name: 'ASearchBar',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data: () => ({
    isFocus: false,
  }),
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    reset() {
      this.$emit('input', '');
      this.$emit('submit');
    },
    onFocus() {
      this.isFocus = true;
    },
    onBlur() {
      this.isFocus = false;
    },
  },
};
</script>

<style lang="scss">
.a-search-bar {
  max-width: 300px;
  width: 90%;
  position: relative;
  &__close {
    display: block;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    cursor: pointer;
    color: black;
    &.--active {
      opacity: 0.4;
    }
  }
  input {
    width: 100%;
    padding: 10px;
    padding-right: 40px;

    outline: none;
    border-radius: 10px;
    border: thin solid $soft-gray;

    transition: 0.15s;
    &:focus {
      transition: 0.15s;
      border-color: $blue;
      box-shadow: 0 0 0 5px $light-blue;
    }
  }
}
</style>
