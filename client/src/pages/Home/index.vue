<template>
  <div class="p-home">
    <MainTemplate>
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

export default {
  name: 'Home',
  components: {
    MainTemplate,
    HospitalItem,
  },
  data: () => ({
    list: {
      hospital: [],
    },
  }),
  created() {
    this.fetchHospital();
  },
  methods: {
    fetchHospital() {
      this.$http.get('/hospital')
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
