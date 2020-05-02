<template>
  <div class="o-tab">
    <a
      v-for="(data, index) in menu"
      :key="index"
      @click="goTo(data.url)"
      :class="[
        'o-tab__item',
        {
          '--active': data.url.name === currentActiveRoute,
        },
      ]"
    >
      {{ data.text }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    currentActiveRoute() {
      return this.$route.name;
    },
  },
  methods: {
    goTo(url) {
      if (this.currentActiveRoute !== url.name)
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss">
.o-tab {
  position: relative;
  display: flex;
  margin-bottom: 10px;
  &__item {
    padding: 5px 15px;
    margin-right: 10px;

    cursor: pointer;

    transition: 0.2s;
    color: $gray;
    &.--active {
      color: $blue;
      background-color: white;
      box-shadow: 0 0 10px rgba($blue, 0.2);
      border-radius: 20px;
      transition: 0.3s;
    }
  }
}
</style>
