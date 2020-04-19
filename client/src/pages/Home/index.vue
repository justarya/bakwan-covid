<template>
  <div class="p-home">
    <MainTemplate>
      <HomeBanner
        class="mb-4"
      />
      <HomeTopNav
        @submit:search="getSearch"
      />
      <div class="p-home__hospital-list">
        <HospitalItem
          v-for="(item, index) in list.hospital"
          :key="index"
          v-bind="item"
        />
      </div>
      <InfiniteLoading
        spinner="spiral"
        :identifier="filter.search"
        @infinite="fetchHospital"
      >
        <div slot="no-more"></div>
        <div slot="no-results">
          <p
            v-if="!list.hospital.length"
            class="text-2xl p-3"
          >
            Data kosong
          </p>
        </div>
      </InfiniteLoading>
    </MainTemplate>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import MainTemplate from '@/components/templates/MainTemplate';
import HospitalItem from '@/components/organisms/HospitalItem';
import HomeTopNav from '@/components/organisms/home/TopNav';
import HomeBanner from '@/components/organisms/home/Banner';

export default {
  name: 'Home',
  components: {
    MainTemplate,
    HospitalItem,
    HomeTopNav,
    HomeBanner,
    InfiniteLoading,
  },
  data: () => ({
    list: {
      hospital: [],
    },
    filter: {
      search: '',
    },
    pagination: {
      page: 0,
      size: 20,
    },
  }),
  methods: {
    getSearch(value) {
      this.filter.search = value;
    },
    fetchHospital(state) {
      this.$http.get('/hospital', {
        params: {
          search: this.filter.search,
          page: this.pagination.page,
          size: this.pagination.size,
        },
      })
        .then(({ data }) => {
          if (data.list.length) {
            this.pagination.page += 1;

            const newData = this.mappingHospitalData(data);
            this.list.hospital.push(...newData);

            state.loaded();
          } else {
            state.complete();
          }
        })
        .catch(() => {
          state.error();
        });
    },
    mappingHospitalData(data) {
      const { list } = data;
      const newList = list.map((val) => (
        {
          id: val._id,
          name: val.name,
          location: val.location,
          supplies: val.supplies,
        }
      ));
      return newList;
    },
  },
};
</script>

<style lang="scss">

</style>
