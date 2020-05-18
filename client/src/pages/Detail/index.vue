<template>
  <div class="p-detail">
    <MainTemplate>
      <div class="p-detail__content">
        <div class="p-detail--main">
          <div class="p-detail__nav">
            <AButtonNav
              icon="chevron_left"
              :to="{ name: 'Home' }"
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
        <div class="p-detail--secondary">
          <Tab
            :menu="config.menu"
          />
          <router-view />
        </div>
      </div>
    </MainTemplate>
  </div>
</template>

<script>
import MainTemplate from '@/components/templates/MainTemplate';
import Tab from '@/components/organisms/Tab';
import AButtonNav from '@/components/atoms/AButtonNav';

export default {
  name: 'Detail',
  components: {
    MainTemplate,
    AButtonNav,
    Tab,
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
    config: {
      menu: [
        {
          text: 'Pasokan',
          url: {
            name: 'DetailSupply',
          },
        },
        {
          text: 'Riwayat',
          url: {
            name: 'DetailHistory',
          },
        },
      ],
    },
  }),
  methods: {
    fetchHospitalDetailData() {
      this.$http.get(`/hospital/${this.id}`)
        .then(({ data }) => {
          const newData = this.mappingDetailData(data);
          this.detail.hospital = newData;
          this.config.menu[0].url.params = {
            supplies: this.detail.hospital.supplies,
          };
          this.redirect();
        });
    },
    mappingDetailData(data) {
      const supplies = data.supplies.map((supply) => {
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
        ...data,
        supplies,
        contactNumbers: data.contact_numbers,
      };
    },
    redirect() {
      if (this.$router.currentRoute.name === 'Detail') {
        this.$router.replace({
          name: 'DetailSupply',
          params: {
            supplies: this.detail.hospital.supplies,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss">
.p-detail {
  &__nav {
    margin-bottom: 10px;
  }
  &--main {
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
  @media (min-width: $sm) {
    &__content {
      display: flex;
      > div:last-child {
        padding-left: 20px;
      }
    }
    &--main {
      width: 50%;
    }
    &--secondary {
      width: 50%;
    }
  }
  @media (min-width: $md) {
    &__content {
      > div:last-child {
        padding-left: 25px;
      }
    }
    &--main {
      width: 45%;
    }
    &--secondary {
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
    &--main {
      width: 45%;
    }
    &--secondary {
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
