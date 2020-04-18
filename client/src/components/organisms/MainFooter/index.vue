<template>
  <div class="o-main-footer">
    <div class="o-main-footer__section">
      <p class="text-base">
        &copy; {{ year }} Bakwan Covid
      </p>
    </div>
    <div class="o-main-footer__section">
      <span class="text-base">
        <a target="_blank" href="http://github.com/justarya/bakwan-covid">
          Github
        </a>
      </span>
      <span> | </span>
      <span class="text-base">
        <a href="mailto:report.bakwancovid@gmail.com?subject=[REPORT] (subject masalah)">
          Lapor bug?
        </a>
      </span>
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
