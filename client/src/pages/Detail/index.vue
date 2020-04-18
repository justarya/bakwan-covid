<template>
  <div class="p-detail">
    <MainTemplate>
      <ACard>
        <div class="p-detail__content">
          <div class="p-detail__nav">
            <AButtonNav
              icon="chevron_left"
              go-back
            >
              Home
            </AButtonNav>
          </div>
          <p class="p-detail__title a-text">
            {{ detail.hospital.name }}
          </p>
          <div class="p-detail__info o-detail-info">
            <div class="o-detail-info__item --location">
              <i class="material-icons">room</i>
              <span>{{ detail.hospital.location }}</span>
            </div>
            <div
              class="o-detail-info__item --contact-number"
              v-for="(contactNumber, index) in detail.hospital.contactNumbers"
              :key="index"
            >
              <i class="material-icons">call</i>
              <span>{{ contactNumber }}</span>
            </div>
            <div class="o-detail-info__item --email">
              <i class="material-icons">email</i>
              <span>{{ detail.hospital.email }}</span>
            </div>
          </div>
          <div class="p-detail__last-updated">
            Terakhir diperbarukan:
            <b>
              {{ suppliesLastUpdated }}
            </b>
          </div>
          <div class="p-detail__supply-list">
            <p class="text-2xl font-semibold">Pasokan</p>
            <SupplyItem
              v-for="(data, index) in detail.hospital.supplies"
              v-bind="data"
              :name="data.product_name"
              :key="index"
              class="my-5"
            />
          </div>
        </div>
      </ACard>
    </MainTemplate>
  </div>
</template>

<script>
import SupplyItem from '@/components/molecules/SupplyItem';
import MainTemplate from '@/components/templates/MainTemplate';
import AButtonNav from '@/components/atoms/AButtonNav';
import ACard from '@/components/atoms/ACard';

export default {
  name: 'Detail',
  components: {
    MainTemplate,
    SupplyItem,
    AButtonNav,
    ACard,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  created() {
    this.fetchHospitalDetailData();
  },
  data: () => ({
    detail: {
      hospital: {},
    },
  }),
  computed: {
    suppliesLastUpdated() {
      return this.$moment(this.detail.hospital.suppliesLastUpdated).format('LLLL');
    },
  },
  methods: {
    fetchHospitalDetailData() {
      this.$http.get(`/hospital/${this.id}`)
        .then(({ data }) => {
          const suppliesLastUpdated = data.supplies.reduce((result, curr) => {
            const date = this.$moment(curr.updatedAt);
            if (!result) return date;
            if (date < result) return result;
            return date;
          }, null);
          this.detail.hospital = {
            ...data,
            contactNumbers: data.contact_numbers,
            suppliesLastUpdated,
          };
        });
    },
  },
};
</script>

<style lang="scss">
.p-detail {
  &__nav {
    margin-bottom: 10px;
  }
  &__content {
    padding: 15px;
    @media (min-width: $sm) { padding: 30px; }
  }
  &__title {
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  &__info {
    margin-bottom: 20px;
  }
}
.o-detail-info {
  border-radius: 10px;
  border: thin solid $gray;
  padding: 20px;
  display: inline-block;
  padding-right: 50px;
  &__item {
    margin-bottom: 8px;
    .material-icons {
      padding-right: 8px;
    }
  }
}
</style>
