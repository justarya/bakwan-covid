<template>
  <div class="p-home">
    <MainTemplate>
      <template v-slot:top>
        <ASearchBar
          v-model="filter.search.value"
          @submit="fetchHospital"
        />
        <p class="text-2xl my-4">
          <template v-if="filter.search.submitted">
            Search: {{ filter.search.submitted }}
          </template>
          <template v-else>
            Data Kebutuhan Alat Medis
          </template>
        </p>
      </template>
      <HospitalItem
        v-for="(item, index) in list.hospital"
        :key="index"
        v-bind="item"
      />
      <p
        v-if="!list.hospital.length"
        class="text-2xl p-3"
      >
        Data kosong
      </p>
    </MainTemplate>
  </div>
</template>

<script>
import MainTemplate from '@/components/templates/MainTemplate';
import HospitalItem from '@/components/organisms/HospitalItem';
import ASearchBar from '@/components/atoms/ASearchBar';

export default {
  name: 'Home',
  components: {
    MainTemplate,
    HospitalItem,
    ASearchBar,
  },
  data: () => ({
    list: {
      hospital: [],
    },
    filter: {
      search: {
        value: '',
        submitted: '',
      },
    },
  }),
  created() {
    this.fetchHospital();
  },
  methods: {
    fetchHospital() {
      this.filter.search.submitted = this.filter.search.value;
      this.$http.get(`/hospital/?search=${this.filter.search.value}`)
        .then(({ data }) => {
          this.assignHospitalData(data);
        });
    },
    assignHospitalData(data) {
      const { list } = data;
      const newList = list.reduce((curr, val) => [
        ...curr,
        {
          id: val._id,
          name: val.name,
          location: val.location,
          supplies: val.supplies,
        },
      ], []);
      this.list.hospital = newList;
    },
  },
};
</script>

<style lang="scss">

</style>
