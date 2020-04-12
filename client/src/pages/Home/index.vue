<template>
  <div class="p-home">
    <MainTemplate>
      <template v-slot:top>
        <ASearchBar
          v-model="filter.search"
          @submit="fetchHospital"
        />
        <p class="text-2xl my-4">Data Kebutuhan Alat Medis</p>
      </template>
      <HospitalItem
        v-for="(item, index) in list.hospital"
        :key="index"
        v-bind="item"
      />
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
      search: '',
    },
  }),
  created() {
    this.fetchHospital();
  },
  methods: {
    fetchHospital() {
      this.$http.get(`/hospital/?search=${this.filter.search}`)
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
