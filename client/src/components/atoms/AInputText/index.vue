<template>
  <textarea
    class="a-input --textarea"
    v-if="type === 'textarea'"
    v-model="inputValue"
  >
  </textarea>
  <input
    v-model="inputValue"
    v-else
    class="a-input"
    :type="type"
  >
</template>

<script>
export default {
  name: 'AInputText',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
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
};
</script>

<style lang="scss">
.a-input {
  outline: none;
  width: 100%;
  display: block;
  padding: 5px 7px;
  margin-bottom: 10px;
  &[type=text], &[type=password], &[type=number] {
    border-bottom: 1px solid $gray;
    padding-bottom: 6px;
    &:focus {
      border-bottom: 2px solid $blue;
      padding-bottom: 5px;
    }
  }
  &.--textarea {
    border-radius: 5px;
    border: 1px solid $gray;
    resize: none;
  }
}
</style>
