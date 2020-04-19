<template>
  <div class="o-home-banner">
    <div class="o-home-banner__message">
      <p class="o-home-banner__title">
        Yuk, Bantu RS Dengan Donasi
      </p>
      <p class="o-home-banner__subtitle">
        Ratusan pasien covid19 meninggal
        setiap harinya karena kekurangan
        alat medis.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBanner',
};
</script>

<style lang="scss">
.o-home-banner {
  height: 50vh;
  max-height: 400px;
  display: flex;
  align-items: flex-end;

  background-image:
    linear-gradient(to top, white calc(100% - 70vw), rgba(0, 0, 0, 0) calc(100% - 30vw)),
    url('/assets/img/covid-19-banner.png');
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
  &__message {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    width: 80%;
    max-width: 500px;
    padding: 30px;
  }
  &__title {
    font-size: 25px;
    line-height: 1.2;
    font-weight: bold;
    margin-bottom: 10px;
    width: 100%;
  }
  &__subtitle {
    width: 100%;
    font-size: 14px;
  }
  @media (min-width: 400px) {
    background-image:
      linear-gradient(to top, white 30%, rgba(0, 0, 0, 0) 50%),
      url('/assets/img/covid-19-banner.png');
    background-position: center top;
    background-size: 400px;
    &__message {
      padding: 0px;
      padding-bottom: 30px;
      padding-left: 9vw;
      width: 60%;
    }
  }
  @media (min-width: $sm) {
    background-image:url('/assets/img/covid-19-banner.png');
    background-position: right center;
    max-height: 400px;
    &__message {
      background-image: linear-gradient(to right, white 70%, rgba(0, 0, 0, 0) 100%);
      justify-content: center;
      height: 100%;
      max-width: 322px;
      padding-left: 25px;
    }
    &__title {
      font-size: 32px;
    }
    &__subtitle {
      font-size: 16px;
    }
  }
  @media (min-width: $md) {
    background-size: contain;
  }
  @media (min-width: $lg) {
    &__message {
      max-width: 400px;
    }
    &__title {
      font-size: 40px;
    }
    &__subtitle {
      font-size: 18px;
    }
  }
}
</style>
