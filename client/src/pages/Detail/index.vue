<template>
  <div class="p-detail">
    <MainTemplate>
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
          RS Persahabatan
        </p>
        <div class="p-detail__info o-detail-info">
          <div class="o-detail-info__item --location">
            <i class="material-icons">room</i>
            <span>Jl. Mawar itu merah warnanya No. 123</span>
          </div>
          <div class="o-detail-info__item --contact-number">
            <i class="material-icons">call</i>
            <span>08712347347</span>
          </div>
          <div class="o-detail-info__item --email">
            <i class="material-icons">email</i>
            <span>admin@rs.com</span>
          </div>
        </div>
        <div class="p-detail__supply-list">
          <p class="text-2xl font-semibold">Pasokan</p>
          <SupplyItem v-for="data in 9" :key="data" class="my-5"></SupplyItem>
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
};
</script>

<style lang="scss">
.p-detail {
  &__nav {
    margin-bottom: 10px;
  }
  &__content {
    padding: 30px;
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
