<template>
  <div class="p-detail">
    <MainTemplate>
      <div class="p-detail__content">
        <div class="p-detail--info">
          <div class="p-detail__nav">
            <AButtonNav
              icon="chevron_left"
              go-back
            >
              Home
            </AButtonNav>
          </div>
          <div class="p-detail__main">
            <p class="p-detail__name a-text">
              {{ detail.hospital.name }}
            </p>
            <div class="p-detail__location">
              <i class="material-icons">room</i>
              <span>{{ detail.hospital.location }}</span>
            </div>
          </div>
          <div class="p-detail__contact o-detail-contact">
            <div class="o-detail-contact__title">
              Kontak (untuk donasi)
            </div>
            <div
              class="o-detail-contact__item --contact-number"
              v-for="(contactNumber, index) in detail.hospital.contactNumbers"
              :key="index"
            >
              <i class="material-icons">call</i>
              <span>{{ contactNumber }}</span>
            </div>
            <div class="o-detail-contact__item --email">
              <i class="material-icons">email</i>
              <span>{{ detail.hospital.email }}</span>
            </div>
          </div>
        </div>
        <div class="p-detail--supply">
          <div class="p-detail__supply-main">
            <p class="p-detail__supply-title">Kebutuhan Pasokan</p>
            <div
              class="p-detail__supply-last-updated"
              v-if="detail.hospital.supplies && detail.hospital.supplies.length"
            >
              <i class="material-icons">
                schedule
              </i>
              <span>
                Terakhir diperbarui:
                <b>
                  {{ suppliesLastUpdated }}
                </b>
              </span>
            </div>
          </div>
          <div class="p-detail__supply-list">
            <SupplyItem
              v-for="(data, index) in detail.hospital.supplies"
              v-bind="data"
              :name="data.product.name"
              :unit="data.product.unit"
              :key="index"
            />
            <p
              v-if="detail.hospital.supplies && !detail.hospital.supplies.length"
              class="text-gray-600"
            >
              Data kosong
            </p>
          </div>
        </div>
      </div>
    </MainTemplate>
  </div>
</template>

<script>
import SupplyItem from '@/components/molecules/SupplyItem';
import MainTemplate from '@/components/templates/MainTemplate';
import AButtonNav from '@/components/atoms/AButtonNav';

export default {
  name: 'Detail',
  components: {
    MainTemplate,
    SupplyItem,
    AButtonNav,
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
      return this.$moment(this.detail.hospital.suppliesLastUpdated).format('LLL');
    },
  },
  methods: {
    fetchHospitalDetailData() {
      this.$http.get(`/hospital/${this.id}`)
        .then(({ data }) => {
          const newData = this.mappingDetailData(data);
          this.detail.hospital = newData;
        });
    },
    mappingDetailData(data) {
      const suppliesLastUpdated = data.supplies.reduce((result, curr) => {
        const date = this.$moment(curr.updatedAt);
        if (!result) return date;
        if (date < result) return result;
        return date;
      }, null);
      const supplies = data.supplies.map((supply) => {
        let product = {};
        if (supply.product) product = supply.product;
        else {
          product = {
            name: supply.product_name,
            unit: supply.demand_unit,
          };
        };
        return {
          ...supply,
          product,
        };
      });
      return {
        ...data,
        supplies,
        contactNumbers: data.contact_numbers,
        suppliesLastUpdated,
      };
    },
  },
};
</script>

<style lang="scss">
.p-detail {
  &__nav {
    margin-bottom: 10px;
  }
  &--info {
    margin-bottom: 30px;
  }
  &__content {
    padding: 25px;
  }
  &__main {
    margin-bottom: 30px;
  }
  &__name {
    font-size: 22px;
    font-weight: 500;
    line-height: 1.25;
    margin-bottom: 10px;
  }
  &__location {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1.3;
    .material-icons {
      margin-right: 5px;
    }
  }
  &__contact {
    max-width: 400px;
  }
  &__last-updated {
    color: $gray;
    margin-bottom: 20px;
  }
  &__supply {
    &-main {
      margin-bottom: 30px;
    }
    &-title {
      font-size: 24px;
    }
    &-last-updated {
      font-size: 14px;
      color: $gray;
      display: flex;
      align-items: center;
      .material-icons {
        margin-right: 5px;
        font-size: 16px;
      }
    }
    &-list {
      .m-supply-item {
        padding: 10px;
        margin: 0;
      }
    }
  }
  @media (min-width: $sm) {
    &__content {
      display: flex;
      > div:last-child {
        padding-left: 20px;
      }
    }
    &--info {
      width: 50%;
    }
    &--supply {
      width: 50%;
    }
  }
  @media (min-width: $md) {
    &__content {
      > div:last-child {
        padding-left: 25px;
      }
    }
    &--info {
      width: 45%;
    }
    &--supply {
      padding-left: 20px;
      width: 55%;
    }
  }
  @media (min-width: $xl) {
    &__content {
      > div:last-child {
        padding-left: 25px;
      }
    }
    &--info {
      width: 45%;
    }
    &--supply {
      padding-left: 20px;
      width: 55%;
    }
  }
}
.o-detail-contact {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba($blue, 0.2);
  padding: 20px;
  width: 100%;
  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  &__item {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
    .material-icons {
      padding-right: 8px;
    }
  }
}
</style>
