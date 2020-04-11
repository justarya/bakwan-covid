<template>
  <div class="o-main-footer">
    <div class="o-main-footer__section">
      <p class="text-base">
        &copy; {{ year }} Pasokan Alat Medis Nusantara
      </p>
    </div>
    <div class="o-main-footer__section">
      <p class="text-base">
        Daftar sebagai rumah sakit
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainFooter',
  computed: {
    year() {
      const today = new Date();
      return today.getFullYear();
    },
  },
};
</script>

<style lang="scss">
.o-main-footer {
  margin: 30px 0;
  color: $gray;
  display: flex;
  justify-content: space-between;
}
</style>
