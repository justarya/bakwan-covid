<template>
  <div class="o-home-top-nav">
    <p
      class="o-home-top-nav__search-title"
    >
      <span
        v-if="filter.search.submitted"
      >
        Cari kata kunci: {{ filter.search.submitted }}
      </span>
    </p>
    <div class="o-home-top-nav__search-bar">
      <ASearchBar
        v-model="filter.search.value"
        @submit="submit"
      />
    </div>
  </div>
</template>

<script>
import ASearchBar from '@/components/atoms/ASearchBar';

export default {
  name: 'HomeTopNav',
  components: {
    ASearchBar,
  },
  data: () => ({
    filter: {
      search: {
        value: '',
        submitted: '',
      },
    },
  }),
  methods: {
    submit() {
      this.filter.search.submitted = this.filter.search.value;
      this.$emit('submit:search', this.filter.search.value);
    },
  },
};
</script>

<style lang="scss">
.o-home-top-nav {
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 20px;
  padding: 0 25px;
  &__search-title {
    padding: 20px 0;
    font-size: 23px;
    font-weight: 600;
  }
  @media (min-width: $sm) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    &__search-title {
      padding: 0;
    }
  }
}
</style>
