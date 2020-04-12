<template>
  <div class="a-search-bar">
    <input
      v-model="inputValue"
      type="text"
      placeholder="Search"
      @keyup.enter="$emit('submit')"
    >
    <i
      class="a-search-bar__close material-icons"
      @click="reset"
    >
      close
    </i>
  </div>
</template>

<script>
import ACard from '@/components/atoms/ACard';

export default {
  name: 'ASearchBar',
  components: {
    ACard,
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
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
  },
};
</script>

<style lang="scss">
.a-search-bar {
  max-width: 300px;
  width: 90%;
  margin-bottom: 20px;
  position: relative;
  &__close {
    display: block;
    visibility: hidden;
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    cursor: pointer;
    color: $gray;
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
    &:focus ~ .a-search-bar__close {
      visibility: visible;
    }
  }
}
</style>
