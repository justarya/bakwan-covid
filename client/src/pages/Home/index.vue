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
        :identifier="filter.search.identifier"
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
      search: {
        value: '',
        identifier: 0,
      },
    },
    pagination: {
      page: 0,
      size: 20,
    },
  }),
  methods: {
    getSearch(value) {
      this.filter.search.value = value;
      this.filter.search.identifier += 1;
      this.pagination = {
        page: 0,
        size: 20,
      };
      if (this.pagination.page === 0) this.list.hospital = [];
    },
    fetchHospital(state) {
      this.$http.get('/hospital', {
        params: {
          search: this.filter.search.value,
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
      const newList = list.map((val) => {
        const supplies = val.supplies.map((supply) => {
          let product = {};
          if (supply.product) product = supply.product;
          else {
            product = {
              name: supply.product_name,
              unit: supply.demand_unit,
            };
          }
          return {
            ...supply,
            product,
          };
        });
        return {
          id: val._id,
          name: val.name,
          location: val.location,
          supplies,
        };
      });
      return newList;
    },
  },
};
</script>
