<template>
  <div class="o-main-footer">
    <div class="o-main-footer__section">
      <p class="text-base">
        &copy; {{ year }} Bakwan Covid
      </p>
    </div>
    <div class="o-main-footer__section">
      <p class="text-base">
        <span>
          Mau daftar?
        </span>
        <a href="mailto:register.bakwancovid@gmail.com?subject=[DAFTAR] (nama rumah sakit)">
          register.bakwancovid@gmail.com
        </a>
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
