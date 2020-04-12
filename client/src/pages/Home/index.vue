<template>
  <div class="p-home">
    <MainTemplate>
      <HomeTopNav
        @submit="fetchHospital"
      />
      <ACard>
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
      </ACard>
    </MainTemplate>
  </div>
</template>

<script>
import MainTemplate from '@/components/templates/MainTemplate';
import HospitalItem from '@/components/organisms/HospitalItem';
import HomeTopNav from '@/components/organisms/home/TopNav';
import ACard from '@/components/atoms/ACard';

export default {
  name: 'Home',
  components: {
    MainTemplate,
    HospitalItem,
    ACard,
    HomeTopNav,
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
    fetchHospital(search = '') {
      this.$http.get(`/hospital/?search=${search}`)
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
