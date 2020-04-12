<template>
  <div class="o-home-top-nav">
    <p class="text-2xl my-4">
      <template v-if="filter.search.submitted">
        Search: {{ filter.search.submitted }}
      </template>
      <template v-else>
        Data Kebutuhan Alat Medis
      </template>
    </p>
    <ASearchBar
      v-model="filter.search.value"
      @submit="submit"
    />
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
      this.$emit('submit', this.filter.search.value);
    },
  },
};
</script>

<style lang="scss">
.o-home-top-nav {
  display: flex;
  justify-content: space-between;
}
</style>
